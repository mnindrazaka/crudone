import React, { useContext } from 'react'
import { Button } from 'semantic-ui-react'
import { CrudoneContext } from '../contexts/CrudoneContext'

interface IProps {
  text?: string
}

const defaultProps: IProps = {
  text: 'Add New'
}

export const CreateButton: React.FC<IProps> = props => {
  const context = useContext(CrudoneContext)
  return (
    <Button
      content={props.text}
      color="green"
      onClick={() => context.openForm(null, false)}
    />
  )
}

CreateButton.defaultProps = defaultProps
