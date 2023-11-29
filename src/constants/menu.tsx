import type { MenuItem } from '@/types'
// import UniversalComponentsIcon from '~icons/ic/baseline-auto-awesome-mosaic'
// import ChartsIcon from '~icons/ic/baseline-bar-chart'
import UnauthorizedIcon from '~icons/ic/baseline-do-not-disturb'
import ErrorPagesIcon from '~icons/ic/baseline-error-outline'
import ListTemplatesIcon from '~icons/ic/outline-list-alt'
import MultiLevelMenusIcon from '~icons/ic/round-format-list-bulleted'
import CardTemplatesIcon from '~icons/ic/round-space-dashboard'
import IAmATeapotIcon from '~icons/icon-park-outline/tea-drink'
import InternalServerErrorIcon from '~icons/lucide/server-off'
// import UserManagementIcon from '~icons/mdi/account-cog-outline'
// import NavigationIcon from '~icons/mdi/compass-outline'
// import SystemFunctionsIcon from '~icons/mdi/function-variant'
// import DictionaryManagementIcon from '~icons/ri/booklet-line'
import CodeTemplatesIcon from '~icons/solar/code-bold'
import NotFoundIcon from '~icons/tabler/error-404'

const t = i18n.getFixedT(null, 'MENU')

export const getMenuTree = (): MenuItem[] => [
  // getItem(t('Menu.Navigation'), 'Navigation', <AIcon component={NavigationIcon} />),
  // getItem(t('Menu.SystemFunctions'), 'SystemFunctions', <AIcon component={SystemFunctionsIcon} />, [
  //   getItem(t('Menu.UserManagement'), 'UserManagement', <AIcon component={UserManagementIcon} />),
  //   getItem(
  //     t('Menu.DictionaryManagement'),
  //     'DictionaryManagement',
  //     <AIcon component={DictionaryManagementIcon} />
  //   )
  // ]),
  {
    label: t('CODE.TEMPLATES'),
    key: '/code-templates',
    icon: <AIcon component={CodeTemplatesIcon} />,
    children: [
      {
        label: t('CODE.TEMPLATES.TABLE'),
        key: '/code-templates/table',
        icon: <AIcon component={ListTemplatesIcon} />
      },
      {
        label: t('CODE.TEMPLATES.CARD'),
        key: '/code-templates/card',
        icon: <AIcon component={CardTemplatesIcon} />
      }
    ]
  },
  {
    label: t('MULTI.LEVEL.MENUS'),
    key: '/multi-level-menus',
    icon: <AIcon component={MultiLevelMenusIcon} />,
    children: [
      {
        label: '2-1',
        key: '/multi-level-menus/2-1',
        icon: <AIcon component={MultiLevelMenusIcon} />,
        children: [
          {
            label: '2-1-1',
            key: '/multi-level-menus/2-1/2-1-1',
            icon: <AIcon component={MultiLevelMenusIcon} />
          },
          {
            label: '2-1-2',
            key: '/multi-level-menus/2-1/2-1-2',
            icon: <AIcon component={MultiLevelMenusIcon} />
          }
        ]
      },
      {
        label: '2-2',
        key: '/multi-level-menus/2-2',
        icon: <AIcon component={MultiLevelMenusIcon} />
      }
    ]
  },
  {
    label: t('ERROR.PAGES'),
    key: '/error-pages',
    icon: <AIcon component={ErrorPagesIcon} />,
    children: [
      {
        label: '403',
        key: '/error-pages/403',
        icon: <AIcon component={UnauthorizedIcon} />
      },
      {
        label: '404',
        key: '/error-pages/404',
        icon: <AIcon component={NotFoundIcon} />
      },
      {
        label: '418',
        key: '/error-pages/418',
        icon: <AIcon component={IAmATeapotIcon} />
      },
      {
        label: '500',
        key: '/error-pages/500',
        icon: <AIcon component={InternalServerErrorIcon} />
      }
    ]
  }
  // getItem(
  //   t('Menu.UniversalComponents'),
  //   'UniversalComponents',
  //   <AIcon component={UniversalComponentsIcon} />,
  //   [getItem(t('Menu.Charts'), 'Charts', <AIcon component={ChartsIcon} />)]
  // ),
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
