import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

const FilledBathIcon = ({ width = 24, height = 24, color = "#1F2937", ...props }) => (
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
        d="M18.625 0H1.375C.755 0 0 .756 0 1.688v16.625C0 19.244.755 20 1.375 20h17.25c.62 0 1.375-.756 1.375-1.688V1.688C20 .756 19.245 0 18.625 0ZM6.25 15h-2.5v-2.5h2.5V15Zm0-5h-2.5v-2.5h2.5v2.5Zm5 5h-2.5v-2.5h2.5V15Zm0-5h-2.5v-2.5h2.5v2.5Zm5 5h-2.5v-2.5h2.5V15Zm0-5h-2.5v-2.5h2.5v2.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path fill="#fff" d="M0 0h20v20H0V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FilledBathIcon;
