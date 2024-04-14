import type { RenderModal } from '@/features/layout'

interface Props {
  /**
   * 顶部操作区域
   */
  renderOperate?: React.ReactNode
  /**
   * 头部区域
   */
  renderHeader?: React.ReactNode
  /**
   * 表格区域
   */
  renderTable?: React.ReactNode
  /**
   * 模态框区域
   */
  renderModal?: RenderModal
}

export default function DpTableLayout(props: Props) {
  const { renderOperate, renderHeader, renderTable, renderModal } = props
  const { renderContent, ...modalProps } = renderModal ?? {}
  const { t } = useTranslation()

  return (
    <>
      <DpHeader renderRight={renderOperate} />
      <ACard
        hoverable
        rootClassName="!cursor-default min-h-[calc(100vh-210px)] sm:min-h-[calc(100vh-216px)]"
      >
        {renderHeader && <ACard rootClassName="!mb-2">{renderHeader}</ACard>}
        <div>{renderTable}</div>
      </ACard>
      {renderModal && (
        <AModal
          okText={t('CONFIRM')}
          cancelText={t('CANCEL')}
          {...modalProps}
        >
          {renderContent}
        </AModal>
      )}
    </>
  )
}
