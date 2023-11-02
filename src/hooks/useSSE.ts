interface Options {
  url?: string
  params?: Record<string, any>
  autoStart?: boolean
}

export const useSSE = (options?: Options) => {
  const eventSource = useRef<EventSource | null>(null)

  const url = useRef<string>(options?.url ?? '')

  const params = useRef<Record<string, any>>(options?.params ?? {})

  // 关闭连接
  const close = () => {
    if (eventSource.current) {
      eventSource.current.close()
      console.log('已断开连接')
      eventSource.current = null
    } else {
      console.log('当前无连接')
    }
  }

  // 获取完整的 URL
  const getURL = () =>
    `${import.meta.env.VITE_BASE_API_URL}/sse/${url.current}?${Object.keys(
      params.current
    )
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            String(params.current[key])
          )}`
      )
      .join('&')}`

  // 建立连接
  const create = () => {
    if (!eventSource.current) {
      const eventSourceInstance = new EventSource(getURL())

      eventSourceInstance.addEventListener('error', (e) => {
        console.log(e)
        close()
      })
      eventSource.current = eventSourceInstance
      console.log('已建立连接，准备接受服务端数据...')
    } else {
      console.log('建立新连接前请断开当前连接')
    }
  }

  // 监听页面可见性变化
  const onVisibilityChange = () =>
    document.visibilityState === 'hidden' ? close() : create()

  useEffect(() => {
    if (options?.autoStart) {
      create()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () =>
      window.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return {
    eventSource,
    url,
    params,
    create,
    close
  }
}
