import React from 'react'
import { ITableContext } from '../types'

export const TableContext = React.createContext<ITableContext>({
  loading: undefined,

  searchValue: '',
  changeSearchValue: () => undefined,

  searchKey: '',
  changeSearchKey: () => undefined,

  sortKey: '',
  isDescending: false,
  changeSort: () => undefined,

  getPaginatedData: () => [],
  getOffset: () => 0,
  getSearchedData: () => [],

  itemPerPage: 0,
  changeLimit: () => undefined,

  activePage: 1,
  changePage: () => undefined
})
