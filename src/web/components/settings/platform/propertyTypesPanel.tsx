import { nameof } from '#veewme/lib/util'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import AddChipsSection from './addChipsSection'
import { FormValues } from './form'

const StyledPanel = styled(Panel) `
  & section + section {
    padding-top: 16px;
    border-top: 1px solid ${props => props.theme.colors.BORDER}
  }
`

interface PropertyTypesProps {
  values: FormValues
}

const PropertyTypes: React.FunctionComponent<PropertyTypesProps> = props => (
  <StyledPanel heading='Property Types' toggleable>
    <AddChipsSection
      chips={props.values.primaryPropertyTypes}
      valuesName={nameof<FormValues>('primaryPropertyTypes')}
      inputValue={props.values.primaryPropertyTypeToAdd}
      inputName={nameof<FormValues>('primaryPropertyTypeToAdd')}
      inputPlaceholder='Add own primary type...'
      inputLabel='Primary Type:'
    />
    <AddChipsSection
      chips={props.values.otherPropertyTypes}
      valuesName={nameof<FormValues>('otherPropertyTypes')}
      inputValue={props.values.otherPropertyTypeToAdd}
      inputName={nameof<FormValues>('otherPropertyTypeToAdd')}
      inputPlaceholder='Add own other type...'
      inputLabel='Other Type:'
    />
  </StyledPanel>
)

export default PropertyTypes
