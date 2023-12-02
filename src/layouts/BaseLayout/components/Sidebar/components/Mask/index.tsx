export default function Mask() {
  const sidebarStore = useSidebarStore()
  return (
    <div
      className={clsx(
        'absolute inset-0 z-[75] bg-black opacity-40 sm:hidden',
        sidebarStore.isDisplay ? 'block' : 'hidden'
      )}
      onClick={sidebarStore.toggleDisplay}
    />
  )
}
