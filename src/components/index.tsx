"use client"

import React from 'react';
import ImgRemote from './imgs/ImgRemote';
import ImgLocal from './imgs/ImgLocal';
import ImgBG from './imgs/ImgBG';
import ImgProps from './utils/ImgProps';

// Default props configuration
const DEFAULT_PROPS = {
  // Image behavior
  placeholder: 'blur' as const,
  priority: false,
  loading: 'lazy' as const,
  quality: 90,
  visible: true,
  
  // Display dimensions
  width: 960,
  height: 540,
  
  // Layout control
  objectFit: 'cover' as const,
  maintainAspectRatio: true,
  
  // Styling
  className: "",
} as const;

const Img: React.FC<ImgProps> = (props) => {
  const {
    type = 'local', // Default to 'local' if not specified
    children,
    ...userProps
  } = props;

  // Merge user props with defaults
  const finalProps = {
    ...DEFAULT_PROPS,
    ...userProps
  };

  // Component mapping
  const componentMap = {
    remote: ImgRemote,
    local: ImgLocal,
    bg: ImgBG
  } as const;

  // Validation
  if (!(type in componentMap)) {
    console.error(`Invalid image type: ${type}. Expected: 'remote', 'local', or 'bg'`);
    return null;
  }

  const Component = componentMap[type];

  // Background images can have children, others cannot
  return type === 'bg' ? (
    <Component {...finalProps}>
      {children}
    </Component>
  ) : (
    <Component {...finalProps} />
  );
};

export default Img;