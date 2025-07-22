import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const FilledSaveIcon = ({ width = 24, height = 24,color = "#1F2937", ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path stroke="#E5E7EB" d="M14.375 18H.875V0h13.5v18Z" />
    <G clipPath="url(#clip)">
      <Path
        fill={color}
        d="M.875 1.688v15.458a.855.855 0 0 0 1.346.7l5.404-3.784 5.403 3.783a.855.855 0 0 0 1.347-.7V1.689C14.375.755 13.619 0 12.687 0H2.563C1.63 0 .875.756.875 1.688Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path fill="#fff" d="M.875 0h13.5v18H.875V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilledSaveIcon;
