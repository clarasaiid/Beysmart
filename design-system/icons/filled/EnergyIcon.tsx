import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const FilledEnergyIcon = ({ size = 24, color = "#1F2937", ...props }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 17.875 20"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip)">
      <Path
        fill={color}
        d="M14.023 1.743A1.25 1.25 0 0 0 12.05.309l-10 8.75c-.39.344-.53.894-.347 1.379a1.26 1.26 0 0 0 1.172.812H7.23l-3.004 7.008A1.25 1.25 0 0 0 6.2 19.692l10-8.75c.39-.344.531-.895.348-1.38a1.253 1.253 0 0 0-1.172-.808h-4.356l3.004-7.011Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path fill="#fff" d="M.375 0h17.5v20H.375V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilledEnergyIcon;
