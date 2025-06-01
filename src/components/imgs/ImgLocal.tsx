'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import ImgProps from '../utils/ImgProps';
import { handleImageLoad as handleImageLoadUtil } from '../utils/handleImageLoadUtil';
import ImageError from '../utils/ImageError';
import { calculateDimensions } from '../utils/calculateDimensions';

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
    // Estado consolidado para reducir re-renders
    const [imageState, setImageState] = useState({
        isVisible: visible || priority,
        isLoaded: false,
        hasError: false,
        imageDimensions: { width: 0, height: 0 }
    });
    
    const imgRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Memoizar blur URL
    const blurDataURL = useMemo(() => src?.blurDataURL || '', [src?.blurDataURL]);

    // Memoizar IDs únicos
    const ids = useMemo(() => ({
        container: id ? `${id}Container` : undefined,
        img: id ? `${id}Img` : undefined,
        ghost: id ? `${id}Ghost` : undefined
    }), [id]);

    // NUEVO: Calcular dimensiones iniciales basadas en props
    const initialDimensions = useMemo(() => {
        if (maintainAspectRatio && src?.width && src?.height) {
            // Si tenemos dimensiones de la imagen estática, calcular desde el inicio
            return calculateDimensions({
                naturalWidth: src.width,
                naturalHeight: src.height,
                width,
                height,
                maintainAspectRatio
            });
        }
        // Usar dimensiones proporcionadas como fallback
        return { 
            width: typeof width === 'number' ? width : 960, 
            height: typeof height === 'number' ? height : 540 
        };
    }, [src, width, height, maintainAspectRatio]);

    // MODIFICADO: Usar dimensiones iniciales para evitar layout shift
    const containerDimensions = useMemo(() => 
        imageState.isLoaded && imageState.imageDimensions.width > 0
            ? imageState.imageDimensions 
            : initialDimensions,
        [imageState.isLoaded, imageState.imageDimensions, initialDimensions]
    );

    // Memoizar dimensiones de la imagen (sin cambios)
    const imageDimensions = useMemo(() => ({
        width: maintainAspectRatio && imageState.isLoaded 
            ? imageState.imageDimensions.width 
            : width,
        height: maintainAspectRatio && imageState.isLoaded 
            ? imageState.imageDimensions.height 
            : height
    }), [maintainAspectRatio, imageState.isLoaded, imageState.imageDimensions, width, height]);

    // Memoizar estilos del contenedor principal
    const containerStyles = useMemo(() => ({
        width: containerDimensions.width,
        height: containerDimensions.height,
        position: 'relative' as const,
        overflow: 'hidden',
        ...style
    }), [containerDimensions, style]);

    // Memoizar estilos del background blur
    const backgroundStyles = useMemo(() => ({
        backgroundImage: blurDataURL ? `url(${blurDataURL})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: containerDimensions.width,
        height: containerDimensions.height,
        position: 'relative' as const,
        overflow: 'hidden',
        transition: 'background-image 0.3s ease-out'
    }), [blurDataURL, containerDimensions]);

    // Memoizar estilos de la imagen
    const imageStyles = useMemo(() => ({ 
        position: 'absolute' as const,
        opacity: imageState.isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        objectFit: objectFit,
        width: '100%',
        height: '100%'
    }), [imageState.isLoaded, objectFit]);

    // Memoizar estilos del ghost div
    const ghostStyles = useMemo(() => ({ 
        width: containerDimensions.width, 
        height: containerDimensions.height,
        pointerEvents: 'none' as const
    }), [containerDimensions]);

    // Handler consolidado para actualizar estado
    const updateImageState = useCallback((updates: Partial<typeof imageState>) => {
        setImageState(prev => ({ ...prev, ...updates }));
    }, []);

    // Cleanup optimizado
    const cleanup = useCallback(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
    }, []);

    // Memoizar opciones del observer
    const observerOptions = useMemo(() => ({
        threshold: 0.1,
        rootMargin: '50px'
    }), []);

    // Inicializar intersection observer
    useEffect(() => {
        if (priority || visible) return; 
        
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            const entry = entries[0];
            if (entry?.isIntersecting) {
                updateImageState({ isVisible: true });
                observerRef.current?.disconnect();
            }
        };

        observerRef.current = new IntersectionObserver(handleIntersection, observerOptions);

        const currentRef = imgRef.current;
        if (currentRef && observerRef.current) {
            observerRef.current.observe(currentRef);
        }

        return cleanup;
    }, [priority, visible, cleanup, observerOptions, updateImageState]);

    // MODIFICADO: Handle image load con prevención de layout shift
    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        // Solo calcular nuevas dimensiones si hay diferencia significativa
        const newDimensions = calculateDimensions({
            naturalWidth,
            naturalHeight,
            width,
            height,
            maintainAspectRatio
        });

        // NUEVO: Solo actualizar si las dimensiones cambian significativamente (>2px)
        const shouldUpdateDimensions = Math.abs(newDimensions.width - containerDimensions.width) > 2 || 
                                     Math.abs(newDimensions.height - containerDimensions.height) > 2;

        if (shouldUpdateDimensions && maintainAspectRatio) {
            updateImageState({
                imageDimensions: newDimensions,
                isLoaded: true,
                hasError: false
            });
        } else {
            // Si no hay cambio significativo, solo marcar como cargado
            updateImageState({
                isLoaded: true,
                hasError: false
            });
        }

        // MODIFICADO: Llamar al handler original sin permitir cambios DOM abruptos
        handleImageLoadUtil({
            event,
            id,
            width,
            height,
            maintainAspectRatio: false, // Prevenir cambios DOM desde el handler
            componentType: 'local',
            onDimensionsCalculated: () => {}, // No hacer nada aquí
        });
    }, [id, width, height, maintainAspectRatio, updateImageState, containerDimensions]);

    const handleImageError = useCallback(() => {
        updateImageState({ 
            hasError: true, 
            isLoaded: true 
        });
    }, [updateImageState]);

    // Early return para estado de error
    if (imageState.hasError) {
        return (
            <ImageError
                width={containerDimensions.width}
                height={containerDimensions.height}
                alt={alt}
                className={className}
                style={style}
            />
        );
    }

    return (
        <div
            ref={imgRef}
            style={containerStyles}
            className={`responsiveImage ${className}`}
        >
            {imageState.isVisible && (
                <div
                    style={backgroundStyles}
                    className="responsiveImage"
                    id={ids.container}
                >
                    <Image
                        src={src}
                        alt={alt}
                        id={ids.img}
                        className={`${className} responsiveImage ${imageState.isLoaded ? 'fadeIn' : ''}`}
                        placeholder={placeholder}
                        blurDataURL={blurDataURL}
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
                    />
                </div>
            )}
        </div>
    );
};

export default React.memo(ImgLocal);