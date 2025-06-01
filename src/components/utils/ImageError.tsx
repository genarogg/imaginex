import React from 'react';

interface ImageErrorProps {
    width?: number | string;
    height?: number | string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    errorMessage?: string;
    isBackground?: boolean;
}

const ImageError: React.FC<ImageErrorProps> = ({
    width,
    height,
    alt,
    className = '',
    style,
    children,
    errorMessage = 'Image failed to load',
    isBackground = false
}) => {
    const errorStyles: React.CSSProperties = {
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
        color: '#6b7280',
        fontSize: '14px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        border: '1px dashed #d1d5db',
        borderRadius: '4px',
        ...style
    };

    const backgroundErrorStyles: React.CSSProperties = {
        ...errorStyles,
        border: 'none',
        borderRadius: '0',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    const finalStyles = isBackground ? backgroundErrorStyles : errorStyles;

    return (
        <div
            className={`responsiveImage image-error ${className}`}
            style={finalStyles}
            role="img"
            aria-label={`Failed to load image: ${alt}`}
        >
            <div className="error-content" style={{
                textAlign: 'center',
                padding: '8px',
                zIndex: 1
            }}>
                {/* Error Icon */}
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: '4px', opacity: 0.7 }}
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <div>{errorMessage}</div>
            </div>
            {children}
        </div>
    );
};

export default ImageError;