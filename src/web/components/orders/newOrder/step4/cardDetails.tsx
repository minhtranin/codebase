import { CreditCard } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import InputField from '#veewme/web/common/formikFields/inputField'
import InlineHelp from '#veewme/web/common/inlineHelp'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field } from 'formik'
import * as React from 'react'
import { NewOrderValues } from '../common'
import { FormValues } from '../newOrderForm'
import { StyledHelpWrapper } from '../styled'

const CVCHelpText = `Consequat dolore dolor proident anim dolor deserunt esse irure voluptate. \nConsectetur qui do pariatur culpa deserunt est adipisicing id voluptate. \nAliqua ullamco do exercitation aliquip pariatur. \nDo et pariatur dolor anim eu proident irure in minim cupidatat qui qui nostrud est. \nSunt non dolore fugiat qui qui labore ipsum consequat esse sint qui nostrud.`

interface CardDetailsPanelProps {
  values: NewOrderValues
}

const StyledInputsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  input {width: 100%;}
`

const CardDetailsPanel: React.FunctionComponent<CardDetailsPanelProps> = props => {
  return (
    <Panel heading='Card Details'>
      <StyledInputsWrapper>
        <Field
          label='Card Number:'
          name={`${nameof<FormValues>('creditCard')}.${nameof<CreditCard>('cardNumber')}`}
          component={InputField}
          placeholder='Valid card number...'
        />
        <StyledInputsWrapper>
          <Field
            label='Expiration:'
            name={`${nameof<FormValues>('creditCard')}.${nameof<CreditCard>('expiration')}`}
            component={InputField}
            placeholder='MM / YY'
          />
          <Field
            label='CVC Code:'
            name={`${nameof<FormValues>('creditCard')}.${nameof<CreditCard>('CVC')}`}
            component={InputField}
            placeholder='e. g. 878'
            rightComponent={
              <StyledHelpWrapper>
                <InlineHelp text={CVCHelpText}/>
              </StyledHelpWrapper>
            }
          />
        </StyledInputsWrapper>
      </StyledInputsWrapper>
    </Panel>
  )
}

export default CardDetailsPanel
