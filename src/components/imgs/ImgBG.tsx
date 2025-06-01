"use client";

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { ImgBGProps } from '../utils/ImgProps';

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
}) => {
    // Estados consolidados
    const [imageState, setImageState] = useState({
        isLoaded: false,
        hasError: false,
        finalImageSrc: '',
        showImage: false
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

    // Calcular dimensiones finales desde el inicio - ESTO ES CLAVE
    const finalDimensions = useMemo(() => {
        // Para background images, siempre usar las dimensiones proporcionadas
        // No cambiar después de la carga para evitar layout shift
        return {
            width: typeof width === 'number' ? width : (typeof width === 'string' ? parseInt(width) : 960),
            height: typeof height === 'number' ? height : (typeof height === 'string' ? parseInt(height) : 540)
        };
    }, [width, height]);

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

    // Handle image load - SIMPLIFICADO para evitar cambios de dimensiones
    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        const imageSrc = img.src;

        // Solo actualizar el src y marcar como cargado
        // NO recalcular dimensiones para evitar layout shift
        updateImageState({
            finalImageSrc: imageSrc,
            isLoaded: true,
            hasError: false,
            showImage: true
        });

        // Delay removal optimizado
        timeoutRef.current = setTimeout(() => {
            if (imgRef.current) {
                imgRef.current.remove();
                imgRef.current = null;
            }
        }, removeDelay);
    }, [removeDelay, updateImageState]);

    const handleImageError = useCallback(() => {
        updateImageState({ hasError: true });
        console.error(`Failed to load background image: ${src}`);
    }, [src, updateImageState]);

    // Memoizar estilos base de background
    const baseBackgroundStyles = useMemo(() => ({
        backgroundSize,
        backgroundPosition,
        backgroundRepeat: 'no-repeat' as const,
        backgroundAttachment,
    }), [backgroundSize, backgroundPosition, backgroundAttachment]);

    // Memoizar estilos del contenedor principal - DIMENSIONES FIJAS
    const containerStyles = useMemo(() => ({
        ...baseBackgroundStyles,
        backgroundImage: blurUrl ? `url(${blurUrl})` : 'none',
        width: finalDimensions.width,
        height: finalDimensions.height,
        position: 'relative' as const,
        overflow: 'hidden',
    }), [baseBackgroundStyles, blurUrl, finalDimensions]);

    // Memoizar estilos del contenido principal - DIMENSIONES FIJAS
    const contentStyles = useMemo(() => ({
        ...baseBackgroundStyles,
        backgroundImage: imageState.showImage && imageState.finalImageSrc
            ? `url(${imageState.finalImageSrc})`
            : 'none',
        width: finalDimensions.width,
        height: finalDimensions.height,
        position: 'absolute' as const,
        top: 0,
        left: 0,
        opacity: imageState.isLoaded ? 1 : 0,
        transition: `opacity ${transitionDuration}ms ease-in-out`,
        ...style
    }), [
        baseBackgroundStyles, 
        imageState.showImage, 
        imageState.finalImageSrc, 
        finalDimensions, 
        imageState.isLoaded,
        transitionDuration, 
        style
    ]);

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
                    width={finalDimensions.width}
                    height={finalDimensions.height}
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

            {/* Background Container - DIMENSIONES FIJAS */}
            <div
                className="responsiveImage"
                style={containerStyles}
                role="img"
                aria-label={alt}
            >
                {/* Main Content Container - DIMENSIONES FIJAS */}
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