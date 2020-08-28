import { Card, PackageCard as PackageCardType } from '#veewme/lib/types'
import * as React from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import PackageCard from '../cards/packageCard'
import SortableServiceItem, { ServiceItemActionId } from './serviceItem'
import { StyledListWrapper } from './servicesList'

export interface PackageCardsListProps {
  className?: string
  packageCards: PackageCardType[]
  onActionClick: (card: Card, actionId: ServiceItemActionId) => void
}

const PackageCardsList: React.FunctionComponent<PackageCardsListProps> = props => (
  <StyledListWrapper className={props.className}>
    {props.packageCards.map((card, index) => (
      <SortableServiceItem
        key={card.id}
        index={index}
        card={card}
        onActionClick={props.onActionClick}
      >
        <PackageCard
          card={card}
        />
      </SortableServiceItem>
    ))}
  </StyledListWrapper>
)

const SortablePackageCardsList = SortableContainer(PackageCardsList)

export default SortablePackageCardsList
