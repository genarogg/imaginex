'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import ImgProps from './ImgProps';
import svg from './svg';
import { calculateDimensions } from './utils/calculateDimensions';

interface ExtendedImgRemoteProps extends ImgProps {
    children?: React.ReactNode;
    transitionDuration?: number;
    fetchTimeout?: number;
    onLoadStart?: () => void;
    onLoadComplete?: () => void;
    onError?: (error: Error) => void;
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    maintainAspectRatio?: boolean;
}

const ImgRemote: React.FC<ExtendedImgRemoteProps> = ({
    src,
    alt,
    id,
    blurDataURL,
    placeholder = 'blur',
    width,
    height,
    className = '',
    priority = false,
    loading = 'lazy',
    quality = 75,
    sizes,
    style,
    children,
    transitionDuration = 1000,
    fetchTimeout = 5000,
    onLoadStart,
    onLoadComplete,
    onError,
    objectFit = 'cover',
    maintainAspectRatio = true
}) => {
    const [svgBackground, setSvgBackground] = useState<string | null>(
        blurDataURL ? svg({ base64: blurDataURL }) : null
    );
    const [isLoaded, setIsLoaded] = useState<boolean>(!blurDataURL);
    const [hasError, setHasError] = useState<boolean>(false);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    // Check if this is a remote image
    const isRemoteImage = typeof src === 'string' && src.startsWith('http');
    
    // Determine the actual placeholder and blurDataURL to use
    const actualPlaceholder = (isRemoteImage && !blurDataURL && !svgBackground) ? 'empty' : placeholder;
    const actualBlurDataURL = svgBackground || blurDataURL;

    // Cleanup function
    const cleanup = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }, []);

    // Fetch base64 for remote images
    const fetchRemoteBase64 = useCallback(async (imageUrl: string) => {
        try {
            onLoadStart?.();
            
            abortControllerRef.current = new AbortController();
            const timeoutId = setTimeout(() => {
                abortControllerRef.current?.abort();
            }, fetchTimeout);

            const response = await fetch(
                `/api/getBase64/remote?url=${encodeURIComponent(imageUrl)}`,
                { 
                    signal: abortControllerRef.current.signal,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success && data.data) {
                const svgData = svg({ base64: data.data });
                setSvgBackground(svgData);
                setIsLoaded(false);
            } else if (data.error) {
                throw new Error(`API Error: ${data.error}`);
            } else {
                throw new Error('No base64 data received from API');
            }
        } catch (error) {
            const err = error as Error;
            
            // Silently fall back to direct image loading without blur effect
            if (process.env.NODE_ENV === 'development') {
                console.warn('Base64 fetch failed, falling back to direct loading:', err.message);
            }
            
            setIsLoaded(true);
            setSvgBackground(null);
            
            // Only call onError if it's not an abort error and if explicitly requested
            if (!err.name?.includes('Abort') && !err.message?.includes('aborted')) {
                onError?.(err);
            }
        }
    }, [fetchTimeout, onLoadStart, onError]);

    // Effect to handle remote image base64 fetching
    useEffect(() => {
        if (isRemoteImage && !blurDataURL) {
            fetchRemoteBase64(src);
        }

        return cleanup;
    }, [src, blurDataURL, fetchRemoteBase64, cleanup, isRemoteImage]);

    // Handle image load completion
    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        
        // Usar la función utilitaria para calcular dimensiones
        const calculatedDimensions = calculateDimensions({
            naturalWidth,
            naturalHeight,
            width,
            height,
            maintainAspectRatio
        });
        
        setImageDimensions(calculatedDimensions);
        setIsImageLoaded(true);
        
        if (!id) return;

        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            const container = document.getElementById(`${id}Container`);
            const imgElement = document.getElementById(`${id}Img`);
            const ghost = document.getElementById(`${id}Ghost`);

            if (imgElement && container && ghost) {
                const { width: calcWidth, height: calcHeight } = calculatedDimensions;

                // Batch DOM updates with calculated dimensions
                container.style.cssText += `width: ${calcWidth}px; height: ${calcHeight}px;`;
                ghost.style.cssText += `width: ${calcWidth}px; height: ${calcHeight}px;`;
                imgElement.style.opacity = '1';

                // Delayed background removal
                timeoutRef.current = setTimeout(() => {
                    container.style.backgroundImage = 'none';
                    onLoadComplete?.();
                }, transitionDuration);
            }
        });
    }, [id, transitionDuration, onLoadComplete, width, height, maintainAspectRatio]);

    const handleImageError = useCallback((error: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const err = new Error(`Failed to load image: ${src}`);
        console.error('Image load error:', err);
        setHasError(true);
        onError?.(err);
    }, [src, onError]);

    // Generate safe IDs
    const containerId = id ? `${id}Container` : undefined;
    const imgId = id ? `${id}Img` : undefined;
    const ghostId = id ? `${id}Ghost` : undefined;

    // Get container dimensions
    const containerDimensions = isImageLoaded && maintainAspectRatio ? imageDimensions : { width, height };

    // Error state
    if (hasError) {
        return (
            <div
                style={{
                    width: containerDimensions.width,
                    height: containerDimensions.height,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    ...style
                }}
                className={`responsiveImage ${className}`}
                role="img"
                aria-label={`Failed to load image: ${alt}`}
            >
                <span>Image failed to load</span>
                {children}
            </div>
        );
    }

    // Loading state without background
    if (!svgBackground && !isLoaded && isRemoteImage) {
        return (
            <div
                style={{
                    width: containerDimensions.width,
                    height: containerDimensions.height,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f9fafb',
                    ...style
                }}
                className={`responsiveImage ${className}`}
                role="img"
                aria-label={`Loading image: ${alt}`}
            >
                <div className="animate-pulse">
                    <div className="bg-gray-300 rounded w-8 h-8"></div>
                </div>
                {children}
            </div>
        );
    }

    return (
        <div
            style={{
                width: containerDimensions.width,
                height: containerDimensions.height,
                position: 'relative',
                overflow: 'hidden',
                ...style
            }}
            className="responsiveImage"
        >
            <div
                style={{
                    backgroundImage: svgBackground ? `url(${svgBackground})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: containerDimensions.width,
                    height: containerDimensions.height,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: `background-image ${transitionDuration * 0.3}ms ease-out`
                }}
                className="responsiveImage"
                id={containerId}
            >
                <Image
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    id={imgId}
                    className={`${className} responsiveImage ${isImageLoaded ? 'fadeIn' : ''}`}
                    placeholder={actualPlaceholder}
                    blurDataURL={actualBlurDataURL}
                    width={maintainAspectRatio && isImageLoaded ? imageDimensions.width : width}
                    height={maintainAspectRatio && isImageLoaded ? imageDimensions.height : height}
                    loading={loading}
                    priority={priority}
                    quality={quality}
                    sizes={sizes}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ 
                        position: 'absolute',
                        opacity: isImageLoaded ? 1 : 0,
                        transition: `opacity ${transitionDuration * 0.7}ms ease-in-out`,
                        objectFit: objectFit,
                        width: '100%',
                        height: '100%'
                    }}
                />
                <div
                    className="responsiveImage"
                    style={{ 
                        width: containerDimensions.width, 
                        height: containerDimensions.height,
                        pointerEvents: 'none'
                    }}
                    id={ghostId}
                    aria-hidden="true"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ImgRemote;