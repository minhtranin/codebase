import { Address, Country, ShippingInfo, State } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import InputField from '#veewme/web/common/formikFields/inputField'
import SelectField from '#veewme/web/common/formikFields/selectField'
import { Field } from 'formik'
import * as React from 'react'
import Panel from '../../../../common/panel'
import styled from '../../../../common/styled-components'
import { getCountryOptions, getStateOptions, NewOrderValues } from '../common'
import { FormValues } from '../newOrderForm'

interface ShippingInfoPanelProps {
  countries: Country[]
  states: State[]
  values: NewOrderValues
}

const StyledInputsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  input {width: 100%;}
`

const ShippingInfoPanel: React.FunctionComponent<ShippingInfoPanelProps> = props => {
  return (
    <Panel heading='Shipping & Billing Information'>
      <StyledInputsWrapper>
        <Field
          label='First Name:'
          name={`${nameof<FormValues>('shippingInfo')}.${nameof<ShippingInfo>('firstName')}`}
          component={InputField}
        />
        <Field
          label='Last Name:'
          name={`${nameof<FormValues>('shippingInfo')}.${nameof<ShippingInfo>('lastName')}`}
          component={InputField}
        />
        <Field
          label='Email:'
          type='email'
          name={`${nameof<FormValues>('shippingInfo')}.${nameof<ShippingInfo>('email')}`}
          component={InputField}
        />
        <Field
          name={`${nameof<FormValues>('shippingInfo')}.${nameof<ShippingInfo>('address')}.${nameof<Address>('countryId')}`}
          component={SelectField}
          label='Country:'
          placeholder='Country...'
          options={getCountryOptions(props.countries)}
        />
        <Field
          label='Address:'
          name={`${nameof<FormValues>('shippingInfo')}.${nameof<ShippingInfo>('address')}.${nameof<Address>('street')}`}
          component={InputField}
        />
        <Field
          label='City:'
          name={`${nameof<FormValues>('shippingInfo')}.${nameof<ShippingInfo>('address')}.${nameof<Address>('city')}`}
          component={InputField}
        />
        <Field
          name={`${nameof<FormValues>('shippingInfo')}.${nameof<ShippingInfo>('address')}.${nameof<Address>('stateId')}`}
          component={SelectField}
          label='State/Province:'
          placeholder='State/Province...'
          options={getStateOptions(props.states)}
        />
        <Field
          label='ZIP Code:'
          name={`${nameof<FormValues>('shippingInfo')}.${nameof<ShippingInfo>('address')}.${nameof<Address>('zip')}`}
          component={InputField}
        />
      </StyledInputsWrapper>
    </Panel>
  )
}

export default ShippingInfoPanel
