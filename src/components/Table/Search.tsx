import React, { useContext } from 'react'
import { Dropdown, Input } from 'semantic-ui-react'
import { CrudoneContext } from '../../contexts/CrudoneContext'
import { TableContext } from '../../contexts/TableContext'

interface IProps {
  placeholder?: string
}

const defaultProps: IProps = {
  placeholder: 'Search'
}

export const Search: React.FC<IProps> = props => {
  const crudoneContext = useContext(CrudoneContext)
  const tableContext = useContext(TableContext)

  function getOptions() {
    return crudoneContext.getFormFields().map(field => ({
      text: field.label,
      value: field.name
    }))
  }

  return (
    <Input
      action={
        <Dropdown
          button
          floating
          options={getOptions()}
          value={tableContext.searchKey}
          onChange={(event, { value }) =>
            tableContext.changeSearchKey(value as string)
          }
        />
      }
      icon="search"
      iconPosition="left"
      placeholder={props.placeholder}
      value={tableContext.searchValue}
      onChange={event => tableContext.changeSearchValue(event.target.value)}
      style={styles.input}
    />
  )
}

Search.defaultProps = defaultProps

const styles = {
  input: {
    margin: 5
  }
}
