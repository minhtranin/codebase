import Panel from '#veewme/web/common/panel'
import * as React from 'react'
import styled from '../../../../common/styled-components'
import { AllServicesCards, NewOrderValues } from '../common'
import SelectedPackage from './selectedPackage'
import SelectedService from './selectedService'

const StyledServicesWrapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: stretch;
  & > :not(:first-child) {
    padding: 30px 0;
    border-top: 2px solid ${props => props.theme.colors.BORDER}
  }
  & > :first-child {
    padding-bottom: 30px;
  }
`

interface CustomProps {
  values: NewOrderValues
}

type SelectedServicesPanelProps = CustomProps & AllServicesCards

const SelectedServicesPanel: React.FunctionComponent<SelectedServicesPanelProps> = props => {

  const packageCard = props.packageCards.find(card => card.id === props.values.packageCardId)
  const primaryPhotoCards = props.primaryPhotoCards.filter(card => (props.values.primaryPhotoCardIds.indexOf(card.id) > -1) && card)
  const videoCards = props.videoCards.filter(card => (props.values.videoCardIds.indexOf(card.id) > -1) && card)
  const addOnPhotoCards = props.addOnPhotoCards.filter(card => (props.values.addOnPhotoCardIds.indexOf(card.id) > -1) && card)
  const floorPlanCards = props.floorPlanCards.filter(card => (props.values.floorPlanCardIds.indexOf(card.id) > -1) && card)

  return (
    <Panel heading='Selected Service(s)'>
      <StyledServicesWrapper>
        {packageCard &&
          <SelectedPackage card={packageCard}/>
        }
        {primaryPhotoCards.length > 0 &&
          primaryPhotoCards.map((card, key) => (
            <SelectedService key={key} card={card} serviceType='primaryPhoto'/>
          ))
        }
        {videoCards.length > 0 &&
          videoCards.map((card, key) => (
            <SelectedService key={key} card={card} serviceType='video'/>
          ))
        }
        {addOnPhotoCards.length > 0 &&
          addOnPhotoCards.map((card, key) => (
            <SelectedService key={key} card={card} serviceType='addOnPhoto'/>
          ))
        }
        {floorPlanCards.length > 0 &&
          floorPlanCards.map((card, key) => (
            <SelectedService key={key} card={card} serviceType='floorPlan'/>
          ))
        }
      </StyledServicesWrapper>
    </Panel>
  )
}

export default SelectedServicesPanel
