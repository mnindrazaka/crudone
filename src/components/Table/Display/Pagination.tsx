import React, { Component } from 'react'
import { Pagination as SemanticPagination } from 'semantic-ui-react'

interface IProps {
  activePage: number
  dataLength: number
  itemPerPage: number
  onPageChange: (pageNumber: number) => void
}

export class Pagination extends Component<IProps> {
  public getTotalPages() {
    return Math.ceil(this.props.dataLength / this.props.itemPerPage)
  }

  public render() {
    return (
      this.getTotalPages() > 1 && (
        <SemanticPagination
          style={styles.pagination}
          activePage={this.props.activePage}
          totalPages={this.getTotalPages()}
          onPageChange={(event, { activePage }) =>
            this.props.onPageChange(activePage as number)
          }
        />
      )
    )
  }
}

const styles = {
  pagination: {
    float: 'right'
  }
}
