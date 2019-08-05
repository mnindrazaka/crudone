import React, { useContext } from 'react'
import { Button, Grid, Header, Modal, Divider } from 'semantic-ui-react'
import { CrudoneContext } from '../../contexts/CrudoneContext'
import { FormInput } from './FormInput'
import { FormInputError } from './FormInputError'
import {
  Formik,
  Form as FormikForm,
  ErrorMessage,
  FieldProps,
  Field
} from 'formik'

interface IProps {
  createTitle?: string
  updateTitle?: string
  onCreate?: (input: any) => void
  onUpdate?: (input: any) => void
  onDelete?: (input: any) => void
  validationSchema?: any
  additionalAction?: (
    selectedData: any,
    isUpdateMode: boolean
  ) => JSX.Element | null
}

const defaultProps: IProps = {
  createTitle: 'Create New',
  updateTitle: 'Update Data'
}

export const Form: React.FC<IProps> = props => {
  const context = useContext(CrudoneContext)

  function submit(values: any) {
    if (context.isUpdateMode) props.onUpdate!(values)
    else props.onCreate!(values)
    context.closeForm()
  }

  function renderSubmitButton() {
    return props.onUpdate || !context.isUpdateMode ? (
      <Button color="green" content="Simpan" type="submit" />
    ) : null
  }

  function renderDeleteButton() {
    return (
      props.onDelete &&
      context.isUpdateMode && (
        <Button
          content="Hapus"
          color="red"
          onClick={() => {
            props.onDelete!(context.selectedData)
            context.closeForm()
          }}
        />
      )
    )
  }

  function renderAdditionalAction() {
    return (
      props.additionalAction &&
      props.additionalAction(context.selectedData, context.isUpdateMode)
    )
  }

  function renderFormInputs() {
    return context.getFormFields().map(field => (
      <Grid.Column key={field.name}>
        <Field
          name={field.name}
          render={(formikField: FieldProps) => (
            <FormInput
              field={field}
              formikField={formikField}
              disabled={!props.onUpdate && context.isUpdateMode}
            />
          )}
        />

        <ErrorMessage
          name={field.name}
          render={errorMessage => (
            <FormInputError errorMessage={errorMessage} />
          )}
        />
      </Grid.Column>
    ))
  }

  return (
    <Modal open={context.open} size="large" onClose={context.closeForm}>
      <Header
        content={context.isUpdateMode ? props.updateTitle : props.createTitle}
      />
      <Modal.Content>
        <Formik
          initialValues={context.selectedData}
          onSubmit={submit}
          validationSchema={props.validationSchema}
          render={() => (
            <FormikForm>
              <Grid columns="2">{renderFormInputs()}</Grid>
              <Divider />
              <Grid padded>
                {renderSubmitButton()}
                {renderDeleteButton()}
                {renderAdditionalAction()}
              </Grid>
            </FormikForm>
          )}
        />
      </Modal.Content>
    </Modal>
  )
}

Form.defaultProps = defaultProps
