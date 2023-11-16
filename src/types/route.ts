import type { IndexRouteObject, NonIndexRouteObject } from 'react-router-dom'

interface CustomIndexRouteObject extends IndexRouteObject {
  meta?: {
    title?: string
  }
}

interface CustomNonIndexRouteObject extends NonIndexRouteObject {
  children?: CustomRouteObject[]
  meta?: {
    title?: string
  }
}

export type CustomRouteObject = CustomIndexRouteObject | CustomNonIndexRouteObject
