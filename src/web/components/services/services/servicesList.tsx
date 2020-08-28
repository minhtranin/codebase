import { ServiceCategory } from '#veewme/gen/graphqlTypes'
import { Card, ServiceCard as ServiceCardType } from '#veewme/lib/types'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import ServiceCard from '../cards/serviceCard'
import SortableServiceItem, { ServiceItemActionId } from './serviceItem'

export const StyledListWrapper = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`

export interface ServiceCardsListProps {
  category: ServiceCategory
  serviceCards: ServiceCardType[]
  onActionClick: (card: Card, actionId: ServiceItemActionId) => void
}

const ServiceCardsList: React.FunctionComponent<ServiceCardsListProps> = props => (
  <StyledListWrapper>
    {props.serviceCards.map((card, index) => (
      <SortableServiceItem
        key={card.id}
        index={index}
        card={card}
        onActionClick={props.onActionClick}
      >
        <ServiceCard
          card={card}
          category={props.category}
        />
      </SortableServiceItem>
    ))}
  </StyledListWrapper>
)

const SortableServiceCardsList = SortableContainer(ServiceCardsList)

export default SortableServiceCardsList
