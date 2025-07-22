import * as React from "react";
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg";

const FilledBedroomIcon = ({ size = 24, color = "#1F2937", ...props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 25.375 20"
    fill="none"
    {...props}
  >
    <Path stroke="#E5E7EB" d="M25.375 20h-25V0h25v20Z" />
    <G clipPath="url(#clip)">
      <Path
        fill={color}
        d="M1.625 1.25c.691 0 1.25.559 1.25 1.25v10h8.75V6.25c0-.691.559-1.25 1.25-1.25h8.75c2.07 0 3.75 1.68 3.75 3.75v8.75c0 .691-.559 1.25-1.25 1.25s-1.25-.559-1.25-1.25v-1.25h-20v1.25c0 .691-.559 1.25-1.25 1.25s-1.25-.559-1.25-1.25v-15c0-.691.559-1.25 1.25-1.25ZM7.25 5a3.125 3.125 0 1 1 0 6.25 3.125 3.125 0 0 1 0-6.25Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path fill="#fff" d="M.375 0h25v20h-25V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilledBedroomIcon;
