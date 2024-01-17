import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

import type { IconType } from '../icon'

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
