import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const FilledKitchenIcon = ({ size = 24, color = "#1F2937", ...props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 17.875 20"
    fill="none"
    {...props}
  >
    <Path stroke="#E5E7EB" d="M17.875 20H.375V0h17.5v20Z" />
    <G clipPath="url(#clip)">
      <Path
        fill={color}
        d="M16.625 0c-.625 0-5 1.25-5 6.875v4.375c0 1.379 1.121 2.5 2.5 2.5h1.25v5c0 .691.559 1.25 1.25 1.25s1.25-.559 1.25-1.25V1.25c0-.691-.559-1.25-1.25-1.25ZM2.875.625a.623.623 0 0 0-.559-.621.622.622 0 0 0-.675.484L.457 5.813A3.438 3.438 0 0 0 3.5 9.983v8.766c0 .691.559 1.25 1.25 1.25S6 19.441 6 18.75V9.984a3.44 3.44 0 0 0 3.043-4.171L7.859.487a.625.625 0 0 0-1.234.137v5.242a.383.383 0 0 1-.766.031L5.371.57A.622.622 0 0 0 4.75 0a.622.622 0 0 0-.621.57l-.484 5.328a.383.383 0 0 1-.766-.031V.625h-.004Zm1.887 5.938h-.024l.012-.028.012.027Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path fill="#fff" d="M.375 0h17.5v20H.375V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilledKitchenIcon;
