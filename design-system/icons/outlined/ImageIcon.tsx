import React from 'react';
import { Path, Svg } from 'react-native-svg';

interface ImageIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ImageIcon: React.FC<ImageIconProps> = ({ width = 24, height = 24, color = '#000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z"
        fill={color}
      />
    </Svg>
  );
};

export default ImageIcon;
