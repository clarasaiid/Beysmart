import * as React from "react"
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg"

const CalendarIcon = ({ width = 24, height = 24, ...props }) => (
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
        d="M4.875.75a.748.748 0 0 0-.75-.75.748.748 0 0 0-.75.75V2h-1.25c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2h-1.25V.75a.748.748 0 0 0-.75-.75.748.748 0 0 0-.75.75V2h-4.5V.75ZM1.625 6h11v8c0 .275-.225.5-.5.5h-10a.501.501 0 0 1-.5-.5V6Z"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Path fill="#fff" d="M.125 0h14v16h-14V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default CalendarIcon
