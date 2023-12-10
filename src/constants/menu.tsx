import type { MenuItem } from '@/types'

const t = i18n.getFixedT(null, 'MENU')

export const getMenuTree = (): MenuItem[] => [
  {
    label: t('SYSTEM.MANAGEMENT'),
    key: '/system',
    icon: (
      <DpIcon
        type="Settings"
        size={18}
      />
    ),
    children: [
      {
        label: t('DICTIONARY.MANAGEMENT'),
        key: '/system/dictionaries',
        icon: (
          <DpIcon
            type="Dictionary"
            size={18}
          />
        )
      }
    ]
  },
  {
    label: t('CODE.TEMPLATES'),
    key: '/code-templates',
    icon: (
      <DpIcon
        type="Code"
        size={18}
      />
    ),
    children: [
      {
        label: t('CODE.TEMPLATES.TABLE'),
        key: '/code-templates/table',
        icon: (
          <DpIcon
            type="Table"
            size={18}
          />
        )
      },
      {
        label: t('CODE.TEMPLATES.CARD'),
        key: '/code-templates/card',
        icon: (
          <DpIcon
            type="Books"
            size={18}
          />
        )
      },
      {
        label: t('CODE.TEMPLATES.TWO.COL'),
        key: '/code-templates/two-col',
        icon: (
          <DpIcon
            type="TwoCol"
            size={18}
          />
        )
      }
    ]
  },
  {
    label: t('MULTI.LEVEL.MENUS'),
    key: '/multi-level-menus',
    icon: (
      <DpIcon
        type="Menu"
        size={18}
      />
    ),
    children: [
      {
        label: '2-1',
        key: '/multi-level-menus/2-1',
        icon: (
          <DpIcon
            type="Menu"
            size={18}
          />
        ),
        children: [
          {
            label: '2-1-1',
            key: '/multi-level-menus/2-1/2-1-1',
            icon: (
              <DpIcon
                type="Menu"
                size={18}
              />
            )
          },
          {
            label: '2-1-2',
            key: '/multi-level-menus/2-1/2-1-2',
            icon: (
              <DpIcon
                type="Menu"
                size={18}
              />
            )
          }
        ]
      },
      {
        label: '2-2',
        key: '/multi-level-menus/2-2',
        icon: (
          <DpIcon
            type="Menu"
            size={18}
          />
        )
      }
    ]
  },
  {
    label: t('ERROR.PAGES'),
    key: '/error-pages',
    icon: (
      <DpIcon
        type="Error"
        size={18}
      />
    ),
    children: [
      {
        label: '403',
        key: '/error-pages/403',
        icon: (
          <DpIcon
            type="403"
            size={18}
          />
        )
      },
      {
        label: '404',
        key: '/error-pages/404',
        icon: (
          <DpIcon
            type="404"
            size={18}
          />
        )
      },
      {
        label: '418',
        key: '/error-pages/418',
        icon: (
          <DpIcon
            type="418"
            size={18}
          />
        )
      },
      {
        label: '500',
        key: '/error-pages/500',
        icon: (
          <DpIcon
            type="500"
            size={18}
          />
        )
      }
    ]
  }
]

// 菜单数据缓存
export const menuCacheMap = new Map<string, MenuItem | undefined>()

/**
 * 根据当前路由路径递归匹配菜单数据
 * @description 先从缓存中获取，如果缓存中没有，则递归匹配，匹配到后缓存结果
 */
export function getMenuItem(key: string, menuTree: MenuItem[]): MenuItem | undefined {
  // 优先从缓存中获取
  if (menuCacheMap.has(key)) {
    return menuCacheMap.get(key)
  }

  // 匹配当前菜单数据
  const menu = menuTree.find((m) => m?.key === key)
  if (menu) {
    // 缓存结果
    menuCacheMap.set(key, menu)
    return menu
  }

  // 递归匹配子路由
  // eslint-disable-next-line no-restricted-syntax
  for (const r of menuTree) {
    const { children } = (r as any) ?? {}
    if (children) {
      const menuItem = getMenuItem(key, children)
      if (menuItem) {
        // 缓存结果
        menuCacheMap.set(key, menuItem)
        return menuItem
      }
    } else {
      return undefined
    }
  }
  // 缓存结果
  menuCacheMap.set(key, undefined)
  return undefined
}
