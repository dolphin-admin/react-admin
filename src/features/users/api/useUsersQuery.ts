export const useUsersQuery = () => {
  const query = useQuery({
    queryKey: ['Users'],
    queryFn: () =>
      UserAPI.list({
        page: 1,
        pageSize: 10
      })
  })
  return query
}

export const useUsersPrefetchQuery = () => {
  const queryClient = useQueryClient()

  useEffect(() => {}, [])

  const prefetch = queryClient.prefetchQuery({
    queryKey: ['Users'],
    queryFn: () =>
      UserAPI.list({
        page: 1,
        pageSize: 10
      })
  })

  return prefetch
}
