import * as React from "react"
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg"

const StarIcon = ({ width = 24, height = 24, ...props }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path stroke="#E5E7EB" d="M18.875 16h-18V0h18v16Z" />
    <G clipPath="url(#clip0)">
      <Path
        fill="#1F2937"
        d="M9.872 0c.287 0 .55.163.675.422l2.143 4.416 4.788.706a.753.753 0 0 1 .419 1.275l-3.472 3.443.818 4.863a.756.756 0 0 1-.3.734.746.746 0 0 1-.79.053l-4.281-2.287-4.279 2.284a.746.746 0 0 1-.79-.053.757.757 0 0 1-.303-.734l.818-4.863-3.471-3.44a.748.748 0 0 1-.185-.766.755.755 0 0 1 .603-.51l4.788-.705L9.197.421A.75.75 0 0 1 9.872 0Zm0 2.469L8.23 5.85a.757.757 0 0 1-.566.416l-3.697.543 2.685 2.66a.752.752 0 0 1 .212.656l-.634 3.74 3.287-1.756a.744.744 0 0 1 .707 0l3.287 1.757-.631-3.738a.743.743 0 0 1 .213-.656l2.684-2.66-3.697-.546a.755.755 0 0 1-.566-.416L9.872 2.469Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Path fill="#fff" d="M.875 0h18v16h-18V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default StarIcon
