'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Image from 'next/image';
import { ImgRemoteProps } from '../utils/ImgProps';
import svg from '../svg';
import { handleImageLoad as handleImageLoadUtil } from '../utils/handleImageLoadUtil';
import { fetchRemoteBase64 } from '../utils/fetchRemoteBase64Util';
import { calculateDimensions } from '../utils/calculateDimensions';
import ImageError from '../utils/ImageError';

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
    // Pre-calcular dimensiones iniciales para evitar layout shift
    const initialDimensions = useMemo(() => {
        if (!maintainAspectRatio) {
            return { width: width || 0, height: height || 0 };
        }
        // Para mantener aspect ratio, usar las dimensiones proporcionadas inicialmente
        return { width: width || 0, height: height || 0 };
    }, [width, height, maintainAspectRatio]);

    // Estado consolidado para reducir re-renders
    const [imageState, setImageState] = useState({
        svgBackground: blurDataURL ? svg({ base64: blurDataURL }) : null,
        isLoaded: !blurDataURL,
        hasError: false,
        isImageLoaded: false,
        // Usar dimensiones fijas inicialmente
        imageDimensions: initialDimensions,
        containerDimensions: initialDimensions
    });

    const imgRef = useRef<HTMLImageElement | null>(null);

    // Memoizar si es imagen remota
    const isRemoteImage = useMemo(() =>
        typeof src === 'string' && src.startsWith('http'),
        [src]
    );

    // Memoizar placeholder y blur data URL actuales
    const imageConfig = useMemo(() => ({
        actualPlaceholder: (isRemoteImage && !blurDataURL && !imageState.svgBackground) ? 'empty' : placeholder,
        actualBlurDataURL: imageState.svgBackground || blurDataURL
    }), [isRemoteImage, blurDataURL, imageState.svgBackground, placeholder]);

    // Memoizar IDs únicos
    const ids = useMemo(() => ({
        container: id ? `${id}Container` : undefined,
        img: id ? `${id}Img` : undefined,
        ghost: id ? `${id}Ghost` : undefined
    }), [id]);

    // Usar dimensiones fijas del contenedor para evitar layout shift
    const containerDimensions = useMemo(() =>
        imageState.containerDimensions,
        [imageState.containerDimensions]
    );

    // Dimensiones de la imagen - mantener consistencia
    const imageDimensions = useMemo(() =>
        imageState.imageDimensions,
        [imageState.imageDimensions]
    );

    // Memoizar duración de transiciones
    const transitionDurations = useMemo(() => ({
        background: transitionDuration * 0.3,
        opacity: transitionDuration * 0.7
    }), [transitionDuration]);

    // Memoizar estilos del contenedor principal
    const containerStyles = useMemo(() => ({
        width: containerDimensions.width,
        height: containerDimensions.height,
        position: 'relative' as const,
        overflow: 'hidden',
        ...style
    }), [containerDimensions, style]);

    // Memoizar estilos del contenedor de background
    const backgroundContainerStyles = useMemo(() => ({
        backgroundImage: imageState.svgBackground ? `url(${imageState.svgBackground})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: containerDimensions.width,
        height: containerDimensions.height,
        position: 'relative' as const,
        overflow: 'hidden',
        transition: `background-image ${transitionDurations.background}ms ease-out`
    }), [imageState.svgBackground, containerDimensions, transitionDurations.background]);

    // Memoizar estilos de la imagen
    const imageStyles = useMemo(() => ({
        position: 'absolute' as const,
        opacity: imageState.isImageLoaded ? 1 : 0,
        transition: `opacity ${transitionDurations.opacity}ms ease-in-out`,
        objectFit: objectFit,
        width: '100%',
        height: '100%'
    }), [imageState.isImageLoaded, transitionDurations.opacity, objectFit]);

    // Memoizar estilos del ghost div
    const ghostStyles = useMemo(() => ({
        width: containerDimensions.width,
        height: containerDimensions.height,
        pointerEvents: 'none' as const
    }), [containerDimensions]);

    // Memoizar estilos del estado de loading
    const loadingStyles = useMemo(() => ({
        width: containerDimensions.width,
        height: containerDimensions.height,
        position: 'relative' as const,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        ...style
    }), [containerDimensions, style]);

    // Handler consolidado para actualizar estado
    const updateImageState = useCallback((updates: Partial<typeof imageState>) => {
        setImageState(prev => ({ ...prev, ...updates }));
    }, []);

    // Handle remote image base64 fetching optimizado
    const handleFetchRemoteBase64 = useCallback(async (imageUrl: string) => {
        try {
            const result = await fetchRemoteBase64({
                imageUrl,
                fetchTimeout,
                onLoadStart,
                onError
            });

            if (result.success && result.svgData) {
                updateImageState({
                    svgBackground: result.svgData,
                    isLoaded: false
                });
            } else {
                // Silently fall back to direct image loading without blur effect
                updateImageState({
                    isLoaded: true,
                    svgBackground: null
                });
            }
        } catch (error) {
            console.warn('Failed to fetch remote base64:', error);
            updateImageState({
                isLoaded: true,
                svgBackground: null
            });
        }
    }, [fetchTimeout, onLoadStart, onError, updateImageState]);

    // Effect optimizado para manejar fetching de imágenes remotas
    useEffect(() => {
        if (isRemoteImage && !blurDataURL) {
            handleFetchRemoteBase64(src);
        }
    }, [src, blurDataURL, handleFetchRemoteBase64, isRemoteImage]);

    // Handle image load optimizado - SIN cambiar dimensiones del DOM
    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        // Solo calcular dimensiones si maintainAspectRatio está habilitado
        // y solo para actualizar el estado interno, NO el DOM
        if (maintainAspectRatio) {
            const calculatedDimensions = calculateDimensions({
                naturalWidth,
                naturalHeight,
                width,
                height,
                maintainAspectRatio
            });

            // Actualizar solo el estado interno, mantener dimensiones del contenedor fijas
            updateImageState({
                imageDimensions: calculatedDimensions,
                isImageLoaded: true
            });
        } else {
            updateImageState({
                isImageLoaded: true
            });
        }

        // Llamar el handler original solo para efectos de transición, NO para cambiar dimensiones
        handleImageLoadUtil({
            event,
            id,
            width,
            height,
            maintainAspectRatio: false, // Importante: evitar cambios de dimensiones
            componentType: 'remote',
            transitionDuration,
            onDimensionsCalculated: () => { }, // No hacer nada con las dimensiones
            onLoadComplete
        });
    }, [id, transitionDuration, onLoadComplete, width, height, maintainAspectRatio, updateImageState]);

    // Handle image error optimizado
    const handleImageError = useCallback((error: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const err = new Error(`Failed to load image: ${src}`);
        console.error('Image load error:', err);
        updateImageState({ hasError: true });
        onError?.(err);
        console.error(`Error loading image: ${src}`, error);
    }, [src, onError, updateImageState]);

    // Early return para estado de error
    if (imageState.hasError) {
        return (
            <ImageError
                width={containerDimensions.width}
                height={containerDimensions.height}
                alt={alt}
                className={className}
                style={style}
                errorMessage="Remote image failed to load"
            >
                {children}
            </ImageError>
        );
    }

    // Early return para estado de loading sin background
    if (!imageState.svgBackground && !imageState.isLoaded && isRemoteImage) {
        return (
            <div
                style={loadingStyles}
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
            style={containerStyles}
            className="responsiveImage"
        >
            <div
                style={backgroundContainerStyles}
                className="responsiveImage"
                id={ids.container}
            >
                <Image
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    id={ids.img}
                    className={`${className} responsiveImage ${imageState.isImageLoaded ? 'fadeIn' : ''}`}
                    placeholder={imageConfig.actualPlaceholder}
                    blurDataURL={imageConfig.actualBlurDataURL}
                    width={imageDimensions.width}
                    height={imageDimensions.height}
                    loading={loading}
                    priority={priority}
                    quality={quality}
                    sizes={sizes}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={imageStyles}
                />
                <div
                    className="responsiveImage"
                    style={ghostStyles}
                    id={ids.ghost}
                    aria-hidden="true"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default React.memo(ImgRemote);