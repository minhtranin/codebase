import { Country, PropertyAddress, State } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import Button from '#veewme/web/common/buttons/basicButton'
import CheckboxField from '#veewme/web/common/formikFields/checkboxField'
import InputField from '#veewme/web/common/formikFields/inputField'
import SelectField from '#veewme/web/common/formikFields/selectField'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field } from 'formik'
import * as React from 'react'
import { getCountryOptions, getStateOptions } from '../common'
import { FormValues } from '../newOrderForm'
import { StyledGreenBold, StyledRedSpanHeader } from '../styled'

const PropertyAddressPanelHeader: React.FunctionComponent<{}> = () => (
  <StyledRedSpanHeader>
    <p>Property Address <span>*</span></p>
  </StyledRedSpanHeader>
)

const StyledGrid = styled.div `
  margin: 30px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  input {width: 100%;}
`

const ButtonWrapper = styled.div `
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`

interface PropertyAddressPanelProps {
  countries: Country[]
  states: State[]
  onUpdateLocation: () => void
}

const PropertyAddressPanel: React.FunctionComponent<PropertyAddressPanelProps> = props => {
  return (
    <Panel heading='' headingPlacedComponent={<PropertyAddressPanelHeader/>}>
      <p><StyledGreenBold>Note!</StyledGreenBold> Street address will lock after 30 days and it will not be changeable.</p>
      <StyledGrid>
        <Field
          name={`${nameof<FormValues>('propertyAddress')}.${nameof<PropertyAddress>('street')}`}
          component={InputField}
          label='Street Address:'
        />
        <Field
          name={`${nameof<FormValues>('propertyAddress')}.${nameof<PropertyAddress>('city')}`}
          component={InputField}
          label='City:'
        />
        <Field
          name={`${nameof<FormValues>('propertyAddress')}.${nameof<PropertyAddress>('stateId')}`}
          component={SelectField}
          label='State/Province:'
          placeholder='State/Province...'
          options={getStateOptions(props.states)}
        />
        <Field
          name={`${nameof<FormValues>('propertyAddress')}.${nameof<PropertyAddress>('zip')}`}
          component={InputField}
          label='ZIP/Postal Code:'
        />
        <Field
          name={`${nameof<FormValues>('propertyAddress')}.${nameof<PropertyAddress>('countryId')}`}
          component={SelectField}
          label='Country:'
          placeholder='Country...'
          options={getCountryOptions(props.countries)}
          compactMode
        />
        <ButtonWrapper>
          <Button
            type='button'
            buttonTheme='action'
            full
            label='Update location'
            onClick={props.onUpdateLocation}
          />
        </ButtonWrapper>
      </StyledGrid>
      <Field
        name={`${nameof<FormValues>('propertyAddress')}.${nameof<PropertyAddress>('dontShowOnSite')}`}
        label="Don't display address on Property Site/Tour"
        component={CheckboxField}
      />
    </Panel>
  )
}

export default PropertyAddressPanel
