export interface ICrudoneContext {
  getTableFields: () => IField[]
  getFormFields: () => IField[]
  open: boolean
  selectedData: any
  isUpdateMode: boolean
  openForm: (selectedData: any, isUpdateMode: boolean) => void
  closeForm: () => void
}

export interface ITableContext {
  loading: boolean | undefined

  searchValue: string
  changeSearchValue: (value: string) => void

  searchKey: string
  changeSearchKey: (key: string) => void

  sortKey: string
  isDescending: boolean
  changeSort: (fieldName: string) => void

  getPaginatedData: () => any[]
  getOffset: () => number
  getSearchedData: () => any[]

  itemPerPage: number
  changeLimit: (limit: number) => void

  activePage: number
  changePage: (page: number) => void
}

export interface IOptionData {
  data: any[]
  textKey: string
  valueKey: string
}

export interface ISchema {
  [s: string]: ISchemaItem
}

export interface ISchemaItem {
  label: string
  type?: 'text' | 'password' | 'option' | 'date'
  validations?: string[]
  optionData?: IOptionData
  hideOnTable?: boolean
  hideOnForm?: boolean
}

export interface IField {
  name: string
  label: string
  type?: 'text' | 'password' | 'option' | 'date'
  optionData?: IOptionData
  hideOnTable?: boolean
  hideOnForm?: boolean
}
