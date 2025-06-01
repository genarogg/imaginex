"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ImgBGProps } from '../utils/ImgProps';
import { handleBackgroundImageLoad } from '../utils/handleImageLoadUtil';
import ImageError from '../utils/ImageError';

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
    // Estados consolidados en un solo objeto para reducir renders
    const [imageState, setImageState] = useState({
        isLoaded: false,
        hasError: false,
        finalImageSrc: '',
        imageDimensions: { width: 0, height: 0 },
        containerDimensions: { width, height },
        calculatedBackgroundSize: backgroundSize
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    // Memoizar blur URL para evitar recálculos
    const blurUrl = useMemo(() => 
        typeof src === 'object' && src.blurDataURL ? src.blurDataURL : '',
        [src]
    );

    // Memoizar IDs seguros
    const ids = useMemo(() => ({
        container: id ? `${id}Container` : undefined,
        image: id ? `${id}Img` : undefined
    }), [id]);

    // Cleanup optimizado
    const cleanup = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    useEffect(() => cleanup, [cleanup]);

    // Handler consolidado para actualizar estado
    const updateImageState = useCallback((updates: Partial<typeof imageState>) => {
        setImageState(prev => ({ ...prev, ...updates }));
    }, []);

    // Handle image load optimizado
    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        handleBackgroundImageLoad({
            event,
            width,
            height,
            maintainAspectRatio,
            backgroundSize,
            onImageLoaded: (imageSrc, imageDimensions, containerDimensions, calculatedBackgroundSize) => {
                updateImageState({
                    imageDimensions,
                    containerDimensions,
                    calculatedBackgroundSize,
                    finalImageSrc: imageSrc,
                    isLoaded: true,
                    hasError: false
                });

                // Delay removal optimizado
                timeoutRef.current = setTimeout(() => {
                    imgRef.current?.remove();
                    imgRef.current = null;
                }, removeDelay);
            }
        });
    }, [removeDelay, width, height, maintainAspectRatio, backgroundSize, updateImageState]);

    const handleImageError = useCallback(() => {
        updateImageState({ hasError: true });
        console.error(`Failed to load background image: ${src}`);
    }, [src, updateImageState]);

    // Memoizar dimensiones finales
    const finalDimensions = useMemo(() => 
        maintainAspectRatio && imageState.isLoaded
            ? imageState.containerDimensions
            : { width, height },
        [maintainAspectRatio, imageState.isLoaded, imageState.containerDimensions, width, height]
    );

    // Memoizar background size final
    const finalBackgroundSize = useMemo(() =>
        maintainAspectRatio && imageState.isLoaded
            ? imageState.calculatedBackgroundSize
            : backgroundSize,
        [maintainAspectRatio, imageState.isLoaded, imageState.calculatedBackgroundSize, backgroundSize]
    );

    // Memoizar estilos base de background
    const baseBackgroundStyles = useMemo(() => ({
        backgroundSize: finalBackgroundSize,
        backgroundPosition,
        backgroundRepeat: 'no-repeat' as const,
        backgroundAttachment,
    }), [finalBackgroundSize, backgroundPosition, backgroundAttachment]);

    // Memoizar estilos del contenedor principal
    const containerStyles = useMemo(() => ({
        ...baseBackgroundStyles,
        backgroundImage: blurUrl ? `url(${blurUrl})` : 'none',
        width: finalDimensions.width,
        height: finalDimensions.height,
        position: 'relative' as const,
        overflow: 'hidden',
    }), [baseBackgroundStyles, blurUrl, finalDimensions]);

    // Memoizar estilos del contenido principal
    const contentStyles = useMemo(() => ({
        ...baseBackgroundStyles,
        backgroundImage: imageState.isLoaded && imageState.finalImageSrc
            ? `url(${imageState.finalImageSrc})`
            : blurUrl ? `url(${blurUrl})` : 'none',
        width: finalDimensions.width,
        height: finalDimensions.height,
        position: 'absolute' as const,
        top: 0,
        left: 0,
        opacity: imageState.isLoaded ? 1 : 0.8,
        transition: `all ${transitionDuration}ms ease-in-out`,
        ...style
    }), [
        baseBackgroundStyles, 
        imageState.isLoaded, 
        imageState.finalImageSrc, 
        blurUrl, 
        finalDimensions, 
        transitionDuration, 
        style
    ]);

    // Memoizar dimensiones de la imagen oculta
    const hiddenImageDimensions = useMemo(() => ({
        width: maintainAspectRatio ? (imageState.imageDimensions.width || width) : width,
        height: maintainAspectRatio ? (imageState.imageDimensions.height || height) : height
    }), [maintainAspectRatio, imageState.imageDimensions, width, height]);

    // Early return para estado de error
    if (imageState.hasError) {
        return (
            <ImageError
                width={finalDimensions.width}
                height={finalDimensions.height}
                alt={alt}
                className={className}
                style={{
                    ...baseBackgroundStyles,
                    ...style
                }}
                errorMessage="Background image failed to load"
                isBackground={true}
            >
                {children}
            </ImageError>
        );
    }

    return (
        <>
            {/* Hidden Image for loading - Solo renderizar si no está cargado */}
            {!imageState.isLoaded && (
                <Image
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    id={ids.image}
                    placeholder={placeholder}
                    blurDataURL={blurUrl}
                    width={hiddenImageDimensions.width}
                    height={hiddenImageDimensions.height}
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
            )}

            {/* Background Container */}
            <div
                className="responsiveImage"
                style={containerStyles}
                role="img"
                aria-label={alt}
            >
                {/* Main Content Container */}
                <div
                    id={ids.container}
                    className={`${className} responsiveImage ${imageState.isLoaded ? 'fadeIn' : ''}`}
                    style={contentStyles}
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export default React.memo(ImgBG);