import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { InputDropdown } from './InputDropdown'
import { IField } from '../../types'
import { FieldProps } from 'formik'

interface IProps {
  field: IField
  formikField: FieldProps
  disabled: boolean
}

export class FormInput extends Component<IProps> {
  public render() {
    const { field, formikField, disabled } = this.props

    switch (field.type) {
      case 'option': {
        return (
          <InputDropdown
            {...field}
            {...formikField.field}
            field={field}
            disabled={disabled}
            onBlur={() => formikField.form.setFieldTouched(field.name)}
            onChange={value =>
              formikField.form.setFieldValue(field.name, value)
            }
          />
        )
      }
      case 'date': {
        return (
          <Input
            {...field}
            {...formikField}
            value={String(formikField.field.value).slice(0, 10)}
            disabled={disabled}
            fluid
          />
        )
      }
      default: {
        return (
          <Input
            {...field}
            {...formikField.field}
            placeholder={`Masukkan ${field.label}`}
            disabled={disabled}
            fluid
          />
        )
      }
    }
  }
}
