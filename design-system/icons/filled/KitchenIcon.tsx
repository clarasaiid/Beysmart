import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const FilledKitchenIcon = ({ width = 24, height = 24, color = "#1F2937", ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip)">
      <Path
        fill={color}
        d="M17.875 0H2.125C1.5 0 1 .5 1 1.125v17.75C1 19.5 1.5 20 2.125 20h15.75c.625 0 1.125-.5 1.125-1.125V1.125C19 .5 18.5 0 17.875 0ZM6.25 16.25h-2.5v-2.5h2.5v2.5Zm0-5h-2.5v-2.5h2.5v2.5Zm0-5h-2.5v-2.5h2.5v2.5Zm5 10h-2.5v-2.5h2.5v2.5Zm0-5h-2.5v-2.5h2.5v2.5Zm0-5h-2.5v-2.5h2.5v2.5Zm5 10h-2.5v-2.5h2.5v2.5Zm0-5h-2.5v-2.5h2.5v2.5Zm0-5h-2.5v-2.5h2.5v2.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path fill="#fff" d="M.375 0h19.5v20H.375V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilledKitchenIcon;
