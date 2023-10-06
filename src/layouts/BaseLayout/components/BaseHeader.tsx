import BaseBreadcrumb from './BaseBreadcrumb'

export default function BaseHeader(): React.JSX.Element {
  return (
    <ALayout.Header
      style={{
        padding: 0,
        background: '#ffffff',
        height: '56px'
      }}
    >
      <BaseBreadcrumb />
    </ALayout.Header>
  )
}
