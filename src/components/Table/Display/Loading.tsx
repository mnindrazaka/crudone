import React, { Component } from 'react'
import { Card, Placeholder } from 'semantic-ui-react'

export class Loading extends Component {
  public render() {
    return (
      <Card fluid style={styles.card}>
        <Card.Content>
          <Placeholder fluid>
            <Placeholder.Line length="full" style={styles.line} />
            <Placeholder.Line length="full" style={styles.line} />
            <Placeholder.Line length="full" style={styles.line} />
            <Placeholder.Line length="full" style={styles.line} />
            <Placeholder.Line length="full" style={styles.line} />
          </Placeholder>
        </Card.Content>
      </Card>
    )
  }
}

const styles = {
  card: {
    margin: 5
  },
  line: {
    fontSize: 30
  }
}
