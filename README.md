# crudone
crud ? done ! react component for easy crud

## How to Install

1. Install crudone

```bash
npm install crudone
```

2. Install semantic UI

crudone use semantic UI as component library, so we have to install it

```bash
# install semantic UI for react
npm install semantic-ui-react

# install semantic UI css
npm install semantic-ui-css
```

3. Enable semantic UI CSS

import `semantic-ui-css/semantic.min.css` to your `index.js`

```javascript
import 'semantic-ui-css/semantic.min.css'
```

## Quick Start

This is example of contact CRUD using crudone 

```javascript
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
    )
  }
}

```

## Props

### 1. Container

`<Container />` used to wrap other component

| Name   | Type   | Default | Description    |
| ------ | ------ | ------- | -------------- |
| Schema | Object |         | Schema of data |

### 2. Table

Here is the list of table component

#### 2.1. Table Container

`<Table.Container />` used to wrap table component

| Name | Type            | Default | Description    |
| ---- | --------------- | ------- | -------------- |
| data | Array of Object |         | Data for table |

#### 2.2. Table.Display

`<Table.Display />` used to show table

| Name       | Type     | Default        | Description                     |
| ---------- | -------- | -------------- | ------------------------------- |
| emptyText  | String   | Data not found | Message to show when data empty |
| onRowClick | Function |                | Function when table row clicked |

#### 2.3. Table Search

`<Table.Search />` used to search data in table

| Name        | Type   | Default | Description                  |
| ----------- | ------ | ------- | ---------------------------- |
| placeholder | String | Search  | Placeholder for search input |

#### 2.4. Table Limiter

`<Table.Limiter />` used to limit data per page

| Name   | Type            | Default       | Description           |
| ------ | --------------- | ------------- | --------------------- |
| text   | String          | Item Per Page | Text to show as label |
| limits | Array of Number | [10, 25, 50]  | List of limit to use  |

### 3. Form

`<Form />` used to show modal form for CRUD operation 

| Name        | Type     | Default     | Description                            |
| ----------- | -------- | ----------- | -------------------------------------- |
| createTitle | String   | Create New  | Form title to show on create operation |
| updateTitle | String   | Update Data | Form title to show on update operation |
| onCreate    | Function |             | Function to handle create operation    |
| onUpdate    | Function |             | Function to handle update operation    |
| onDelete    | Function |             | Function to handle delete operation    |

### 4. Create Button

`<CreateButton />` used to trigger `<Form />` modal on create operation

| Name | Type   | Default | Description            |
| ---- | ------ | ------- | ---------------------- |
| text | String | Add New | Text to show in button |
