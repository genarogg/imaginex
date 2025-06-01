'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import ImgProps from '../utils/ImgProps';
import { handleImageLoad as handleImageLoadUtil } from '../utils/handleImageLoadUtil';

const ImgLocal: React.FC<ImgProps> = ({
    src,
    alt,
    id,
    placeholder = 'blur',
    width,
    height,
    className = '',
    priority = false,
    loading = 'lazy',
    quality = 75,
    sizes,
    style,
    visible = false,
    objectFit = 'cover',
    maintainAspectRatio = true 
}) => {
    const [isVisible, setIsVisible] = useState(visible || priority);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    
    const imgRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Cleanup function
    const cleanup = useCallback(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
    }, []);

    // Initialize intersection observer
    useEffect(() => {
        if (priority || visible) return; 
        
        const options = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observerRef.current?.disconnect();
                    }
                });
            },
            options
        );

        const currentRef = imgRef.current;
        if (currentRef && observerRef.current) {
            observerRef.current.observe(currentRef);
        }

        return cleanup;
    }, [priority, visible, cleanup]);

    // Handle image load using utility function
    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        handleImageLoadUtil({
            event,
            id,
            width,
            height,
            maintainAspectRatio,
            componentType: 'local',
            onDimensionsCalculated: (dimensions) => {
                setImageDimensions(dimensions);
                setIsLoaded(true);
                setHasError(false);
            }
        });
    }, [id, width, height, maintainAspectRatio]);

    const handleImageError = useCallback(() => {
        setHasError(true);
        setIsLoaded(true);
    }, []);

    // Generate unique IDs safely
    const containerId = id ? `${id}Container` : undefined;
    const imgId = id ? `${id}Img` : undefined;
    const ghostId = id ? `${id}Ghost` : undefined;

    // Get container dimensions
    const containerDimensions = isLoaded && maintainAspectRatio ? imageDimensions : { width, height };

    // Render error state
    if (hasError) {
        return (
            <div
                ref={imgRef}
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
            </div>
        );
    }

    return (
        <div
            ref={imgRef}
            style={{
                width: containerDimensions.width,
                height: containerDimensions.height,
                position: 'relative',
                overflow: 'hidden',
                ...style
            }}
            className={`responsiveImage ${className}`}
        >
            {isVisible && (
                <div
                    style={{
                        backgroundImage: src?.blurDataURL ? `url(${src.blurDataURL})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: containerDimensions.width,
                        height: containerDimensions.height,
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'background-image 0.3s ease-out'
                    }}
                    className="responsiveImage"
                    id={containerId}
                >
                    <Image
                        src={src}
                        alt={alt}
                        id={imgId}
                        className={`${className} responsiveImage ${isLoaded ? 'fadeIn' : ''}`}
                        placeholder={placeholder}
                        blurDataURL={src?.blurDataURL}
                        width={maintainAspectRatio && isLoaded ? imageDimensions.width : width}
                        height={maintainAspectRatio && isLoaded ? imageDimensions.height : height}
                        loading={loading}
                        priority={priority}
                        quality={quality}
                        sizes={sizes}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        style={{ 
                            position: 'absolute',
                            opacity: isLoaded ? 1 : 0,
                            transition: 'opacity 0.3s ease-in-out',
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
                    />
                </div>
            )}
        </div>
    );
};

export default ImgLocal;