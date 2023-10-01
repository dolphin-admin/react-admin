export default function BaseLayout(): React.JSX.Element {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-x-20 top-6 m-auto h-fit">
        <BaseHeader />
      </div>
      <Outlet />
    </div>
  )
}
