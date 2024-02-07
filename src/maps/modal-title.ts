import { ModalType } from '@/features/modal'

const t = i18n.getFixedT(null, 'COMMON')

export const modalTitleMap = new Map<ModalType, () => string>([
  [ModalType.CREATE, () => t('CREATE')],
  [ModalType.EDIT, () => t('EDIT')],
  [ModalType.DETAIL, () => t('DETAIL')]
])
