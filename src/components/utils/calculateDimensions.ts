
import { useState, useCallback } from 'react';

interface DimensionInput {
    naturalWidth: number;
    naturalHeight: number;
    width?: number | string;
    height?: number | string;
    maintainAspectRatio?: boolean;
}

interface DimensionOutput {
    width: number;
    height: number;
}

interface BackgroundDimensionOutput extends DimensionOutput {
    backgroundSize: string;
}

/**
 * Calcula las dimensiones responsive manteniendo la proporción de aspecto
 * @param params - Parámetros de entrada con dimensiones naturales y preferencias
 * @returns Dimensiones calculadas
 */
export const calculateDimensions = ({
    naturalWidth,
    naturalHeight,
    width,
    height,
    maintainAspectRatio = true
}: DimensionInput): DimensionOutput => {
    // Si no se debe mantener la proporción, usar dimensiones proporcionadas o naturales
    if (!maintainAspectRatio) {
        return {
            width: (typeof width === 'number' ? width : naturalWidth),
            height: (typeof height === 'number' ? height : naturalHeight)
        };
    }

    const aspectRatio = naturalWidth / naturalHeight;
    
    // Si se proporciona tanto width como height, usar el que resulte en menor tamaño
    if (width && height) {
        const numWidth = typeof width === 'number' ? width : parseInt(width.toString());
        const numHeight = typeof height === 'number' ? height : parseInt(height.toString());
        
        const widthByHeight = numHeight * aspectRatio;
        const heightByWidth = numWidth / aspectRatio;
        
        if (widthByHeight <= numWidth) {
            return { width: widthByHeight, height: numHeight };
        } else {
            return { width: numWidth, height: heightByWidth };
        }
    }
    
    // Si solo se proporciona width
    if (width && !height) {
        const numWidth = typeof width === 'number' ? width : parseInt(width.toString());
        return { 
            width: numWidth, 
            height: numWidth / aspectRatio 
        };
    }
    
    // Si solo se proporciona height
    if (height && !width) {
        const numHeight = typeof height === 'number' ? height : parseInt(height.toString());
        return { 
            width: numHeight * aspectRatio, 
            height: numHeight 
        };
    }
    
    // Si no se proporciona ninguna dimensión, usar las naturales
    return { width: naturalWidth, height: naturalHeight };
};

/**
 * Versión especializada para componentes de background que también calcula backgroundSize
 * @param params - Parámetros de entrada incluyendo backgroundSize deseado
 * @returns Dimensiones calculadas con backgroundSize optimizado
 */
export const calculateBackgroundDimensions = ({
    naturalWidth,
    naturalHeight,
    width,
    height,
    maintainAspectRatio = true,
    backgroundSize = 'cover'
}: DimensionInput & { backgroundSize?: string }): BackgroundDimensionOutput => {
    const baseDimensions = calculateDimensions({
        naturalWidth,
        naturalHeight,
        width,
        height,
        maintainAspectRatio
    });

    if (!maintainAspectRatio) {
        return {
            ...baseDimensions,
            backgroundSize
        };
    }

    let finalBackgroundSize = backgroundSize;
    const aspectRatio = naturalWidth / naturalHeight;
    
    // Si se proporciona tanto width como height, calcular el mejor ajuste
    if (width && height) {
        const numWidth = typeof width === 'number' ? width : parseInt(width.toString());
        const numHeight = typeof height === 'number' ? height : parseInt(height.toString());
        const containerAspectRatio = numWidth / numHeight;
        
        // Ajustar backgroundSize automáticamente para mantener proporción
        if (backgroundSize === 'cover' || backgroundSize === 'contain') {
            if (aspectRatio > containerAspectRatio) {
                // Imagen más ancha que el contenedor
                finalBackgroundSize = backgroundSize === 'cover' ? 'cover' : 'contain';
            } else {
                // Imagen más alta que el contenedor
                finalBackgroundSize = backgroundSize === 'cover' ? 'cover' : 'contain';
            }
        }
    }
    
    return {
        ...baseDimensions,
        backgroundSize: finalBackgroundSize
    };
};

/**
 * Hook personalizado para usar calculateDimensions con estado
 * @param initialDimensions - Dimensiones iniciales
 * @returns Estado y función para actualizar dimensiones
 */
export const useDimensions = (initialDimensions?: Partial<DimensionInput>) => {
    const [dimensions, setDimensions] = useState<DimensionOutput>({ width: 0, height: 0 });
    
    const updateDimensions = useCallback((params: DimensionInput) => {
        const newDimensions = calculateDimensions(params);
        setDimensions(newDimensions);
        return newDimensions;
    }, []);
    
    return { dimensions, updateDimensions };
};