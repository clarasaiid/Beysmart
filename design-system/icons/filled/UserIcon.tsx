import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const FilledUserIcon = ({ width = 24, height = 24, ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    {...props}
  >
    <G clipPath="url(#clip)">
      <Path
        d="M7.875 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm-1.607 1.688A6.267 6.267 0 0 0 0 16.956C0 17.532.468 18 1.044 18h13.662c.576 0 1.044-.468 1.044-1.044a6.267 6.267 0 0 0-6.268-6.268H6.268Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path fill="#fff" d="M0 0h15.75v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilledUserIcon;
