import { Agent, Country, State } from '#veewme/lib/types'
import * as React from 'react'
import { AllServicesCards, NewOrderValues } from '../common'
import CostSummaryPanel from './costSummary'
import PropertyDetailsPanel from './propertyDetailsPanel'
import SelectedServicesPanel from './selectedServicesPanel'
import ShootInfoPanel from './shootInfo'

interface CustomProps {
  agents: Agent[]
  countries: Country[]
  states: State[]
  values: NewOrderValues
  discount: number
  validPromoCode: boolean
  onApplyPromoCode: () => void
}

type Step3Props = CustomProps & AllServicesCards

const Step3: React.FunctionComponent<Step3Props> = props => (
  <>
    <SelectedServicesPanel
      packageCards={props.packageCards}
      primaryPhotoCards={props.primaryPhotoCards}
      videoCards={props.videoCards}
      addOnPhotoCards={props.addOnPhotoCards}
      floorPlanCards={props.floorPlanCards}
      values={props.values}
    />
    <PropertyDetailsPanel
      agents={props.agents}
      countries={props.countries}
      states={props.states}
      values={props.values}
    />
    <ShootInfoPanel
      values={props.values}
    />
    <CostSummaryPanel
      values={props.values}
      discount={props.discount}
      validPromoCode={props.validPromoCode}
      onApplyPromoCode={props.onApplyPromoCode}
    />
  </>
)

export default Step3
