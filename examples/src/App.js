import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, CreateButton, Table, Validation, Form } from 'crudone'

const schema = {
  name: {
    label: 'Name',
    validations: [Validation.required]
  },
  phone: {
    label: 'Phone',
    validations: [Validation.numeric, Validation.required]
  }
}

export default class App extends Component {
  state = {
    data: [
      { id: 1, name: 'aka', phone: '085331247098' },
      { id: 2, name: 'zaka', phone: '085331247097' },
      { id: 3, name: 'nindra', phone: '085331247096' }
    ]
  }

  createContact = contact => {
    const { data } = this.state
    data.push(contact)
    this.setState({ data })
  }

  updateContact = contact => {
    this.setState(prevState => ({
      data: prevState.data.map(item =>
        item.id === contact.id ? contact : item
      )
    }))
  }

  deleteContact = contact => {
    this.setState(prevState => ({
      data: prevState.data.filter(item => item.id !== contact.id)
    }))
  }

  render() {
    return (
      <div style={{ margin: 100 }}>
        <Container schema={schema}>
          <CreateButton />
          <Table.Container data={this.state.data}>
            <Table.Search />
            <Table.Limiter />
            <Table.Display />
          </Table.Container>
          <Form
            onCreate={this.createContact}
            onUpdate={this.updateContact}
            onDelete={this.deleteContact}
          />
        </Container>
      </div>
    )
  }
}
