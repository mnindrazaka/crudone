import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { IField } from '../../types'
import { InputDropdown } from './InputDropdown'

interface IProps {
  field: IField
  onChange: (value: any) => void
  value: any
  readOnly: boolean
}

export class FormInput extends Component<IProps> {
  public renderInput() {
    const { field, value } = this.props
    if (field.type === 'option') {
      return (
        <InputDropdown
          field={field}
          onChange={this.props.onChange}
          value={value}
          readOnly={this.props.readOnly}
        />
      )
    } else if (field.type === 'date') {
      return (
        <Input
          type={field.type}
          label={field.label}
          fluid
          onChange={event => this.props.onChange(event.target.value)}
          value={String(value).slice(0, 10)}
          readOnly={this.props.readOnly}
        />
      )
    } else {
      return (
        <Input
          placeholder={`Masukkan ${field.label}`}
          type={field.type}
          label={field.label}
          fluid
          onChange={event => this.props.onChange(event.target.value)}
          value={value}
          readOnly={this.props.readOnly}
        />
      )
    }
  }

  public render() {
    return this.renderInput()
  }
}
