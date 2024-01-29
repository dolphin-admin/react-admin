export function Component() {
  const [searchText, setSearchText] = useState('')

  return (
    <DpTableLayout
      renderHeader={
        <DpTableSearch
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={() => {}}
        />
      }
    />
  )
}
