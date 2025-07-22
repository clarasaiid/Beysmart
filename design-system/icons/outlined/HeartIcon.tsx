import * as React from "react"
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg"

const HeartIcon = ({ width = 24, height = 24, ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path stroke="#E5E7EB" d="M16.625 16h-16V0h16v16Z" />
    <G clipPath="url(#clip0)">
      <Path
        fill="#1F2937"
        d="m7.681 14.631-.078-.072-5.475-5.084a4.706 4.706 0 0 1-1.503-3.45v-.103a4.58 4.58 0 0 1 8-3.05c.131-.15.272-.288.422-.416A4.583 4.583 0 0 1 12.9 1.418a4.584 4.584 0 0 1 3.725 4.504v.103c0 1.31-.544 2.56-1.503 3.45l-5.475 5.084-.078.072a1.391 1.391 0 0 1-.944.372c-.35 0-.688-.131-.944-.372Zm.416-10.1a.164.164 0 0 1-.031-.034l-.557-.625-.003-.004a3.08 3.08 0 0 0-5.381 2.053v.104c0 .89.372 1.743 1.025 2.35l5.475 5.084L14.1 8.375a3.21 3.21 0 0 0 1.025-2.35v-.103a3.081 3.081 0 0 0-5.378-2.053l-.003.003-.003.003-.557.625c-.009.012-.021.022-.03.034a.748.748 0 0 1-1.057 0v-.003Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Path fill="#fff" d="M.625 0h16v16h-16V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default HeartIcon
