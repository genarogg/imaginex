export const translations = {
  en: {
    // Header
    title: "Img Component",
    subtitle: "A powerful and flexible image component for Next.js with automatic optimization and blur placeholders",
    viewOnGithub: "View on GitHub",
    starOnGithub: "⭐ Star us on GitHub",

    // Navigation
    introduction: "Introduction",
    features: "Features",
    installation: "Installation",
    usageExamples: "Usage Examples",
    apiReference: "API Reference",
    bestPractices: "Best Practices",

    // Introduction
    introText:
      "The Img component is a versatile image solution that supports local images, remote images, and background images with automatic blur placeholders, lazy loading, and responsive design.",

    // Features
    featuresTitle: "Features",
    feature1: "Automatic blur placeholders",
    feature2: "Lazy loading support",
    feature3: "Responsive design",
    feature4: "Multiple image types",
    feature5: "Error handling",
    feature6: "TypeScript support",
    feature7: "Performance optimized",
    feature8: "Accessibility compliant",

    // Installation
    installationTitle: "Installation",
    installationText: "Make sure to configure your",
    installationNote: "file:",

    // Usage Examples
    usageTitle: "Usage Examples",
    remoteImages: "Remote Images",
    remoteImagesDesc: "Display images from external URLs with automatic blur placeholder generation.",
    withoutBlur: "Without Blur Placeholder",
    withBlur: "With Blur Placeholder",
    localImages: "Local Images",
    localImagesDesc: "Display local images with automatic blur placeholder extraction.",
    standardDisplay: "Standard Display",
    backgroundMode: "Background Mode",
    overlayContent: "Overlay Content",
    backgroundImages: "Background Images",
    backgroundImagesDesc: "Use images as backgrounds with overlay content support.",
    heroSection: "Hero Section",
    heroSectionDesc: "Perfect for hero sections and banners",

    // API Reference
    apiTitle: "API Reference",
    baseProps: "Base Props (All Components)",
    basePropsDesc: "These props are available for all image component types.",
    remoteProps: "Remote Image Props",
    remotePropsDesc: "Additional props available when",
    backgroundProps: "Background Image Props",
    backgroundPropsDesc: "Additional props available when",

    // Table Headers
    prop: "Prop",
    type: "Type",
    default: "Default",
    required: "Required",
    description: "Description",

    // Props Descriptions
    srcDesc: "Image source URL or imported image",
    altDesc: "Alternative text for accessibility",
    typeDesc: "Type of image component to render",
    idDesc: "Unique identifier for the component",
    widthDesc: "Image width in pixels",
    heightDesc: "Image height in pixels",
    classNameDesc: "CSS classes to apply",
    styleDesc: "Inline styles to apply",
    childrenDesc: "Child elements (only for 'bg' type)",
    placeholderDesc: "Placeholder behavior while loading",
    blurDataURLDesc: "Base64 blur placeholder image",
    priorityDesc: "Load image with high priority",
    loadingDesc: "Loading behavior",
    qualityDesc: "Image quality (1-100)",
    sizesDesc: "Responsive image sizes",
    objectFitDesc: "How image should fit container",
    maintainAspectRatioDesc: "Maintain original aspect ratio",
    visibleDesc: "Control visibility",

    // Remote Props
    transitionDurationDesc: "Transition duration in milliseconds",
    fetchTimeoutDesc: "Timeout for fetching blur placeholder (ms)",
    onLoadStartDesc: "Callback when image starts loading",
    onLoadCompleteDesc: "Callback when image finishes loading",
    onErrorDesc: "Callback when image fails to load",

    // Background Props
    backgroundAttachmentDesc: "Background attachment behavior",
    backgroundSizeDesc: "Background size behavior",
    backgroundPositionDesc: "Background position",
    removeDelayDesc: "Delay before removing hidden image element (ms)",

    // Features Lists
    remoteFeatures: "Remote Image Features",
    remoteFeature1: "Automatic blur placeholder generation from remote URLs",
    remoteFeature2: "Configurable fetch timeout for placeholder generation",
    remoteFeature3: "Graceful fallback when placeholder generation fails",
    remoteFeature4: "Event callbacks for loading states",

    backgroundFeatures: "Background Image Features",
    backgroundFeature1: "Support for overlay content via children prop",
    backgroundFeature2: "Automatic aspect ratio calculation for containers",
    backgroundFeature3: "Configurable background CSS properties",
    backgroundFeature4: "Smooth transitions between placeholder and final image",

    // TypeScript
    typescriptUsage: "TypeScript Usage",
    typescriptDesc: "Import the appropriate types for better TypeScript support.",

    // Best Practices
    bestPracticesTitle: "Best Practices",
    practice1Title: "Always provide alt text",
    practice1Desc: "Essential for accessibility and SEO",
    practice2Title: "Use appropriate dimensions",
    practice2Desc: "Set width and height to prevent layout shift",
    practice3Title: "Configure domains for remote images",
    practice3Desc: "Add external domains to your Next.js config",
    practice4Title: "Use priority for above-the-fold images",
    practice4Desc: "Improves Core Web Vitals scores",
    practice5Title: "Optimize image quality",
    practice5Desc: "Balance between file size and visual quality",
    practice6Title: "Use appropriate image formats",
    practice6Desc: "WebP for modern browsers, fallback for older ones",

    // Advanced Examples
    advancedExamples: "Advanced Examples",
    responsiveImages: "Responsive Images",
    responsiveImagesDesc: "Images that adapt to different screen sizes",
    lazyLoading: "Lazy Loading",
    lazyLoadingDesc: "Load images only when they enter the viewport",
    errorHandling: "Error Handling",
    errorHandlingDesc: "Graceful handling of image loading failures",

    // Performance
    performance: "Performance Considerations",
    performanceDesc: "Tips for optimal performance",
    performanceTip1: "Use appropriate image sizes",
    performanceTip2: "Implement lazy loading for below-the-fold images",
    performanceTip3: "Use blur placeholders to improve perceived performance",
    performanceTip4: "Configure proper caching headers",

    // Footer
    footerText: "Built with Next.js, TypeScript, and Tailwind CSS",
  },
  es: {
    // Header
    title: "Componente Img",
    subtitle:
      "Un componente de imagen potente y flexible para Next.js con optimización automática y marcadores de posición difuminados",
    viewOnGithub: "Ver en GitHub",
    starOnGithub: "⭐ Danos una estrella en GitHub",

    // Navigation
    introduction: "Introducción",
    features: "Características",
    installation: "Instalación",
    usageExamples: "Ejemplos de Uso",
    apiReference: "Referencia de API",
    bestPractices: "Mejores Prácticas",

    // Introduction
    introText:
      "El componente Img es una solución versátil de imágenes que soporta imágenes locales, remotas y de fondo con marcadores de posición difuminados automáticos, carga perezosa y diseño responsivo.",

    // Features
    featuresTitle: "Características",
    feature1: "Marcadores de posición difuminados automáticos",
    feature2: "Soporte para carga perezosa",
    feature3: "Diseño responsivo",
    feature4: "Múltiples tipos de imagen",
    feature5: "Manejo de errores",
    feature6: "Soporte para TypeScript",
    feature7: "Optimizado para rendimiento",
    feature8: "Cumple con accesibilidad",

    // Installation
    installationTitle: "Instalación",
    installationText: "Asegúrate de configurar tu archivo",
    installationNote: ":",

    // Usage Examples
    usageTitle: "Ejemplos de Uso",
    remoteImages: "Imágenes Remotas",
    remoteImagesDesc:
      "Muestra imágenes desde URLs externas con generación automática de marcadores de posición difuminados.",
    withoutBlur: "Sin Marcador Difuminado",
    withBlur: "Con Marcador Difuminado",
    localImages: "Imágenes Locales",
    localImagesDesc: "Muestra imágenes locales con extracción automática de marcadores de posición difuminados.",
    standardDisplay: "Visualización Estándar",
    backgroundMode: "Modo de Fondo",
    overlayContent: "Contenido Superpuesto",
    backgroundImages: "Imágenes de Fondo",
    backgroundImagesDesc: "Usa imágenes como fondos con soporte para contenido superpuesto.",
    heroSection: "Sección Hero",
    heroSectionDesc: "Perfecto para secciones hero y banners",

    // API Reference
    apiTitle: "Referencia de API",
    baseProps: "Props Base (Todos los Componentes)",
    basePropsDesc: "Estas props están disponibles para todos los tipos de componentes de imagen.",
    remoteProps: "Props de Imagen Remota",
    remotePropsDesc: "Props adicionales disponibles cuando",
    backgroundProps: "Props de Imagen de Fondo",
    backgroundPropsDesc: "Props adicionales disponibles cuando",

    // Table Headers
    prop: "Prop",
    type: "Tipo",
    default: "Por Defecto",
    required: "Requerido",
    description: "Descripción",

    // Props Descriptions
    srcDesc: "URL de origen de la imagen o imagen importada",
    altDesc: "Texto alternativo para accesibilidad",
    typeDesc: "Tipo de componente de imagen a renderizar",
    idDesc: "Identificador único para el componente",
    widthDesc: "Ancho de la imagen en píxeles",
    heightDesc: "Alto de la imagen en píxeles",
    classNameDesc: "Clases CSS a aplicar",
    styleDesc: "Estilos en línea a aplicar",
    childrenDesc: "Elementos hijo (solo para tipo 'bg')",
    placeholderDesc: "Comportamiento del marcador durante la carga",
    blurDataURLDesc: "Imagen de marcador difuminado en Base64",
    priorityDesc: "Cargar imagen con alta prioridad",
    loadingDesc: "Comportamiento de carga",
    qualityDesc: "Calidad de imagen (1-100)",
    sizesDesc: "Tamaños de imagen responsivos",
    objectFitDesc: "Cómo debe ajustarse la imagen al contenedor",
    maintainAspectRatioDesc: "Mantener la proporción de aspecto original",
    visibleDesc: "Controlar visibilidad",

    // Remote Props
    transitionDurationDesc: "Duración de transición en milisegundos",
    fetchTimeoutDesc: "Tiempo límite para obtener marcador difuminado (ms)",
    onLoadStartDesc: "Callback cuando la imagen comienza a cargar",
    onLoadCompleteDesc: "Callback cuando la imagen termina de cargar",
    onErrorDesc: "Callback cuando la imagen falla al cargar",

    // Background Props
    backgroundAttachmentDesc: "Comportamiento de adjunto de fondo",
    backgroundSizeDesc: "Comportamiento de tamaño de fondo",
    backgroundPositionDesc: "Posición de fondo",
    removeDelayDesc: "Retraso antes de remover elemento de imagen oculta (ms)",

    // Features Lists
    remoteFeatures: "Características de Imagen Remota",
    remoteFeature1: "Generación automática de marcadores difuminados desde URLs remotas",
    remoteFeature2: "Tiempo límite configurable para generación de marcadores",
    remoteFeature3: "Respaldo elegante cuando falla la generación de marcadores",
    remoteFeature4: "Callbacks de eventos para estados de carga",

    backgroundFeatures: "Características de Imagen de Fondo",
    backgroundFeature1: "Soporte para contenido superpuesto vía prop children",
    backgroundFeature2: "Cálculo automático de proporción de aspecto para contenedores",
    backgroundFeature3: "Propiedades CSS de fondo configurables",
    backgroundFeature4: "Transiciones suaves entre marcador e imagen final",

    // TypeScript
    typescriptUsage: "Uso con TypeScript",
    typescriptDesc: "Importa los tipos apropiados para mejor soporte de TypeScript.",

    // Best Practices
    bestPracticesTitle: "Mejores Prácticas",
    practice1Title: "Siempre proporciona texto alt",
    practice1Desc: "Esencial para accesibilidad y SEO",
    practice2Title: "Usa dimensiones apropiadas",
    practice2Desc: "Establece ancho y alto para prevenir cambios de diseño",
    practice3Title: "Configura dominios para imágenes remotas",
    practice3Desc: "Agrega dominios externos a tu configuración de Next.js",
    practice4Title: "Usa prioridad para imágenes above-the-fold",
    practice4Desc: "Mejora las puntuaciones de Core Web Vitals",
    practice5Title: "Optimiza la calidad de imagen",
    practice5Desc: "Equilibra entre tamaño de archivo y calidad visual",
    practice6Title: "Usa formatos de imagen apropiados",
    practice6Desc: "WebP para navegadores modernos, respaldo para antiguos",

    // Advanced Examples
    advancedExamples: "Ejemplos Avanzados",
    responsiveImages: "Imágenes Responsivas",
    responsiveImagesDesc: "Imágenes que se adaptan a diferentes tamaños de pantalla",
    lazyLoading: "Carga Perezosa",
    lazyLoadingDesc: "Cargar imágenes solo cuando entran en el viewport",
    errorHandling: "Manejo de Errores",
    errorHandlingDesc: "Manejo elegante de fallas en la carga de imágenes",

    // Performance
    performance: "Consideraciones de Rendimiento",
    performanceDesc: "Consejos para rendimiento óptimo",
    performanceTip1: "Usa tamaños de imagen apropiados",
    performanceTip2: "Implementa carga perezosa para imágenes below-the-fold",
    performanceTip3: "Usa marcadores difuminados para mejorar el rendimiento percibido",
    performanceTip4: "Configura headers de caché apropiados",

    // Footer
    footerText: "Construido con Next.js, TypeScript y Tailwind CSS",
  },
}

export type TranslationKey = keyof typeof translations.en

export const getTranslation = (language: "en" | "es", key: TranslationKey): string => {
  return translations[language][key] || translations.en[key]
}
