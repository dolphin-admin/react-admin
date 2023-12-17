import type { IconComponentProps } from '@ant-design/icons/lib/components/Icon'

import { iconSet } from '@/constants'
import { type IconType } from '@/types'

type Props = IconComponentProps &
  React.RefAttributes<HTMLSpanElement> & {
    type: IconType
    style?: React.CSSProperties
    color?: string
    size?: number
    depth?: number
  }

const getOpacityByDepth = (depth: number) => {
  switch (depth) {
    case 1:
      return 0.82
    case 2:
      return 0.72
    case 3:
      return 0.38
    case 4:
      return 0.24
    case 5:
      return 0.18
    default:
      return 1
  }
}

const DpIcon = memo((props: Props) => {
  const { type, style, color, size, depth, ...rest } = props
  const IconComponent = iconSet[type]

  if (!IconComponent) {
    return null
  }

  return (
    <AIcon
      {...rest}
      component={IconComponent}
      style={{
        fontSize: size,
        color,
        opacity: getOpacityByDepth(depth ?? 0),
        ...style
      }}
    />
  )
})
export default DpIcon
