// TODO mock data to remove
import mockData from '#veewme/lib/mockServiceCards'

import { ServiceCategory, ServiceType } from '#veewme/graphql/types'
import { UnreachableCaseError } from '#veewme/lib/error'
import { Card, PackageCard as PackageCardType, ServiceCard } from '#veewme/lib/types'
import { rgbaToString } from '#veewme/web/common/formikFields/colorField'
import InnerPanel from '#veewme/web/common/innerPanel/innerPanel'
import * as log from '#veewme/web/common/log'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import arrayMove from 'array-move'
import * as React from 'react'
import { getServiceCategoryIcon, getServiceTypeLabel } from '../common/util'
import Filters, { FiltersFormValues } from './filters'
import SortablePackageCardsList from './packagesList'
import { ServiceItemActionId } from './serviceItem'
import SortableServiceCardsList from './servicesList'

const StyledWrapper = styled.div `
  margin: 20px 0;
  user-select: none;
  & > div {
    margin: 20px 0 10px 0;
  }
`

const StyledInnerPanel = styled(InnerPanel) <{ category: ServiceCategory }> `
  margin: 20px 0 10px 0;
  & header {
      svg {fill: ${props => rgbaToString(props.category.color)}};
  }
`

const StyledSortablePackageCardsList = styled(SortablePackageCardsList) `
  margin-top: 16px;
`
interface ServiceTypeCards {
  [catId: number]: ServiceCard[]
}

interface ServiceTypePanelProps {
  categories: ServiceCategory[]
  serviceType: ServiceType
  serviceTypeCards: ServiceTypeCards
  onOrderChange: (categoryId: ServiceCategory['id'], oldIndex: number, newIndex: number) => void
  onActionClick: (card: Card, actionId: ServiceItemActionId, categoryId: ServiceCategory['id']) => void
}

const ServiceTypePanel: React.FunctionComponent<ServiceTypePanelProps> = props => (
  <Panel
    heading={getServiceTypeLabel(props.serviceType)}
    toggleable
  >
    {Object.keys(props.serviceTypeCards).map(catIdKey => {
      const catId = parseInt(catIdKey, 10)
      const category = props.categories.find(cat => cat.id === catId)
      if (category) {
        return (
          <StyledInnerPanel
            key={category.id}
            label={category.label}
            icon={getServiceCategoryIcon(category.icon)}
            category={category}
            toggleable
          >
            <SortableServiceCardsList
              axis='xy'
              category={category}
              serviceCards={props.serviceTypeCards[catId]}
              onActionClick={(card: Card, actionId: ServiceItemActionId) => props.onActionClick(card, actionId, category.id)}
              useDragHandle
              onSortEnd={({ oldIndex, newIndex }: {oldIndex: number, newIndex: number}) => {
                props.onOrderChange(catId, oldIndex, newIndex)
              }}
            />
          </StyledInnerPanel>
        )
      } else return null
    })}
  </Panel>
)

type ServiceTypeName = 'primaryCards' | 'addOnCards'

interface PanelsContainerState {
  serviceCategories: ServiceCategory[]
  packageCards: PackageCardType[]
  servicesCards: {
    primaryCards: ServiceTypeCards
    addOnCards: ServiceTypeCards
  }
}

class ServicesContainer extends React.PureComponent<{}, PanelsContainerState> {
  state: PanelsContainerState = {
    // TODO: load cards orders from server
    packageCards: mockData.packageCards,
    serviceCategories: mockData.serviceCategories,
    servicesCards: {
      addOnCards: mockData.addOnCards,
      primaryCards: mockData.primaryCards
    }
  }

  handleFiltersChange (values: FiltersFormValues) {
    log.debug('filters change - ', JSON.stringify(values))
  }

  handlePackageOrderChange = (oldIndex: number, newIndex: number) => {
    this.setState({
      packageCards: arrayMove(this.state.packageCards, oldIndex, newIndex)
    })
  }

  handleServiceCardsOrderChange = (serviceTypeName: ServiceTypeName, categoryId: ServiceCategory['id'], oldIndex: number, newIndex: number) => {
    this.setState(prevState => {
      const typeCards = prevState.servicesCards[serviceTypeName]
      typeCards[categoryId] = arrayMove(typeCards[categoryId], oldIndex, newIndex)
      return ({
        servicesCards: {
          ...prevState.servicesCards,
          [serviceTypeName]: typeCards
        }
      })
    })
    // TODO send cards orders to server
  }

  setCardSuspended = <T extends Card>(cards: T[], cardId: Card['id']): T[] => {
    const updateIndex = cards.findIndex(c => c.id === cardId)
    return (
      [
        ...cards.slice(0, updateIndex),
        {
          ...cards[updateIndex],
          suspended: !cards[updateIndex].suspended
        },
        ...cards.slice(updateIndex + 1)
      ]
    )
  }

  handlePackageCardAction = (cardId: Card['id'], actionId: ServiceItemActionId) => {
    switch (actionId) {
      case ServiceItemActionId.Suspend:
        this.setState(prevState => ({
          packageCards: this.setCardSuspended(prevState.packageCards, cardId)
        }))
        // TODO send cards to server
        break
      case ServiceItemActionId.Edit:
        break
      default: throw new UnreachableCaseError(actionId)
    }
  }

  handleServiceCardAction = (serviceTypeName: ServiceTypeName, cardId: Card['id'], actionId: ServiceItemActionId, categoryId: ServiceCategory['id']) => {
    log.debug('Clicked on action: ', ServiceItemActionId[actionId], ' on item ', cardId)
    switch (actionId) {
      case ServiceItemActionId.Suspend:
        this.setState(prevState => {
          const typeCards = { ...prevState.servicesCards[serviceTypeName] }
          typeCards[categoryId] = this.setCardSuspended(typeCards[categoryId], cardId)
          return ({
            servicesCards: {
              ...prevState.servicesCards,
              [serviceTypeName]: typeCards
            }
          })
        })
        // TODO send cards to server
        break
      case ServiceItemActionId.Edit:
        // TODO edit
        return
      default: throw new UnreachableCaseError(actionId)
    }
  }

  render () {
    return (
      <StyledWrapper>
        {this.state.packageCards &&
          <Panel
            heading={getServiceTypeLabel('Package')}
            toggleable
          >
            <Filters onChange={this.handleFiltersChange} />
            <StyledSortablePackageCardsList
              axis='xy'
              packageCards={this.state.packageCards}
              onActionClick={(card: Card, actionId: ServiceItemActionId) => {
                this.handlePackageCardAction(card.id, actionId)
              }}
              useDragHandle
              onSortEnd={({ oldIndex, newIndex }: {oldIndex: number, newIndex: number}) => {
                this.handlePackageOrderChange(oldIndex, newIndex)
              }}
            />
          </Panel>
        }
        {this.state.servicesCards.primaryCards &&
          <ServiceTypePanel
            categories={this.state.serviceCategories}
            serviceType={'Primary'}
            serviceTypeCards={this.state.servicesCards.primaryCards}
            onActionClick={(card: Card, actionId: ServiceItemActionId, categoryId: ServiceCategory['id']) => {
              this.handleServiceCardAction('primaryCards', card.id, actionId, categoryId)
            }}
            onOrderChange={(categoryId: ServiceCategory['id'], oldIndex: number, newIndex: number) =>
              this.handleServiceCardsOrderChange('primaryCards', categoryId, oldIndex, newIndex)
            }
          />
        }
        {this.state.servicesCards.addOnCards &&
          <ServiceTypePanel
            categories={this.state.serviceCategories}
            serviceType={'AddOn'}
            serviceTypeCards={this.state.servicesCards.addOnCards}
            onActionClick={(card: Card, actionId: ServiceItemActionId, categoryId: ServiceCategory['id']) => {
              this.handleServiceCardAction('addOnCards', card.id, actionId, categoryId)
            }}
            onOrderChange={(categoryId: ServiceCategory['id'], oldIndex: number, newIndex: number) =>
              this.handleServiceCardsOrderChange('addOnCards', categoryId, oldIndex, newIndex)
            }
          />
        }
      </StyledWrapper>
    )
  }
}

export default ServicesContainer
