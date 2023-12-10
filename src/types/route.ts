import type { MenuProps } from 'antd'
import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

import type { iconSet } from '@/constants'

export type IconType = keyof typeof iconSet

export interface RouteMetadata {
  title?: string | (() => string)
  hideTitle?: boolean
  icon?: IconType
}

interface CustomIndexRouteObject extends IndexRouteObject {
  meta?: RouteMetadata
}

interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  children?: CustomRouteObject[]
  meta?: RouteMetadata
}

export type CustomRouteObject = CustomIndexRouteObject | CustomNonIndexRouteObject

export type MenuItem = Required<MenuProps>['items'][number]
