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
 * Ahora prioriza las dimensiones originales para evitar layout shifts
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
            width: (typeof width === 'number' ? width : naturalWidth) || naturalWidth,
            height: (typeof height === 'number' ? height : naturalHeight) || naturalHeight
        };
    }

    // Si no hay dimensiones naturales válidas, usar las proporcionadas
    if (!naturalWidth || !naturalHeight || naturalWidth <= 0 || naturalHeight <= 0) {
        return {
            width: (typeof width === 'number' ? width : 300),
            height: (typeof height === 'number' ? height : 200)
        };
    }

    const aspectRatio = naturalWidth / naturalHeight;

    // Convertir dimensiones a números si son strings
    const numWidth = typeof width === 'number' ? width : (width ? parseInt(width.toString()) : undefined);
    const numHeight = typeof height === 'number' ? height : (height ? parseInt(height.toString()) : undefined);

    // Si se proporciona tanto width como height, calcular para mantener aspect ratio
    if (numWidth && numHeight) {
        const targetAspectRatio = numWidth / numHeight;

        // Si los aspect ratios son similares (diferencia < 5%), usar dimensiones exactas
        if (Math.abs(aspectRatio - targetAspectRatio) / aspectRatio < 0.05) {
            return { width: numWidth, height: numHeight };
        }

        // Mantener aspect ratio de la imagen, ajustando al contenedor más pequeño
        if (aspectRatio > targetAspectRatio) {
            // Imagen más ancha - ajustar por width
            return {
                width: numWidth,
                height: Math.round(numWidth / aspectRatio)
            };
        } else {
            // Imagen más alta - ajustar por height
            return {
                width: Math.round(numHeight * aspectRatio),
                height: numHeight
            };
        }
    }

    // Si solo se proporciona width
    if (numWidth && !numHeight) {
        return {
            width: numWidth,
            height: Math.round(numWidth / aspectRatio)
        };
    }

    // Si solo se proporciona height
    if (numHeight && !numWidth) {
        return {
            width: Math.round(numHeight * aspectRatio),
            height: numHeight
        };
    }

    // Si no se proporciona ninguna dimensión, usar las naturales pero limitadas
    // Limitar dimensiones máximas para evitar imágenes demasiado grandes
    const maxWidth = 1200;
    const maxHeight = 800;

    let finalWidth = naturalWidth;
    let finalHeight = naturalHeight;

    // Escalar si excede los límites máximos
    if (naturalWidth > maxWidth) {
        finalWidth = maxWidth;
        finalHeight = Math.round(maxWidth / aspectRatio);
    }

    if (finalHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = Math.round(maxHeight * aspectRatio);
    }

    return { width: finalWidth, height: finalHeight };
};

/**
 * Versión especializada para componentes de background que también calcula backgroundSize
 * Optimizada para evitar cambios de layout
 */
export const calculateBackgroundDimensions = ({
    naturalWidth,
    naturalHeight,
    width,
    height,
    maintainAspectRatio = true,
    backgroundSize = 'cover'
}: DimensionInput & { backgroundSize?: string }): BackgroundDimensionOutput => {

    // Para backgrounds, si se proporcionan dimensiones específicas, usarlas directamente
    // para evitar layout shift
    if (!maintainAspectRatio && width && height) {
        const numWidth = typeof width === 'number' ? width : parseInt(width.toString());
        const numHeight = typeof height === 'number' ? height : parseInt(height.toString());

        return {
            width: numWidth,
            height: numHeight,
            backgroundSize
        };
    }

    const baseDimensions = calculateDimensions({
        naturalWidth,
        naturalHeight,
        width,
        height,
        maintainAspectRatio
    });

    let finalBackgroundSize = backgroundSize;

    // Solo calcular backgroundSize automático si se mantiene aspect ratio
    if (maintainAspectRatio && naturalWidth > 0 && naturalHeight > 0) {
        const aspectRatio = naturalWidth / naturalHeight;

        // Si se proporciona tanto width como height, calcular el mejor ajuste
        if (width && height) {
            const numWidth = typeof width === 'number' ? width : parseInt(width.toString());
            const numHeight = typeof height === 'number' ? height : parseInt(height.toString());
            const containerAspectRatio = numWidth / numHeight;

            // Mantener backgroundSize original para consistencia
            if (backgroundSize === 'cover' || backgroundSize === 'contain') {
                // Solo ajustar si hay una diferencia significativa en aspect ratios
                const aspectDiff = Math.abs(aspectRatio - containerAspectRatio) / aspectRatio;
                if (aspectDiff > 0.1) {
                    finalBackgroundSize = backgroundSize; // Mantener el original
                }
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
 * Optimizado para reducir re-renders
 */
export const useDimensions = (initialDimensions?: Partial<DimensionInput>) => {
    const [dimensions, setDimensions] = useState<DimensionOutput>(() => {
        // Inicializar con dimensiones por defecto si se proporcionan
        if (initialDimensions?.width && initialDimensions?.height) {
            const numWidth = typeof initialDimensions.width === 'number'
                ? initialDimensions.width
                : parseInt(initialDimensions.width.toString());
            const numHeight = typeof initialDimensions.height === 'number'
                ? initialDimensions.height
                : parseInt(initialDimensions.height.toString());
            return { width: numWidth, height: numHeight };
        }
        return { width: 0, height: 0 };
    });

    const updateDimensions = useCallback((params: DimensionInput) => {
        const newDimensions = calculateDimensions(params);

        // Solo actualizar si las dimensiones han cambiado significativamente
        setDimensions(prev => {
            const widthChanged = Math.abs(prev.width - newDimensions.width) > 1;
            const heightChanged = Math.abs(prev.height - newDimensions.height) > 1;

            if (widthChanged || heightChanged) {
                return newDimensions;
            }
            return prev;
        });

        return newDimensions;
    }, []);

    return { dimensions, updateDimensions };
};