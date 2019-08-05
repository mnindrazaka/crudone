import React, { FC } from 'react'
import { Button, DropdownItemProps, Label, Select } from 'semantic-ui-react'
import { IField } from '../../types'

interface IProps {
  name: string
  label: string
  value: any
  disabled: boolean
  onChange: (value: any) => void
  onBlur: () => void
  field: IField
}

export const InputDropdown: FC<IProps> = props => {
  function getValue() {
    const { value, field } = props
    return value ? value[field.optionData!.valueKey] : undefined
  }

  function getOptions(): DropdownItemProps[] {
    const { optionData } = props.field
    return optionData!.data.map(item => ({
      text: item[optionData!.textKey],
      value: item[optionData!.valueKey]
    }))
  }

  function getObjectValue(
    value:
      | string
      | number
      | boolean
      | Array<string | number | boolean>
      | undefined
  ) {
    const { optionData } = props.field
    return optionData!.data.filter(
      item => item[optionData!.valueKey] === value
    )[0]
  }

  return (
    <>
      <Button.Group fluid>
        <Label size="large" content={props.label} style={styles.label} />
        <Select
          name={props.name}
          placeholder={'Pilih ' + props.label}
          basic
          selection
          search
          button
          floating
          options={getOptions()}
          value={getValue()}
          disabled={props.disabled}
          style={styles.dropdown}
          onChange={(event, { value }) => props.onChange(getObjectValue(value))}
          onBlur={props.onBlur}
        />
      </Button.Group>
    </>
  )
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
