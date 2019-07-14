import React, { Component } from 'react'
import { Card, Header, Icon } from 'semantic-ui-react'

interface IProps {
  emptyText?: string
}

export class Blank extends Component<IProps> {
  public render() {
    return (
      <Card fluid style={styles.card}>
        <Card.Content>
          <Header size="huge" icon color="grey">
            <Icon name="file outline" size="mini" />
            <Header.Content>{this.props.emptyText}</Header.Content>
          </Header>
        </Card.Content>
      </Card>
    )
  }
}

const styles = {
  card: {
    margin: 5,
    paddingTop: 50,
    paddingBottom: 50
  }
}
