import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container, CreateButton, Table, Form } from 'crudone'
import * as yup from 'yup'

const hobi = [
  {
    id: 1,
    nama: 'berenang'
  },
  {
    id: 2,
    nama: 'menulis'
  },
  {
    id: 3,
    nama: 'mewarnai'
  }
]

const schema = {
  name: {
    label: 'Name'
  },
  phone: {
    label: 'Phone'
  },
  hobi: {
    label: 'Hobi',
    type: 'option',
    optionData: {
      data: hobi,
      textKey: 'nama',
      valueKey: 'id'
    }
  }
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  phone: yup.number().required(),
  hobi: yup.string().required()
})

export default class App extends Component {
  state = {
    data: [
      { id: 1, name: 'aka', phone: '085331247098', hobi: hobi[0] },
      { id: 2, name: 'zaka', phone: '085331247097', hobi: hobi[1] },
      { id: 3, name: 'nindra', phone: '085331247096', hobi: hobi[2] }
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
            validationSchema={validationSchema}
            onCreate={this.createContact}
            onUpdate={this.updateContact}
            onDelete={this.deleteContact}
          />
        </Container>
      </div>
    )
  }
}
