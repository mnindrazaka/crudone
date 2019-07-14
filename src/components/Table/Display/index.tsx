import React, { useContext } from 'react'
import { Table } from 'semantic-ui-react'
import { CrudoneContext } from '../../../contexts/CrudoneContext'
import { TableContext } from '../../../contexts/TableContext'
import { Blank } from './Blank'
import { Body } from './Body'
import { Header } from './Header'
import { Loading } from './Loading'
import { Pagination } from './Pagination'

interface IProps {
  onRowClick?: (rowData: any) => void
  emptyText?: string
}

const defaultProps: IProps = {
  emptyText: 'Data not found'
}

export const Display: React.FC<IProps> = props => {
  const tableContext = useContext(TableContext)
  const crudoneContext = useContext(CrudoneContext)

  if (tableContext.loading) {
    return <Loading />
  } else if (tableContext.getSearchedData().length === 0) {
    return <Blank emptyText={props.emptyText} />
  } else {
    return (
      <>
        <Table celled sortable selectable style={styles.table}>
          <Header
            fields={crudoneContext.getTableFields()}
            sortKey={tableContext.sortKey}
            isDescending={tableContext.isDescending}
            onChangeSort={tableContext.changeSort}
          />
          <Body
            fields={crudoneContext.getTableFields()}
            paginatedData={tableContext.getPaginatedData()}
            startingNumber={tableContext.getOffset() + 1}
            onRowClick={(rowData: any) => {
              crudoneContext.openForm(Object.assign({}, rowData), true)
              if (props.onRowClick) props.onRowClick(rowData)
            }}
          />
        </Table>

        <Pagination
          dataLength={tableContext.getSearchedData().length}
          itemPerPage={tableContext.itemPerPage}
          activePage={tableContext.activePage}
          onPageChange={tableContext.changePage}
        />
      </>
    )
  }
}

Display.defaultProps = defaultProps

const styles = {
  table: {
    margin: 5
  }
}
