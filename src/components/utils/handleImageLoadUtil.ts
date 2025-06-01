
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
  
  // Calcular dimensiones usando la función utilitaria
  const calculatedDimensions = calculateDimensions({
    naturalWidth,
    naturalHeight,
    width,
    height,
    maintainAspectRatio
  });
  
  // Notificar las dimensiones calculadas
  onDimensionsCalculated?.(calculatedDimensions);
  
  if (!id) return;

  // Usar requestAnimationFrame para mejor performance
  requestAnimationFrame(() => {
    const container = document.getElementById(`${id}Container`);
    const imgElement = document.getElementById(`${id}Img`);
    const ghost = document.getElementById(`${id}Ghost`);

    if (imgElement && container && ghost) {
      const { width: calcWidth, height: calcHeight } = calculatedDimensions;

      // Actualizar DOM con dimensiones calculadas
      container.style.cssText += `width: ${calcWidth}px; height: ${calcHeight}px;`;
      ghost.style.cssText += `width: ${calcWidth}px; height: ${calcHeight}px;`;
      imgElement.style.opacity = '1';

      // Remover background con delay para transición suave
      const delay = componentType === 'remote' ? transitionDuration : 500;
      setTimeout(() => {
        container.style.backgroundImage = 'none';
        onLoadComplete?.();
      }, delay);
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

  // Usar la función utilitaria para calcular dimensiones y backgroundSize
  const calculatedDimensions = calculateBackgroundDimensions({
    naturalWidth,
    naturalHeight,
    width,
    height,
    maintainAspectRatio,
    backgroundSize
  });

  const containerDimensions = {
    width: calculatedDimensions.width,
    height: calculatedDimensions.height
  };

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