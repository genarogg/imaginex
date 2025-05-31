interface ImgProps {
    type?: 'remote' | 'local' | 'bg';
    src: string | any;
    alt: string;
    id?: string;
    blurDataURL?: string;
    placeholder?: 'blur' | 'empty';
    width?: number | string | any;
    height?: number | string | any;
    className?: string;
    priority?: boolean;
    loading?: 'eager' | 'lazy';
    quality?: number;
    sizes?: string;
    style?: any;
    children?: React.ReactNode;
    visible?: boolean;

    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    maintainAspectRatio?: boolean;
}

export default ImgProps;