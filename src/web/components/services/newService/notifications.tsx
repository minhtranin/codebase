import { Field } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import InputField from '../../../common/formikFields/inputField'
import Panel from '../../../common/panel'
import styled from '../../../common/styled-components'
import { FormValues } from './form'

const InputWrapper = styled.div`
  margin-bottom: 15px;

  input {
    width: 100%;
  }

  span {
    font-size: 12px;
    color: ${props => props.theme.colors.LABEL_TEXT};
  }
`

export class Notifications extends React.Component<{}> {
  render () {
    return (
      <Panel id='notifications' heading='Notifications'>
        <InputWrapper>
          <Field
            name={nameof<FormValues>('orderNotifyEmail')}
            component={InputField}
            label='Notify by email upon order'
            compactMode
          />
          <span>Enter in one or multiple emails. When the service is ordered, each address will receive email notification.</span>
        </InputWrapper>
        <InputWrapper>
          <Field
            name={nameof<FormValues>('tourNotifyEmail')}
            component={InputField}
            label='Notify by email upon order'
            compactMode
          />
          <span>Enter in one or multiple emails. When the tour is ordered, each address will receive email notification.</span>
        </InputWrapper>
      </Panel>
    )
  }
}

export default Notifications
