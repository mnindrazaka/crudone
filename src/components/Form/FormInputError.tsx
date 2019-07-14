import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

interface IProps {
  errorMessage: string | undefined
}

export class FormInputError extends Component<IProps> {
  public render() {
    return this.props.errorMessage === undefined ? null : (
      <Message color="red" size="tiny" content={this.props.errorMessage} />
    )
  }
}
