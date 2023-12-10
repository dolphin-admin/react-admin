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
  const { t, i18n } = useTranslation()
  const response = useResponsive()
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      fixed: response.sm && 'left',
      align: 'center',
      width: 60
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
      fixed: response.sm && 'left',
      width: 200,
      render: (value) => value[i18n.language]
    },
    { title: 'Key', dataIndex: 'key', key: 'key', width: 200 },
    { title: 'Value', dataIndex: 'value', key: 'value', width: 200 },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 100,
      align: 'center',
      render: (value) => value && <DpIcon type="Check" />
    },
    {
      title: 'Built-in',
      dataIndex: 'builtIn',
      key: 'builtIn',
      width: 100,
      align: 'center',
      render: (value) => value && <DpIcon type="Check" />
    },
    { title: 'Sort', dataIndex: 'sort', key: 'sort', width: 100, align: 'center' },
    {
      title: 'Remark',
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: { showTitle: true },
      render: (value) => value[i18n.language]
    },
    {
      title: 'Action',
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
