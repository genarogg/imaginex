'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ImgRemoteProps } from '../utils/ImgProps';
import svg from '../svg';
import { handleImageLoad as handleImageLoadUtil } from '../utils/handleImageLoadUtil';
import { fetchRemoteBase64 } from '../utils/fetchRemoteBase64Util';

const ImgRemote: React.FC<ImgRemoteProps> = ({
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

    const imgRef = useRef<HTMLImageElement | null>(null);

    // Check if this is a remote image
    const isRemoteImage = typeof src === 'string' && src.startsWith('http');

    // Determine the actual placeholder and blurDataURL to use
    const actualPlaceholder = (isRemoteImage && !blurDataURL && !svgBackground) ? 'empty' : placeholder;
    const actualBlurDataURL = svgBackground || blurDataURL;

    // Handle remote image base64 fetching
    const handleFetchRemoteBase64 = useCallback(async (imageUrl: string) => {
        const result = await fetchRemoteBase64({
            imageUrl,
            fetchTimeout,
            onLoadStart,
            onError
        });

        if (result.success && result.svgData) {
            setSvgBackground(result.svgData);
            setIsLoaded(false);
        } else {
            // Silently fall back to direct image loading without blur effect
            setIsLoaded(true);
            setSvgBackground(null);
        }
    }, [fetchTimeout, onLoadStart, onError]);

    // Effect to handle remote image base64 fetching
    useEffect(() => {
        if (isRemoteImage && !blurDataURL) {
            handleFetchRemoteBase64(src);
        }
    }, [src, blurDataURL, handleFetchRemoteBase64, isRemoteImage]);

    // Handle image load using utility function
    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        handleImageLoadUtil({
            event,
            id,
            width,
            height,
            maintainAspectRatio,
            componentType: 'remote',
            transitionDuration,
            onDimensionsCalculated: (dimensions) => {
                setImageDimensions(dimensions);
                setIsImageLoaded(true);
            },
            onLoadComplete
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