import { Agent, Amenity, Country, Currency, ListingTypesCategory, State } from '#veewme/lib/types'
import * as React from 'react'
import { FormValues } from '../newOrderForm'
import AgentPanel from './agentPanel'
import AmenitiesPanel from './amenitiesPanel'
import PropertyAddressPanel from './propertyAddressPanel'
import PropertyDetailsPanel from './propertyDetailsPanel'
import ShootInfoPanel from './shootInfo'
import Skip from './skip'

export interface Step2FieldsProps {
  agents: Agent[]
  amenities: Amenity[]
  countries: Country[]
  currencies: Currency[]
  listingTypesCategories: ListingTypesCategory[]
  states: State[]
}

interface CustomProps {
  values: FormValues
  onUpdateLocation: () => void
}

type Step2Props = CustomProps & Step2FieldsProps

const Step2: React.FunctionComponent<Step2Props> = props => (
  <>
    <AgentPanel
      agents={props.agents}
      currencies={props.currencies}
    />
    <PropertyAddressPanel
      countries={props.countries}
      states={props.states}
      onUpdateLocation={props.onUpdateLocation}
    />
    <ShootInfoPanel />
    <Skip />
    <PropertyDetailsPanel
      listingTypesCategories={props.listingTypesCategories}
      currencies={props.currencies}
    />
    <AmenitiesPanel
      defaultAmenities={props.amenities}
      values={props.values}
    />
  </>
)

export default Step2
