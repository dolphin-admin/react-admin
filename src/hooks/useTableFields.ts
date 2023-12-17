import type { ColumnsType, ColumnType } from 'antd/es/table'

export const useTableFields = <T>() => {
  const response = useResponsive()
  const { t } = useTranslation()

  const baseTableFields = {
    id: {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      fixed: response.sm && 'left',
      align: 'center',
      width: 100
    },
    enabled: {
      title: t('IS.ENABLED'),
      dataIndex: 'enabled',
      key: 'enabled',
      width: 100,
      align: 'center',
      render: DpTableFiled.Boolean
    },
    remark: {
      title: t('REMARK'),
      dataIndex: 'remark',
      key: 'remark',
      ellipsis: { showTitle: true },
      render: DpTableFiled.I18nString
    },
    createdAt: {
      title: t('CREATED.AT'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      align: 'center',
      render: DpTableFiled.DateString
    }
  }

  const getTableField = (key: keyof typeof baseTableFields): ColumnType<T> =>
    baseTableFields[key] as ColumnType<T>

  const getTableFields = (...keys: (keyof typeof baseTableFields)[]): ColumnsType<T> =>
    keys.map((key) => baseTableFields[key]) as ColumnsType<T>

  return {
    getTableField,
    getTableFields
  }
}
