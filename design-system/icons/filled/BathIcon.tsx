import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const FilledBathIcon = ({ width = 24, height = 24,color = "#1F2937", ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path stroke="#E5E7EB" d="M20.625 20h-20V0h20v20Z" />
    <G clipPath="url(#clip)">
      <Path
        fill={color}
        d="M4.375 3.02a.52.52 0 0 1 .887-.368l.582.582a3.104 3.104 0 0 0 .531 3.172.943.943 0 0 0 .148 1.133.934.934 0 0 0 1.325 0l4.066-4.062a.937.937 0 0 0-1.133-1.473A3.087 3.087 0 0 0 8.75 1.25c-.402 0-.79.078-1.14.215L7.026.883A3.02 3.02 0 0 0 1.875 3.02V10c-.691 0-1.25.559-1.25 1.25s.559 1.25 1.25 1.25h17.5c.691 0 1.25-.559 1.25-1.25S20.066 10 19.375 10h-15V3.02Zm-2.5 10.73v.625c0 1.11.484 2.11 1.25 2.797v1.578c0 .691.559 1.25 1.25 1.25s1.25-.559 1.25-1.25v-.625h10v.625c0 .691.559 1.25 1.25 1.25s1.25-.559 1.25-1.25v-1.578a3.747 3.747 0 0 0 1.25-2.797v-.625h-17.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path fill="#fff" d="M.625 0h20v20h-20V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilledBathIcon;
