import { type FormInstance } from 'antd'

import { ModalType } from '@/enums'
import type { DetailItems, Dictionary } from '@/types'

import { formInitialValue } from '../../constants'

interface Props {
  modalType: ModalType
  detailItems?: DetailItems
  crudForm: FormInstance<Dictionary>
  isDetailLoading: boolean
  isFormSubmitting: boolean
  handleSubmit: (values: Dictionary) => void
}

const ModalContent = memo((props: Props) => {
  const { t } = useTranslation(['DICTIONARY', 'COMMON', 'VALIDATION'])

  if (props.modalType === ModalType.DETAIL) {
    return (
      <ADescriptions
        items={props.detailItems}
        layout="horizontal"
        column={1}
        labelStyle={{ width: 100 }}
        rootClassName="!mt-4"
      />
    )
  }

  return (
    <ASkeleton loading={props.modalType === ModalType.EDIT && props.isDetailLoading}>
      <AForm
        form={props.crudForm}
        onFinish={props.handleSubmit}
        autoComplete="off"
        disabled={props.isFormSubmitting}
        labelCol={{ span: 4 }}
        rootClassName="!mt-4"
        initialValues={formInitialValue}
      >
        <AForm.Item
          name="label"
          rules={[{ required: true, message: t('VALIDATION:DICTIONARY.LABEL') }]}
          label={t('LABEL')}
        >
          <AInput
            placeholder={t('VALIDATION:DICTIONARY.LABEL')}
            allowClear
          />
        </AForm.Item>
        <AForm.Item
          name="code"
          rules={[{ required: true, message: t('VALIDATION:DICTIONARY.CODE') }]}
          label={t('CODE')}
        >
          <AInput
            placeholder={t('VALIDATION:DICTIONARY.CODE')}
            allowClear
          />
        </AForm.Item>
        <AForm.Item
          name="enabled"
          label={t('COMMON:IS.ENABLED')}
        >
          <ASwitch
            checkedChildren={t('COMMON:Y')}
            unCheckedChildren={t('COMMON:N')}
          />
        </AForm.Item>
        <AForm.Item
          name="remark"
          label={t('COMMON:REMARK')}
        >
          <AInput.TextArea
            rows={4}
            placeholder={t('VALIDATION:REMARK')}
            allowClear
          />
        </AForm.Item>
      </AForm>
    </ASkeleton>
  )
})
export default ModalContent
