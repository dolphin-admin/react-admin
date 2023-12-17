import type { ColumnsType } from 'antd/es/table'

import type { Dictionary } from '@/types'

import type { EnableMutationParams } from '../types'

interface Props {
  toggleEnabled: (params: EnableMutationParams) => void
  handleDelete: (id: number) => void
  toggleEditModal: (id: number) => void
  toggleDetailModal: (id: number) => void
  isDeleteLoading: boolean
  isPatchLoading: boolean
}

export const useColumns = (props: Props): ColumnsType<Dictionary> => {
  const { t } = useTranslation(['COMMON', 'DICTIONARY'])
  const response = useResponsive()
  const { getTableField, getTableFields } = useTableFields<Dictionary>()
  return [
    getTableField('id'),
    {
      title: t('DICTIONARY:LABEL'),
      dataIndex: 'label',
      key: 'label',
      fixed: response.sm && 'left',
      width: 150,
      render: DpTableFiled.I18nString
    },
    {
      title: t('DICTIONARY:CODE'),
      dataIndex: 'code',
      key: 'code',
      width: 150,
      align: 'center',
      render: DpTableFiled.CopyableTagString
    },
    ...getTableFields('enabled', 'remark', 'createdAt'),
    {
      title: t('ACTIONS'),
      align: 'center',
      fixed: response.sm && 'right',
      width: 250,
      render: (_, record) => (
        <ASpace>
          <AButton
            size="small"
            onClick={() => props.toggleDetailModal(record.id)}
          >
            {t('VIEW')}
          </AButton>
          <AButton
            size="small"
            onClick={() => props.toggleEditModal(record.id)}
          >
            {t('EDIT')}
          </AButton>
          <APopconfirm
            title={record.enabled ? t('ENABLE') : t('DISABLE')}
            description={t('OPERATION.CONFIRMATION')}
            okText={t('CONFIRM')}
            cancelText={t('CANCEL')}
            okButtonProps={{ loading: props.isPatchLoading }}
            onConfirm={() => props.toggleEnabled({ ...record })}
          >
            <AButton
              size="small"
              danger={!record.enabled}
            >
              {record.enabled ? t('ENABLE') : t('DISABLE')}
            </AButton>
          </APopconfirm>
          <APopconfirm
            title={t('DELETE')}
            description={t('OPERATION.CONFIRMATION')}
            okText={t('CONFIRM')}
            cancelText={t('CANCEL')}
            okButtonProps={{ loading: props.isDeleteLoading }}
            onConfirm={() => props.handleDelete(record.id)}
          >
            <AButton
              danger
              size="small"
            >
              {t('DELETE')}
            </AButton>
          </APopconfirm>
        </ASpace>
      )
    }
  ]
}
