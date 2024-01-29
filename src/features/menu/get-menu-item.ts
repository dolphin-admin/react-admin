import type { MenuItem } from './types'

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
