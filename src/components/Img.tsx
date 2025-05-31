"use client"

import React from 'react';
import ImgRemote from './ImgRemote';
import ImgLocal from './ImgLocal';
import ImgBG from './ImgBG';
import ImgProps from './ImgProps';


const Img: React.FC<ImgProps> = ({
    src,
    alt,
    id,
    type,
    blurDataURL,
    placeholder = 'blur',
    width = 1920 / 2,
    height = 1080 / 2,
    className = "",
    priority = false,
    loading = 'lazy',
    quality = 90,
    sizes,
    style,
    children,
    visible = true
}) => {

    switch (type) {
        case 'remote':
            return (
                <ImgRemote
                    src={src}
                    alt={alt}
                    id={id}
                    width={width}
                    height={height}
                    className={className}
                    blurDataURL={blurDataURL}
                    placeholder={placeholder}
                    priority={priority}
                    loading={loading}
                    quality={quality}
                    sizes={sizes}
                    style={style}
                />
            );

        case 'local':
            return (
                <ImgLocal
                    src={src}
                    alt={alt}
                    id={id}
                    width={width}
                    height={height}
                    className={className}
                    blurDataURL={blurDataURL}
                    placeholder={placeholder}
                    priority={priority}
                    loading={loading}
                    quality={quality}
                    sizes={sizes}
                    style={style}
                    visible={visible}
                />

            );
        case 'bg':
            return (
                <ImgBG
                    src={src}
                    alt={alt}
                    id={id}
                    width={width}
                    height={height}
                    className={className}
                    blurDataURL={blurDataURL}
                    placeholder={placeholder}
                    priority={priority}
                    loading={loading}
                    quality={quality}
                    sizes={sizes}
                    style={style}
                >
                    {children}
                </ImgBG>
            )
        default:
            return <>sucedio un error en img switch</>;
    }
};

export default Img;