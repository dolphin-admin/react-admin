import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

export interface RouteMetadata {
  title?: string | (() => string)
}

interface CustomIndexRouteObject extends IndexRouteObject {
  meta?: RouteMetadata
}

interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  children?: CustomRouteObject[]
  meta?: RouteMetadata
}

export type CustomRouteObject = CustomIndexRouteObject | CustomNonIndexRouteObject
