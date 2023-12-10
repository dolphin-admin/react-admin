import type { ReactNode } from 'react'

interface Props {
  /**
   * 右侧操作区域
   */
  renderRight?: ReactNode
}

const DpHeader = memo((props: Props) => {
  const { getTitle, hideTitle, icon } = useRouteMeta()
  const responsive = useResponsive()

  return (
    <div>
      {(!hideTitle || props.renderRight) && (
        <div
          className={clsx(
            'mb-2 flex',
            responsive.sm ? 'flex items-center justify-between space-x-2' : 'flex-col space-y-2'
          )}
        >
          <div className="flex items-center space-x-2">
            {icon && (
              <DpIcon
                type={icon}
                size={24}
              />
            )}
            <div className={clsx('text-2xl', hideTitle && 'hidden')}>{getTitle()}</div>
          </div>
          <div className="space-x-2">{props.renderRight && props.renderRight}</div>
        </div>
      )}
    </div>
  )
})
export default DpHeader
