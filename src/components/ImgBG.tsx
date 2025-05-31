"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import ImgProps from './ImgProps';

interface ExtendedImgProps extends ImgProps {
    children?: React.ReactNode;
    backgroundAttachment?: 'fixed' | 'scroll' | 'local';
    transitionDuration?: number;
    removeDelay?: number;
    backgroundSize?: 'cover' | 'contain' | 'auto' | string;
    backgroundPosition?: string;
    maintainAspectRatio?: boolean;
}

const ImgBG: React.FC<ExtendedImgProps> = ({
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

    // Calculate responsive dimensions maintaining aspect ratio
    const calculateDimensions = useCallback((naturalWidth: number, naturalHeight: number) => {
        if (!maintainAspectRatio) {
            return { 
                containerWidth: width || naturalWidth, 
                containerHeight: height || naturalHeight,
                backgroundSize: backgroundSize 
            };
        }

        const aspectRatio = naturalWidth / naturalHeight;
        let finalBackgroundSize = backgroundSize;
        
        // Si se proporciona tanto width como height, calcular el mejor ajuste
        if (width && height) {
            const containerAspectRatio = (width as number) / (height as number);
            
            // Si queremos mantener proporción, ajustar backgroundSize automáticamente
            if (backgroundSize === 'cover' || backgroundSize === 'contain') {
                if (aspectRatio > containerAspectRatio) {
                    // Imagen más ancha que el contenedor
                    finalBackgroundSize = backgroundSize === 'cover' ? 'cover' : 'contain';
                } else {
                    // Imagen más alta que el contenedor
                    finalBackgroundSize = backgroundSize === 'cover' ? 'cover' : 'contain';
                }
            }
            
            return { 
                containerWidth: width, 
                containerHeight: height,
                backgroundSize: finalBackgroundSize
            };
        }
        
        // Si solo se proporciona width
        if (width && !height) {
            return { 
                containerWidth: width, 
                containerHeight: (width as number) / aspectRatio,
                backgroundSize: finalBackgroundSize
            };
        }
        
        // Si solo se proporciona height
        if (height && !width) {
            return { 
                containerWidth: (height as number) * aspectRatio, 
                containerHeight: height,
                backgroundSize: finalBackgroundSize
            };
        }
        
        // Si no se proporciona ninguna dimensión, usar las naturales
        return { 
            containerWidth: naturalWidth, 
            containerHeight: naturalHeight,
            backgroundSize: finalBackgroundSize
        };
    }, [width, height, maintainAspectRatio, backgroundSize]);

    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        const target = event.target as HTMLImageElement;
        const imageSrc = target.src;
        const naturalWidth = target.naturalWidth;
        const naturalHeight = target.naturalHeight;
        
        if (!imageSrc) return;

        // Guardar las dimensiones originales de la imagen
        setImageDimensions({ width: naturalWidth, height: naturalHeight });

        // Calcular dimensiones del contenedor manteniendo proporción
        const calculatedDimensions = calculateDimensions(naturalWidth, naturalHeight);
        setContainerDimensions({
            width: calculatedDimensions.containerWidth,
            height: calculatedDimensions.containerHeight
        });

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
    }, [removeDelay, calculateDimensions]);

    const handleImageError = useCallback(() => {
        setHasError(true);
        console.error(`Failed to load background image: ${src}`);
    }, [src]);

    // Generate safe IDs
    const containerId = id ? `${id}Container` : undefined;
    const imageId = id ? `${id}Img` : undefined;

    // Get blur data URL
    const blurUrl = typeof src === 'object' && src.blurDataURL ? src.blurDataURL : '';

    // Calculate final background size
    const finalBackgroundSize = maintainAspectRatio && isLoaded 
        ? calculateDimensions(imageDimensions.width, imageDimensions.height).backgroundSize
        : backgroundSize;

    // Common background styles
    const backgroundStyles = {
        backgroundSize: finalBackgroundSize,
        backgroundPosition,
        backgroundRepeat: 'no-repeat' as const,
        backgroundAttachment,
    };

    // Use calculated dimensions if maintaining aspect ratio and loaded
    const finalContainerDimensions = maintainAspectRatio && isLoaded 
        ? containerDimensions 
        : { width, height };

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