import React, { Component } from 'react'
import { CrudoneContext } from '../contexts/CrudoneContext'
import { ICrudoneContext, ISchema, IField } from '../types'

interface IProps {
  schema: ISchema
}

interface IState {
  open: boolean
  selectedData: any
  isUpdateMode: boolean
}

export class Container extends Component<IProps, IState> {
  public state: IState = {
    open: false,
    selectedData: {},
    isUpdateMode: false
  }

  public openForm = (selectedData: any, isUpdateMode: boolean) => {
    if (selectedData === null) {
      let data: any = {}
      Object.keys(this.props.schema).forEach(key => {
        data[key] = ''
      })
      selectedData = data
    }
    this.setState({ open: true, selectedData, isUpdateMode })
  }

  public closeForm = () => {
    this.setState({ open: false })
  }

  public mapSchemaToFields = (): IField[] => {
    return Object.keys(this.props.schema).map(key => ({
      name: key,
      ...this.props.schema[key]
    }))
  }

  public getTableFields = () => {
    return this.mapSchemaToFields().filter(field => !field.hideOnTable)
  }

  public getFormFields = () => {
    return this.mapSchemaToFields().filter(field => !field.hideOnForm)
  }

  public render() {
    const providerValue: ICrudoneContext = {
      getTableFields: this.getTableFields,
      getFormFields: this.getFormFields,
      open: this.state.open,
      isUpdateMode: this.state.isUpdateMode,
      openForm: this.openForm,
      closeForm: this.closeForm,
      selectedData: this.state.selectedData
    }
    return (
      <CrudoneContext.Provider value={providerValue}>
        {this.props.children}
      </CrudoneContext.Provider>
    )
  }
}
