import { nameof } from '#veewme/lib/util'
import * as log from '#veewme/web/common/log'
import Modal from '#veewme/web/common/modal'
import styled from '#veewme/web/common/styled-components'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { useState } from 'react'
import Button from '../../common/buttons/basicButton'
import CheckboxField from '../../common/formikFields/checkboxField'
import InputField from '../../common/formikFields/inputField'

import { MailOutline } from 'styled-icons/material'

/* START of Form*/
const FieldsWrapper = styled.div`
  margin: -10px 0 15px;
`

const Checkbox = styled(CheckboxField)`
  padding: 7px 0;
`

const OtherEmailWrapper = styled.div`
  padding-left: 25px;

  input {
    min-width: 230px;
  }

  input:disabled {
    background: ${props => props.theme.colors.EXTRA_LIGHT_GREY};;
  }

  p {
    color: ${props => props.theme.colors.LABEL_TEXT};
    font-size: 11px;
  }
`

const StyledForm = styled(Form)`
  button {
    margin-top: 15px;
    width: 100%;
  }
`

type contentType = 'photo' | 'video' | 'interactive'

interface CustomProps {
  onSubmit: (values: FormValues) => void
  type: contentType
}

interface OutputFormValues {
  agent: boolean
  officeAdmin: boolean
  definedCC: boolean
  otherEmails?: string
  type: contentType
}

// form values used only 'locally' (not sent to server)
interface AdditionalFormValues {
  other: boolean
}

type FormValues = OutputFormValues & AdditionalFormValues
type MediaEmailFormViewProps = FormikProps<FormValues> & CustomProps

const MediaEmailFormView: React.FunctionComponent<MediaEmailFormViewProps> = props => {
  return (
      <StyledForm>
        <FieldsWrapper>
          <Field
            name={`${nameof<FormValues>('agent')}`}
            component={Checkbox}
            label='Agent (Default)'
          />
          <Field
            name={`${nameof<FormValues>('officeAdmin')}`}
            component={Checkbox}
            label='Office Admin'
          />
          <Field
            name={`${nameof<FormValues>('definedCC')}`}
            component={Checkbox}
            label='Defined CC'
          />
          <Field
            name={`${nameof<FormValues>('other')}`}
            component={Checkbox}
            label='Other'
          />
          <OtherEmailWrapper>
            <Field
              name={`${nameof<FormValues>('otherEmails')}`}
              component={InputField}
              disabled={!props.values.other}
            />
            <p>If adding multiple, separate with comma</p>
          </OtherEmailWrapper>
        </FieldsWrapper>
      <Button full buttonTheme='info' type='button' label='Send Email' onClick={props.submitForm} />
    </StyledForm>
  )
}

const MediaEmailForm = withFormik<CustomProps, FormValues>({
  handleSubmit:  (values, { props }) => {
    const valuesCopy = { ...values }
    const other = valuesCopy.other
    delete valuesCopy.other
    if (!other) {
      delete valuesCopy.otherEmails
    }
    props.onSubmit(valuesCopy)
  },
  mapPropsToValues: props => ({
    agent: true,
    definedCC: false,
    officeAdmin: false,
    other: false,
    type: props.type
  })
})(MediaEmailFormView)
/* END of Form*/

const Wrapper = styled.div``

const StyledButton = styled(props => <Button {...props} />)`
  margin-left: 10px;

  svg {
    width: 20px;
    max-width: 20px;
    height: 20px;
    max-height: 20px;
    fill: ${props => props.theme.colors.GREEN};
  }
`

interface MediaEmailModalProps {
  label: string
  type: contentType
}

const MediaEmailModal: React.FunctionComponent<MediaEmailModalProps> = props => {
  const [isOpen, toggleModal] = useState<boolean>(false)

  return (
    <Wrapper>
      <StyledButton
        buttonTheme='primary'
        label={props.label}
        type='button'
        icon={MailOutline}
        onClick={() => toggleModal(prev => !prev)}
      />
      <Modal
        centerVertically
        title='Include in email'
        isOpen={isOpen}
        onRequestClose={() => toggleModal(false)}
      >
        <MediaEmailForm
          type={props.type}
          onSubmit={vals => {
            log.debug(vals)
            toggleModal(false)
          }}
        />
      </Modal>
    </Wrapper>
  )
}

export default MediaEmailModal
