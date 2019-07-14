import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import { IField } from '../../../types'

interface IProps {
  fields: IField[]
  sortKey: string
  isDescending: boolean
  onChangeSort: (fieldName: string) => void
}

export class Header extends Component<IProps> {
  public sortByDirection() {
    return this.props.isDescending ? 'descending' : 'ascending'
  }

  public isSorted(fieldName: string) {
    return fieldName === this.props.sortKey ? this.sortByDirection() : undefined
  }

  public renderHeaderCells() {
    return this.props.fields.map(field => (
      <Table.HeaderCell
        key={field.name}
        sorted={this.isSorted(field.name)}
        onClick={() => this.props.onChangeSort(field.name)}
        content={field.label}
      />
    ))
  }

  public render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No</Table.HeaderCell>
          {this.renderHeaderCells()}
        </Table.Row>
      </Table.Header>
    )
  }
}
