import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const FilledCalendarIcon = ({ size = 24, color = "#1F2937", ...props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 16 18"
    fill="none"
    {...props}
  >
    <Path stroke="#E5E7EB" d="M16 18H.25V0H16v18Z" />
    <G clipPath="url(#clip)">
      <Path
        fill={color}
        d="M3.625 1.125V2.25H1.937C1.006 2.25.25 3.006.25 3.938v1.687H16V3.937c0-.931-.756-1.687-1.688-1.687h-1.687V1.125a1.124 1.124 0 1 0-2.25 0V2.25h-4.5V1.125a1.124 1.124 0 1 0-2.25 0ZM16 6.75H.25v9.563c0 .931.756 1.687 1.688 1.687h12.374c.932 0 1.688-.756 1.688-1.688V6.75Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path fill="#fff" d="M.25 0H16v18H.25V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilledCalendarIcon;
