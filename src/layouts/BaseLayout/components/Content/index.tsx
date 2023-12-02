export default function Content() {
  return (
    <ALayout.Content className="relative h-[calc(100vh-96px)] overflow-y-scroll p-2 sm:p-4">
      <Outlet />
    </ALayout.Content>
  )
}
