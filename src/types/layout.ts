import type { ModalProps } from 'antd'

export interface RenderModal extends ModalProps {
  renderContent?: React.ReactNode
}
