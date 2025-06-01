"use client"

import React from 'react';
import ImgRemote from './ImgRemote';
import ImgLocal from './ImgLocal';
import ImgBG from './ImgBG';
import ImgProps from './ImgProps';

const Img: React.FC<ImgProps> = (props) => {
    const {
        type,
        children,
        ...commonProps
    } = props;

    // Props por defecto centralizados
    const defaultProps = {
        placeholder: 'blur' as const,
        width: 960,
        height: 540,
        className: "",
        priority: false,
        loading: 'lazy' as const,
        quality: 90,
        visible: true,
        ...commonProps
    };

    const componentMap = {
        remote: ImgRemote,
        local: ImgLocal,
        bg: ImgBG
    } as const;

    if (!type || !(type in componentMap)) {
        console.error(`Tipo de imagen no válido: ${type}`);
        return null;
    }

    const Component = componentMap[type];

    return type === 'bg' ? (
        <Component {...defaultProps}>
            {children}
        </Component>
    ) : (
        <Component {...defaultProps} />
    );
};

export default Img;