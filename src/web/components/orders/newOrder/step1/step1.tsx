import * as React from 'react'
import { AllServicesCards } from '../common'
import { FormValues } from '../newOrderForm'
import PackagesPanel from './packagesPanel'
import ServicePanel from './servicePanel'

interface CustomProps {
  values: FormValues
}

type Step1Props = CustomProps & AllServicesCards

const Step1: React.FunctionComponent<Step1Props> = props => (
  <>
    <PackagesPanel
      packageCards={props.packageCards}
      values={props.values}
    />
    <ServicePanel
      panelHeader='Select Primary Services'
      services={[
        {
          serviceCards: props.primaryPhotoCards,
          serviceType: 'primaryPhoto'
        },
        {
          serviceCards: props.videoCards,
          serviceType: 'video'
        }
      ]}
    />
    <ServicePanel
      panelHeader='Select Add On Services'
      services={[
        {
          serviceCards: props.addOnPhotoCards,
          serviceType: 'addOnPhoto'
        },
        {
          serviceCards: props.floorPlanCards,
          serviceType: 'floorPlan'
        }
      ]}
    />
  </>
)

export default Step1
