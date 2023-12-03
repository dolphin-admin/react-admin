export default function DpAuthLayout() {
  const { isLoading } = useAuthGuard({ skipAuth: true })

  // 加载用户数据、背景图片时，显示全局 Loading 动画
  if (isLoading) {
    return <DpGlobalLoading />
  }

  return (
    <main className="flex h-screen w-screen bg-[#f1f1f1] bg-cover bg-no-repeat dark:bg-[#444444]">
      <div>
        <Outlet />
      </div>
    </main>
  )
}
