import InnerPanel from '#veewme/web/common/innerPanel/innerPanel'
import Panel from '#veewme/web/common/panel'
import { Field, FieldArray } from 'formik'
import * as React from 'react'
import styled from '../../../../common/styled-components'
import { ServiceCard as ServiceCardType, ServicesConfig, ServiceType } from '../common'
import ServiceCard from './serviceCard'

const StyledCardsContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    grid-template-columns: 1fr 1fr;
  }
`

const StyledInnerPanel = styled(InnerPanel) <{ serviceType: ServiceType }> `
  & header {
      svg {fill: ${props => props.theme.colors[ServicesConfig[props.serviceType].color]}};
  }
`

const StyledPanel = styled(Panel)`
  & ${StyledInnerPanel} {
    margin: 25px 0;
  }
`

export interface Service {
  serviceCards: ServiceCardType[]
  serviceType: ServiceType
}

interface ServicePanelProps {
  panelHeader: string
  services: Service[]
}

const ServicePanel: React.FunctionComponent<ServicePanelProps> = props => (
  <StyledPanel heading={props.panelHeader}>
    {props.services.map((service, i) => (
      <StyledInnerPanel
        key={i}
        label={ServicesConfig[service.serviceType].label}
        icon={ServicesConfig[service.serviceType].icon}
        itemsTotal={service.serviceCards.length}
        serviceType={service.serviceType}
        toggleable
      >
        <StyledCardsContainer>
          <FieldArray
            name={ServicesConfig[service.serviceType].formValueName}
            render={() => (
              service.serviceCards.map((card, j) => (
                <Field
                  key={card.id}
                  name={ServicesConfig[service.serviceType].formValueName + '.' + j}
                  component={ServiceCard}
                  serviceType={service.serviceType}
                  requireConfirm={ServicesConfig[service.serviceType].requireConfirm}
                  card={card}
                />
              ))
            )}
          />
        </StyledCardsContainer>
      </StyledInnerPanel>
    ))}
  </StyledPanel>
)

export default ServicePanel
