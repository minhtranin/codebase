import { Card } from '#veewme/lib/types'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import { SortableHandle } from 'react-sortable-hoc'
import { SortableElement } from 'react-sortable-hoc'
import { Move, Pause } from 'styled-icons/boxicons-regular'
import { Edit } from 'styled-icons/boxicons-solid'
import { StyledIcon } from 'styled-icons/types'

const StyledServiceWrapper = styled.li `
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`

const StyledActionsContainer = styled.div `
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  & > * {
    &:hover {
      outline: 1px solid ${props => props.theme.colors.BORDER};
    }
  }
`

const StyledActionButton = styled.button `
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 12px;
  outline: none;
  border: none;
  background: transparent;
  color: ${props => props.theme.colors.LABEL_TEXT};
  cursor: pointer;
  & svg {
    fill: ${props => props.theme.colors.LABEL_TEXT};
  }
`

const StyledIcon = styled(props => <props.icon className={props.className}/>) `
  width: 16px;
  height: 16px;
  margin-right: 4px;
`

const StyledMoveIcon = styled(Move)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  fill: ${props => props.theme.colors.LABEL_TEXT};
`

const StyledSortHandle = styled.div `
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 12px;
  background: transparent;
  color: ${props => props.theme.colors.LABEL_TEXT};
  cursor: pointer;
`

interface ActionButtonProps {
  label: string
  icon: React.SVGFactory | StyledIcon
  onClick?: () => void
}

export const ActionButton: React.FunctionComponent<ActionButtonProps> = props => (
  <StyledActionButton onClick={props.onClick}>
    <StyledIcon icon={props.icon}/>
    <p>{props.label}</p>
  </StyledActionButton>
)

const SortHandle = SortableHandle(() => (
  <StyledSortHandle>
    <StyledMoveIcon/>
    <p>move</p>
  </StyledSortHandle>
))

export enum ServiceItemActionId {
  Suspend,
  Edit
}

interface ServiceItemProps {
  card: Card
  onActionClick: (card: Card, action: ServiceItemActionId) => void
}

const ServiceItem: React.FunctionComponent<ServiceItemProps> = props => (
  <StyledServiceWrapper>
    {props.children}
    <StyledActionsContainer>
      <SortHandle/>
      <ActionButton
        label={props.card.suspended ? 'unsuspend' : 'suspend'}
        icon={Pause}
        onClick={() => props.onActionClick(props.card, ServiceItemActionId.Suspend)}
      />
      <ActionButton
        label='edit'
        icon={Edit}
        onClick={() => props.onActionClick(props.card, ServiceItemActionId.Edit)}
      />
    </StyledActionsContainer>
  </StyledServiceWrapper>
)

const SortableServiceItem = SortableElement<ServiceItemProps>(ServiceItem)

export default SortableServiceItem
