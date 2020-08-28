import { Country, State } from '#veewme/lib/types'
import * as React from 'react'
import { NewOrderValues } from '../common'
import CardDetailsPanel from './cardDetails'
import ShippingInfoPanel from './shippingInfo'

interface CustomProps {
  countries: Country[]
  states: State[]
  values: NewOrderValues
}

type Step4Props = CustomProps

const Step4: React.FunctionComponent<Step4Props> = props => (
  <>
    <CardDetailsPanel
      values={props.values}
    />
    <ShippingInfoPanel
      countries={props.countries}
      states={props.states}
      values={props.values}
    />
  </>
)

export default Step4
