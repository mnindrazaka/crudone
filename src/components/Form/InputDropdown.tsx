import React, { Component, Fragment } from 'react'
import { Button, Dropdown, DropdownItemProps, Label } from 'semantic-ui-react'
import { IField } from '../../types'

interface IProps {
  field: IField
  onChange: (value: any) => void
  value: any
  readOnly: boolean
}

export class InputDropdown extends Component<IProps> {
  public getValue() {
    const { value, field } = this.props
    return value ? value[field.optionData!.valueKey] : undefined
  }

  public getOptions(): DropdownItemProps[] {
    const { optionData } = this.props.field
    return optionData!.data.map(item => ({
      text: item[optionData!.textKey],
      value: item[optionData!.valueKey]
    }))
  }

  public getObjectValue(
    value:
      | string
      | number
      | boolean
      | Array<string | number | boolean>
      | undefined
  ) {
    const { optionData } = this.props.field
    return optionData!.data.filter(
      item => item[optionData!.valueKey] === value
    )[0]
  }

  public render() {
    return (
      <Fragment>
        <Button.Group fluid>
          <Label
            size="large"
            content={this.props.field.label}
            style={styles.label}
          />
          <Dropdown
            placeholder={'Pilih ' + this.props.field.label}
            basic
            selection
            search
            button
            floating
            options={this.getOptions()}
            value={this.getValue()}
            onChange={(event, { value }) =>
              this.props.onChange(this.getObjectValue(value))
            }
            disabled={this.props.readOnly}
            style={styles.dropdown}
          />
        </Button.Group>
      </Fragment>
    )
  }
}

const styles = {
  label: {
    marginRight: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    display: 'flex',
    alignItems: 'center'
  },
  dropdown: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
}
