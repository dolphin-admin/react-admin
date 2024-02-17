import { getMenuTree } from '@/constants'
import type { MenuItem } from '@/features/menu'

export default function Menu() {
  const { siderBg } = ATheme.useToken().token.Layout!
  const navigate = useNavigate()
  const location = useLocation()

  // 选中项
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  // 展开项
  const [openKeys, setOpenKeys] = useState<string[]>([])

  // 根据路由地址，设置菜单的选中项和展开项
  useEffect(() => {
    setSelectedKeys([location.pathname])
    setOpenKeys((value) =>
      location.pathname
        .split('/')
        .filter((i) => i)
        .reduce<string[]>((acc, cur) => {
          const key = `${acc}/${cur}`
          return [...acc, key]
        }, [])
        .concat(value)
    )
  }, [location.pathname])

  // 点击菜单项，跳转到对应的路由
  const handleClickMenuItem = (menuInfo: MenuItem) => {
    if (menuInfo?.key && typeof menuInfo.key === 'string') {
      navigate(menuInfo.key)
    }
  }

  return (
    <AMenu
      className="h-[calc(100%-96px)] !border-0"
      style={{ backgroundColor: siderBg }}
      items={getMenuTree()}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={setOpenKeys}
      mode="inline"
      onClick={handleClickMenuItem}
    />
  )
}
