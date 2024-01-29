import { ModalType } from '@/enums'
import { modalTitleMap } from '@/maps'

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
