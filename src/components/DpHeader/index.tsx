import type { ReactNode } from 'react'

interface Props {
  /**
   * 右侧操作区域
   */
  right?: ReactNode
}

const DpHeader = memo((props: Props) => {
  const { getTitle, hideTitle } = useRouteMeta()

  return (
    <div>
      {(!hideTitle || props.right) && (
        <div className="mb-2 flex items-center justify-between space-x-2 px-2">
          <div className={clsx('text-2xl', hideTitle && 'hidden')}>{getTitle()}</div>
          <div>{props.right && props.right}</div>
        </div>
      )}
    </div>
  )
})
export default DpHeader
