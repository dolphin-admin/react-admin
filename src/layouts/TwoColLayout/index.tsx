interface Props {
  /**
   * 左侧内容
   */
  left?: React.ReactNode
  /**
   * 右侧内容
   */
  right?: React.ReactNode
  /**
   * 固定侧宽度
   */
  fixWidth?: string | number
  /**
   * 固定模式
   * @description 固定左侧或右侧
   */
  fixMode?: 'left' | 'right'
}

export default function TowColLayout(props: Props) {
  const { fixWidth = 400, fixMode = 'left' } = props
  return (
    <div className="flex h-[calc(100vh-170px)] space-x-4 sm:h-[calc(100vh-176px)]">
      <ACard
        hoverable
        className="!cursor-default"
        style={{ width: fixMode === 'left' ? fixWidth : '100%' }}
      >
        {props.left}
      </ACard>
      <ACard
        hoverable
        className="!cursor-default"
        style={{ width: fixMode === 'right' ? fixWidth : '100%' }}
      >
        {props.right}
      </ACard>
    </div>
  )
}
