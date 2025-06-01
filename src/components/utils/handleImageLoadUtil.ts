import { calculateDimensions, calculateBackgroundDimensions } from './calculateDimensions';

export interface ImageLoadHandlerParams {
  event: React.SyntheticEvent<HTMLImageElement>;
  id?: string;
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
  onDimensionsCalculated?: (dimensions: { width: number; height: number }) => void;
  onLoadComplete?: () => void;
  transitionDuration?: number;
  backgroundSize?: string;
  componentType?: 'local' | 'remote' | 'background';
}

export interface BackgroundImageLoadHandlerParams {
  event: React.SyntheticEvent<HTMLImageElement>;
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
  backgroundSize?: string;
  onImageLoaded?: (imageSrc: string, dimensions: { width: number; height: number }, containerDimensions: { width: number; height: number }, calculatedBackgroundSize: string) => void;
}

/**
 * Maneja la carga de imágenes para componentes ImgLocal e ImgRemote
 */
export const handleImageLoad = ({
  event,
  id,
  width,
  height,
  maintainAspectRatio = true,
  onDimensionsCalculated,
  onLoadComplete,
  transitionDuration = 500,
  componentType = 'local'
}: ImageLoadHandlerParams) => {
  const img = event.currentTarget;
  const naturalWidth = img.naturalWidth;
  const naturalHeight = img.naturalHeight;
  
  // Solo calcular dimensiones si maintainAspectRatio está habilitado
  // Si no, usar las dimensiones proporcionadas originalmente
  let calculatedDimensions;
  
  if (maintainAspectRatio) {
    calculatedDimensions = calculateDimensions({
      naturalWidth,
      naturalHeight,
      width,
      height,
      maintainAspectRatio
    });
  } else {
    // Usar dimensiones originales sin recalcular
    calculatedDimensions = {
      width: width || naturalWidth,
      height: height || naturalHeight
    };
  }
  
  // Notificar las dimensiones calculadas solo si son diferentes a las originales
  const dimensionsChanged = (
    maintainAspectRatio && 
    (calculatedDimensions.width !== width || calculatedDimensions.height !== height)
  );
  
  if (dimensionsChanged) {
    onDimensionsCalculated?.(calculatedDimensions);
  }
  
  if (!id) {
    onLoadComplete?.();
    return;
  }

  // Usar requestAnimationFrame para mejor performance
  requestAnimationFrame(() => {
    const container = document.getElementById(`${id}Container`);
    const imgElement = document.getElementById(`${id}Img`);
    const ghost = document.getElementById(`${id}Ghost`);

    if (imgElement && container && ghost) {
      // Solo actualizar dimensiones del DOM si realmente cambiaron
      if (dimensionsChanged) {
        const { width: calcWidth, height: calcHeight } = calculatedDimensions;
        container.style.cssText += `width: ${calcWidth}px; height: ${calcHeight}px;`;
        ghost.style.cssText += `width: ${calcWidth}px; height: ${calcHeight}px;`;
      }
      
      // Mostrar imagen con transición suave
      imgElement.style.opacity = '1';

      // Remover background con delay para transición suave
      const delay = componentType === 'remote' ? transitionDuration : 500;
      setTimeout(() => {
        if (container.style.backgroundImage) {
          container.style.backgroundImage = 'none';
        }
        onLoadComplete?.();
      }, delay);
    } else {
      // Si no hay elementos DOM, solo completar la carga
      onLoadComplete?.();
    }
  });
};

/**
 * Maneja la carga de imágenes para componente ImgBG (background)
 */
export const handleBackgroundImageLoad = ({
  event,
  width,
  height,
  maintainAspectRatio = true,
  backgroundSize = 'cover',
  onImageLoaded
}: BackgroundImageLoadHandlerParams) => {
  const target = event.target as HTMLImageElement;
  const imageSrc = target.src;
  const naturalWidth = target.naturalWidth;
  const naturalHeight = target.naturalHeight;

  if (!imageSrc) return;

  // Para backgrounds, ser más conservador con los cambios de dimensiones
  let calculatedDimensions;
  let containerDimensions;
  
  if (maintainAspectRatio && width && height) {
    // Solo recalcular si se proporcionaron ambas dimensiones
    calculatedDimensions = calculateBackgroundDimensions({
      naturalWidth,
      naturalHeight,
      width,
      height,
      maintainAspectRatio,
      backgroundSize
    });
    
    containerDimensions = {
      width: calculatedDimensions.width,
      height: calculatedDimensions.height
    };
  } else {
    // Usar dimensiones proporcionadas o naturales sin recalcular
    const finalWidth = typeof width === 'number' ? width : naturalWidth;
    const finalHeight = typeof height === 'number' ? height : naturalHeight;
    
    containerDimensions = {
      width: finalWidth,
      height: finalHeight
    };
    
    calculatedDimensions = {
      width: finalWidth,
      height: finalHeight,
      backgroundSize
    };
  }

  const imageDimensions = {
    width: naturalWidth,
    height: naturalHeight
  };

  // Notificar los resultados
  onImageLoaded?.(
    imageSrc,
    imageDimensions,
    containerDimensions,
    calculatedDimensions.backgroundSize
  );
};