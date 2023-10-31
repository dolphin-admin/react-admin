export default function Content() {
  return (
    <ALayout.Content style={{ margin: '16px' }}>
      <div
        style={{
          padding: 24,
          minHeight: 800,
          background: '#ffffff',
          position: 'relative'
        }}
      >
        <Outlet />
      </div>
    </ALayout.Content>
  )
}
