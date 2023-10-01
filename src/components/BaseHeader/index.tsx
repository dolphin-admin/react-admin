interface NavItem {
  label: string
  path: string
  outer?: boolean
}

export default function BaseHeader(): React.JSX.Element {
  const navigate = useNavigate()
  const [navList] = useState<NavItem[]>([
    {
      label: 'Home',
      path: '/'
    },
    {
      label: 'Store',
      path: '/store'
    },
    {
      label: 'React Query',
      path: '/react-query'
    },
    {
      label: 'Author GitHub',
      path: 'https://github.com/recallwei',
      outer: true
    }
  ])

  return (
    <ul className="flex items-center justify-center space-x-8 rounded-lg border border-solid border-gray-200 py-2.5 text-center shadow-lg dark:border-[#2f2f2f]">
      {navList.map((navItem, index) => (
        <li
          className="cursor-pointer select-none rounded-md px-2 py-1 transition-all hover:-translate-y-0.5 hover:bg-gray-200 hover:opacity-90 active:translate-y-0 active:opacity-75 dark:hover:bg-gray-500"
          key={index}
          onClick={() => {
            if (navItem.outer) {
              BrowserUtils.openNewWindow(navItem.path)
            } else {
              navigate(navItem.path)
            }
          }}
        >
          {navItem.label}
        </li>
      ))}
    </ul>
  )
}
