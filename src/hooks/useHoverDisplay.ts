export const useHoverDisplay = <T = any>(defaultValue: boolean = false) => {
  const [isHovering, setIsHovering] = useState(defaultValue)
  const [hoverItem, setHoverItem] = useState<T | null>(null)
  return {
    isHovering,
    setIsHovering,
    hoverItem,
    setHoverItem,
    onMouseEnter: (data?: T) => {
      setHoverItem(data ?? null)
      setIsHovering(true)
    },
    onMouseLeave: () => {
      setHoverItem(null)
      setIsHovering(false)
    },
    onMouseOver: (data?: T) => {
      setHoverItem(data ?? null)
      setIsHovering(true)
    },
    onMouseOut: () => {
      setHoverItem(null)
      setIsHovering(false)
    }
  }
}
