export default function Tabs() {
  const { headerBg } = ATheme.useToken().token.Layout!

  return (
    <div
      className="flex h-12 w-full items-center justify-between border-b border-gray-300 !px-2 !py-1 dark:border-gray-950 sm:!px-4"
      style={{ backgroundColor: headerBg }}
    />
  )
}
