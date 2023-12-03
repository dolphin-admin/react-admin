import type { ChangeEvent } from 'react'

import LoadingIcon from '~icons/line-md/loading-twotone-loop'
import RefreshIcon from '~icons/mdi/refresh'

interface Props {
  searchText?: string
  setSearchText?: (value: string) => void
  loading?: boolean
  handleSearch?: () => void
}

const DpTableSearch = memo((props: Props) => {
  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.setSearchText) {
      props.setSearchText(e.target.value)
    }
  }

  const handleSearch = () => {
    if (props.handleSearch) {
      props.handleSearch()
    }
  }
  return (
    <AFlex
      justify="space-between"
      align="center"
    >
      <ASpace>
        <AInput.Search
          value={props.searchText}
          onChange={handleSearchTextChange}
          loading={props.loading}
          onSearch={handleSearch}
          allowClear
          placeholder="请输入关键字"
        />
      </ASpace>
      <AButton
        className="!flex items-center justify-center"
        shape="circle"
        icon={<AIcon component={props.loading ? LoadingIcon : RefreshIcon} />}
        onClick={handleSearch}
      />
    </AFlex>
  )
})
export default DpTableSearch
