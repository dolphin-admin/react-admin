import BaseBreadcrumb from './BaseBreadcrumb'

export default function BaseHeader(): React.JSX.Element {
  return (
    <Layout.Header
      style={{
        padding: 0,
        background: '#ffffff',
        height: '56px'
      }}
    >
      <BaseBreadcrumb />
    </Layout.Header>
  )
}
