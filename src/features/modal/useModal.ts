import { modalTitleMap } from '@/maps'

import { ModalType } from './modal-type'

export const useModal = () => {
  const [open, { toggle }] = useToggle(false)
  const [modalType, setModalType] = useState<ModalType>(ModalType.CREATE)

  const getModalTitle = () => modalTitleMap.get(modalType)!()

  return {
    open,
    modalType,
    setModalType,
    getModalTitle,
    toggle
  }
}
