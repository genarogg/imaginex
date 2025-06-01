// Base props shared by all image components
interface BaseImgProps {
    // Required props
    src: string | any;
    alt: string;

    // Component identification
    id?: string;
    type?: 'remote' | 'local' | 'bg';

    // Display dimensions
    width?: number | string | any;
    height?: number | string | any;

    // Styling
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;

    // Image behavior
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    priority?: boolean;
    loading?: 'eager' | 'lazy';
    quality?: number;
    sizes?: string;

    // Layout control
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    maintainAspectRatio?: boolean;
    visible?: boolean;
}

// Extended props for remote images
interface ImgRemoteProps extends BaseImgProps {
    transitionDuration?: number;
    fetchTimeout?: number;
    onLoadStart?: () => void;
    onLoadComplete?: () => void;
    onError?: (error: Error) => void;
}

// Extended props for background images
interface ImgBGProps extends BaseImgProps {
    backgroundAttachment?: 'fixed' | 'scroll' | 'local';
    backgroundSize?: 'cover' | 'contain' | 'auto' | string;
    backgroundPosition?: string;
    transitionDuration?: number;
    removeDelay?: number;
}

// Main props interface (backward compatibility)
interface ImgProps extends BaseImgProps { }

export default ImgProps;
export type { BaseImgProps, ImgRemoteProps, ImgBGProps };