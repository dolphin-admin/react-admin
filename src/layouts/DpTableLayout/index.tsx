interface Props {
  /**
   * 顶部操作区域
   */
  operate?: React.ReactNode
  /**
   * 头部区域
   */
  header?: React.ReactNode
  /**
   * 表格区域
   */
  table?: React.ReactNode
}

export default function DpTableLayout(props: Props) {
  return (
    <>
      <DpHeader right={props.operate} />
      <ACard
        hoverable
        rootClassName="!cursor-default min-h-[calc(100vh-210px)] sm:min-h-[calc(100vh-216px)]"
      >
        {props.header ? <ACard rootClassName="!mb-2">{props.header}</ACard> : null}
        <div>{props.table}</div>
      </ACard>
    </>
  )
}
