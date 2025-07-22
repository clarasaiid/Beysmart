import * as React from "react"
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg"

const SaveIcon = ({ width = 24, height = 24, ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip0)">
      <Path
        fill="#1F2937"
        d="M.625 1.5a1.5 1.5 0 0 1 1.5-1.5v13.794l4.066-2.903a.746.746 0 0 1 .872 0l4.062 2.903V1.5h-9V0h9a1.5 1.5 0 0 1 1.5 1.5v13.75a.75.75 0 0 1-1.184.61l-4.816-3.438-4.816 3.437a.75.75 0 0 1-1.184-.609V1.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Path fill="#fff" d="M.625 0h12v16h-12V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SaveIcon
