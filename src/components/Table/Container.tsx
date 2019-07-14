import _ from 'lodash'
import React, { useContext, useState } from 'react'
import { Card } from 'semantic-ui-react'
import { CrudoneContext } from '../../contexts/CrudoneContext'
import { TableContext } from '../../contexts/TableContext'
import { ITableContext } from '../../types'

interface IProps {
  data: any[]
  loading?: boolean
}

export const Container: React.FC<IProps> = props => {
  const context = useContext(CrudoneContext)
  const [activePage, setActivePage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [searchKey, setSearchKey] = useState(context.getTableFields()[0].name)
  const [sortKey, setSortKey] = useState(context.getTableFields()[0].name)
  const [isDescending, setIsDescending] = useState(false)

  function changeSearchValue(value: string) {
    setSearchValue(value)
    setActivePage(1)
  }

  function changeSearchKey(key: string) {
    setSearchKey(key)
    setActivePage(1)
  }

  function changeLimit(limit: number) {
    setItemPerPage(limit)
    setActivePage(1)
  }

  function changeSort(fieldName: string) {
    setSortKey(fieldName)
    setIsDescending(!isDescending)
    setActivePage(1)
  }

  function changePage(page: number) {
    setActivePage(page)
  }

  function getSearchedData() {
    return props.data.filter(rowData => {
      const cellData = rowData[searchKey]
      const cellText = getCellText(cellData).toLowerCase()
      return cellText.search(searchValue.toLowerCase()) > -1
    })
  }

  function getSortedData() {
    const sortedData = _.sortBy(getSearchedData(), sortKey)
    return isDescending ? sortedData.reverse() : sortedData
  }

  function getOffset() {
    return (activePage - 1) * itemPerPage
  }

  function getPaginatedData() {
    const offset = getOffset()
    const end = offset + itemPerPage
    return getSortedData().slice(offset, end)
  }

  function getFieldBySearchKey() {
    return context.getTableFields().find(field => field.name === searchKey)
  }

  function getCellText(cellData: any) {
    const field = getFieldBySearchKey()
    if (field!.type === 'option') {
      return String(cellData[field!.optionData!.textKey])
    } else if (field!.type === 'date') {
      return new Date(cellData).toLocaleDateString('id')
    } else {
      return String(cellData)
    }
  }

  const providerValue: ITableContext = {
    loading: props.loading,
    searchValue,
    changeSearchValue,
    searchKey,
    changeSearchKey,
    sortKey,
    isDescending,
    changeSort,
    getPaginatedData,
    getOffset,
    getSearchedData,
    itemPerPage,
    changeLimit,
    activePage,
    changePage
  }

  return (
    <TableContext.Provider value={providerValue}>
      <Card fluid>
        <Card.Content>{props.children}</Card.Content>
      </Card>
    </TableContext.Provider>
  )
}
