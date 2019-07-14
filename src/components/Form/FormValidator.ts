import validator from 'validator'
import { IField } from '../../types'

interface IValidator {
  validation: string
  validator: (value: string) => boolean
  message: string
}

const validators: IValidator[] = [
  {
    validation: 'email',
    validator: validator.isEmail,
    message: 'ini bukan email lho'
  },
  {
    validation: 'alpha',
    validator: validator.isAlpha,
    message: 'diisi huruf saja ya'
  },
  {
    validation: 'numeric',
    validator: validator.isNumeric,
    message: 'diisi angka saja ya'
  }
]

export class FormValidator {
  public field: IField
  public value: any

  public constructor(field: IField, value: any) {
    this.field = field
    this.value = value
  }

  public validate(onError: (name: string, message: string) => void) {
    const value = this.getStringValue(this.field, this.value)
    this.field.validations!.forEach(validation => {
      if (value !== '') {
        validators.forEach(validator => {
          if (
            validation === validator.validation &&
            !validator.validator(value)
          )
            onError(this.field.name, validator.message)
        })
      } else if (validation === 'required')
        onError(this.field.name, 'wajib diisi ya')
    })
  }

  public getStringValue(field: IField, value: any) {
    if (value === undefined) return ''
    else if (typeof value === 'object') return value[field.optionData!.valueKey]
    else return String(value)
  }
}
