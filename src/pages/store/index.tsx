import DecrementIcon from '~icons/line-md/minus-circle'
import IncrementIcon from '~icons/line-md/plus-circle'

export function Component(): React.JSX.Element {
  const { count, increment, decrement } = useCounterStore()

  return (
    <div className="absolute inset-0 m-auto flex h-fit w-fit flex-col items-center space-y-2">
      <span className="text-2xl">Zustand</span>
      <div className="flex select-none space-x-2">
        <DecrementIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => decrement(1)}
        />
        <span>{count}</span>
        <IncrementIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => increment(1)}
        />
      </div>
    </div>
  )
}
