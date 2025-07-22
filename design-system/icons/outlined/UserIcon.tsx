import * as React from "react"
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg"

const UserIcon = ({ width = 24, height = 24, ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path stroke="#E5E7EB" d="M14.875 16h-14V0h14v16Z" />
    <G clipPath="url(#clip0)">
      <Path
        fill="#1F2937"
        d="M10.375 4a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Zm-6.5 0a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm-1.46 10.5h10.92A4.073 4.073 0 0 0 9.302 11H6.447a4.073 4.073 0 0 0-4.031 3.5Zm-1.54.572A5.57 5.57 0 0 1 6.447 9.5h2.856a5.57 5.57 0 0 1 5.572 5.572.928.928 0 0 1-.928.928H1.803a.928.928 0 0 1-.928-.928Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Path fill="#fff" d="M.875 0h14v16h-14V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default UserIcon
