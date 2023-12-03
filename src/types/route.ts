import type { MenuProps } from 'antd'
import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

export interface RouteMetadata {
  title?: string | (() => string)
  hideTitle?: boolean
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
