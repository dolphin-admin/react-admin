import { Button } from 'antd'

export function Component(): React.JSX.Element {
  const queryClient = useQueryClient()

  const {
    data: queryResult,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ['users'],
    queryFn: () =>
      UserAPI.getUsers({
        page: 1,
        pageSize: 10
      }),
    staleTime: Infinity
  })

  if (isError) {
    return <span>Error: {(error as Error).message}</span>
  }

  const handleClearCache = () => {
    queryClient.invalidateQueries(['users']).catch(() => {})
  }

  return (
    <div className="absolute inset-0 m-auto flex h-fit w-fit flex-col items-center space-y-2">
      <span className="text-2xl">React Query</span>
      {isLoading ? (
        <span>Loading data...</span>
      ) : (
        <ul className="!my-4 space-y-2">
          {queryResult?.data.map((user, index) => (
            <li
              key={index}
              className="flex items-center space-x-2"
            >
              <img
                src={user.avatarUrl}
                alt=""
              />
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      )}
      <Button onClick={handleClearCache}>Clear Cache</Button>
    </div>
  )
}
