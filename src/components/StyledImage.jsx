// src/components/StyledImage.js
import React from 'react';

const StyledImage = ({ src, alt, style }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        maxWidth: '100%',
        maxHeight: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
        ...style,
      }}
    />
  );
};

export default StyledImage;
