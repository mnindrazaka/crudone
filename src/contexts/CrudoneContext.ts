import React from 'react'
import { ICrudoneContext } from '../types'

export const CrudoneContext = React.createContext<ICrudoneContext>({
  getTableFields: () => [],
  getFormFields: () => [],
  open: false,
  isUpdateMode: false,
  openForm: () => undefined,
  closeForm: () => undefined,
  selectedData: {}
})
