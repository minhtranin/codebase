import { nameof } from '#veewme/lib/util'
import CheckboxField from '#veewme/web/common/formikFields/checkboxField'
import InputField from '#veewme/web/common/formikFields/inputField'
import InlineHelp from '#veewme/web/common/inlineHelp'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field } from 'formik'
import * as React from 'react'
import { NewClientValues, User, UserValues } from './valuesInterfaces'

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const Checkbox = styled(CheckboxField)`
  font-size: 11px;
`

const FieldsWrapper = styled.div`
  width: 100%;
  input {width: 100%}
`

interface ContactInformationProps {
  showAgentOptions?: boolean
}

class ContactInformation extends React.PureComponent<ContactInformationProps> {
  render () {
    return (
      <Panel heading='Contact Information' toggleable>
        <FieldsWrapper>
          <Field
            type='tel'
            label={`Phone${this.props.showAgentOptions ? ' Office' : ''}`}
            name={nameof<NewClientValues>('phone')}
            component={InputField}
          />
          {this.props.showAgentOptions &&
            <Field
              type='tel'
              label='Phone Mobile'
              name={nameof<NewClientValues>('phoneMobile')}
              component={InputField}
            />
          }
          {this.props.showAgentOptions &&
            <Field
              type='tel'
              label='Phone Alternate'
              name={nameof<NewClientValues>('phoneAlternate')}
              component={InputField}
            />
          }
          <Field
            type='email'
            label='Email'
            name={`${nameof<UserValues>('user')}.${nameof<User>('email')}`}
            component={InputField}
          />
          <Field
            type='email'
            label='Email Office'
            name={nameof<NewClientValues>('emailOffice')}
            component={InputField}
          />
          {this.props.showAgentOptions &&
            <Field
              type='email'
              label='Email CC'
              name={nameof<NewClientValues>('emailCC')}
              component={InputField}
            />
          }
          {this.props.showAgentOptions &&
            <CheckboxContainer>
              <Field
                label='Order Placed'
                name={nameof<NewClientValues>('emailCCorderPlaced')}
                component={Checkbox}
              />
              <Field
                label='Order Completed'
                name={nameof<NewClientValues>('emailCCorderCompleted')}
                component={Checkbox}
              />
              <InlineHelp
                text={
                  'Email adresses enter here will receive all the same emails as\n'
                  + 'like the primary email recipient. Checking-off Order Placed\n'
                  + 'will send only Order Confirmation emails. Checking-off Order\n'
                  + 'Completed will send only Order Completion emails.\n'
                  + 'Checking-off both boxes will only send both emails.'
                }
              />
            </CheckboxContainer>
          }
          <Field
            type='url'
            label='Website'
            name={nameof<NewClientValues>('website')}
            component={InputField}
          />
        </FieldsWrapper>
      </Panel>
    )
  }
}

export default ContactInformation
