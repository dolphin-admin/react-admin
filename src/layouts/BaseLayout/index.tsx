export default function BaseLayout() {
  const { isLoading } = useAuthGuard()

  if (isLoading) {
    return <DpGlobalLoading />
  }

  return (
    <ALayout className="flex-row">
      <BaseSidebar />
      <ALayout className="border-r border-gray-300 dark:border-gray-950">
        <BaseHeader />
        <BaseContent />
        <BaseFooter />
      </ALayout>
    </ALayout>
  )
}
