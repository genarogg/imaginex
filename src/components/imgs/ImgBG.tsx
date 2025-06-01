"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ImgBGProps } from '../utils/ImgProps';
import { handleBackgroundImageLoad } from '../utils/handleImageLoadUtil';

const ImgBG: React.FC<ImgBGProps> = ({
    src,
    alt,
    id,
    placeholder = 'blur',
    width,
    height,
    className = '',
    priority = true,
    loading = 'eager',
    quality = 85,
    sizes,
    style,
    children,
    backgroundAttachment = 'fixed',
    transitionDuration = 500,
    removeDelay = 1500,
    backgroundSize = 'cover',
    backgroundPosition = 'center',
    maintainAspectRatio = true
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [finalImageSrc, setFinalImageSrc] = useState<string>('');
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
    const [containerDimensions, setContainerDimensions] = useState({ width, height });
    const [calculatedBackgroundSize, setCalculatedBackgroundSize] = useState(backgroundSize);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    // Cleanup function
    const cleanup = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    // Handle image load using utility function
    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        handleBackgroundImageLoad({
            event,
            width,
            height,
            maintainAspectRatio,
            backgroundSize,
            onImageLoaded: (imageSrc, imageDimensions, containerDimensions, calculatedBackgroundSize) => {
                setImageDimensions(imageDimensions);
                setContainerDimensions(containerDimensions);
                setCalculatedBackgroundSize(calculatedBackgroundSize);
                setFinalImageSrc(imageSrc);
                setIsLoaded(true);
                setHasError(false);

                // Delay removal of the hidden Image element
                timeoutRef.current = setTimeout(() => {
                    if (imgRef.current && imgRef.current.parentNode) {
                        imgRef.current.remove();
                        imgRef.current = null;
                    }
                }, removeDelay);
            }
        });
    }, [removeDelay, width, height, maintainAspectRatio, backgroundSize]);

    const handleImageError = useCallback(() => {
        setHasError(true);
        console.error(`Failed to load background image: ${src}`);
    }, [src]);

    // Generate safe IDs
    const containerId = id ? `${id}Container` : undefined;
    const imageId = id ? `${id}Img` : undefined;

    // Get blur data URL
    const blurUrl = typeof src === 'object' && src.blurDataURL ? src.blurDataURL : '';

    // Use calculated dimensions if maintaining aspect ratio and loaded
    const finalContainerDimensions = maintainAspectRatio && isLoaded
        ? containerDimensions
        : { width, height };

    // Use calculated background size
    const finalBackgroundSize = maintainAspectRatio && isLoaded
        ? calculatedBackgroundSize
        : backgroundSize;

    // Common background styles
    const backgroundStyles = {
        backgroundSize: finalBackgroundSize,
        backgroundPosition,
        backgroundRepeat: 'no-repeat' as const,
        backgroundAttachment,
    };

    if (hasError) {
        return (
            <div
                className={`responsiveImage ${className}`}
                style={{
                    ...backgroundStyles,
                    backgroundColor: '#f3f4f6',
                    width: finalContainerDimensions.width,
                    height: finalContainerDimensions.height,
                    position: 'relative' as const,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    ...style
                }}
                role="img"
                aria-label={`Background image failed to load: ${alt}`}
            >
                <span>Background failed to load</span>
                {children}
            </div>
        );
    }

    return (
        <>
            {/* Hidden Image for loading */}
            <Image
                ref={imgRef}
                src={src}
                alt={alt}
                id={imageId}
                placeholder={placeholder}
                blurDataURL={blurUrl}
                width={maintainAspectRatio ? imageDimensions.width || width : width}
                height={maintainAspectRatio ? imageDimensions.height || height : height}
                loading={loading}
                priority={priority}
                quality={quality}
                sizes={sizes}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                    position: 'absolute',
                    top: '-9999px',
                    left: '-9999px',
                    opacity: 0,
                    pointerEvents: 'none',
                    zIndex: -1
                }}
                aria-hidden="true"
            />

            {/* Background Container */}
            <div
                className="responsiveImage"
                style={{
                    ...backgroundStyles,
                    backgroundImage: blurUrl ? `url(${blurUrl})` : 'none',
                    width: finalContainerDimensions.width,
                    height: finalContainerDimensions.height,
                    position: 'relative' as const,
                    overflow: 'hidden',
                }}
                role="img"
                aria-label={alt}
            >
                {/* Main Content Container */}
                <div
                    id={containerId}
                    className={`${className} responsiveImage ${isLoaded ? 'fadeIn' : ''}`}
                    style={{
                        ...backgroundStyles,
                        backgroundImage: isLoaded && finalImageSrc
                            ? `url(${finalImageSrc})`
                            : blurUrl ? `url(${blurUrl})` : 'none',
                        width: finalContainerDimensions.width,
                        height: finalContainerDimensions.height,
                        position: 'absolute' as const,
                        top: 0,
                        left: 0,
                        opacity: isLoaded ? 1 : 0.8,
                        transition: `all ${transitionDuration}ms ease-in-out`,
                        ...style
                    }}
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export default ImgBG;