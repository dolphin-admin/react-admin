export default function BaseContent() {
  return (
    <ALayout.Content style={{ margin: '16px' }}>
      <div
        style={{
          padding: 24,
          minHeight: 800,
          position: 'relative'
        }}
      >
        <Outlet />
      </div>
    </ALayout.Content>
  )
}
