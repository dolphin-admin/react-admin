import type { BreadcrumbItemType, ItemType } from 'antd/es/breadcrumb/Breadcrumb'

import { getMenuItem, getMenuTree, menuCacheMap } from '@/constants'

export default function BaseBreadcrumb() {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const [breadcrumbItems, setBreadcrumbItems] = useImmer<ItemType[]>([])

  useEffect(() => menuCacheMap.clear(), [i18n.language])

  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i)
    const items: BreadcrumbItemType[] = []
    const menuTree = getMenuTree()
    pathSnippets.reduce((acc, cur) => {
      const key = `${acc}/${cur}`
      const menuItem = getMenuItem(key, menuTree)
      const siblingMenuList = !acc ? menuTree : (getMenuItem(acc, menuTree) as any)?.children
      if (menuItem) {
        const { label } = menuItem as any
        items.push({
          key: acc,
          title: label,
          dropdownProps: {
            arrow: {
              pointAtCenter: true
            }
          },
          ...(Array.isArray(siblingMenuList) &&
            siblingMenuList.length > 1 && {
              menu: {
                items: siblingMenuList.map((item: any) => ({
                  key: item.key,
                  label: item.label,
                  children: item.children
                })),
                onClick: ({ key: menuKey }) => navigate(menuKey)
              }
            })
        })
      }
      return key
    }, '')
    setBreadcrumbItems(items)
  }, [location.pathname, i18n.language, setBreadcrumbItems, navigate])

  return (
    <ABreadcrumb
      style={{ margin: '16px 0', cursor: 'pointer' }}
      className="hidden sm:block"
      items={breadcrumbItems}
      separator={<div className="px-0.5">/</div>}
    />
  )
}
