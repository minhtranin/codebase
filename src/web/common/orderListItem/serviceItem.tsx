import { OrderService, OrderServiceStatus } from '#veewme/graphql/types'
import { UnreachableCaseError } from '#veewme/lib/error'
import CheckMarkSvg from '#veewme/web/assets/svg/checkmark.svg'
import MsgSvg from '#veewme/web/assets/svg/msg.svg'
import styled from '#veewme/web/common/styled-components'
import Tooltipped from '#veewme/web/common/tooltipped'
import { getServiceCategoryIcon } from '#veewme/web/components/services/common/util'
import * as React from 'react'
import { rgbaToString } from '../formikFields/colorField'
import { StyledOrderItemText } from './styled'

const StyledItem = styled.div `
  width: 100%;
  font-size: 13px;
  margin: 5px 0 3px 0;
  display: flex;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    margin: 3px 0 2px 0;
  }
`

const StyledCell = styled.div<{ completed?: boolean }> `
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${props => props.completed ? props.theme.colors.TEXT_UNSELECTED : props.theme.colors.TEXT_SELECTED};
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    padding: 0 5px;
  }
`

const StyledNameCell = styled(StyledCell) `
  flex: 1;
  min-width: 0;
  margin-right: 10px;
`

const StyledCategoryCell = styled(StyledCell) `
  flex: 0 0 26px;
`

const StyledDateCell = styled(StyledCell) `
  flex: 0 0 70px;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    padding: 0 5px;
    flex: 0 0 60px;
  }
`

const StyledTimeCell = styled(StyledCell) `
  flex: 0 0 65px;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    flex: 0 0 60px;
  }
`

const StyledUnassignedText = styled(StyledOrderItemText) `
  color: ${props => props.theme.colors.ALERT}
`

const StyledMessageCell = styled(StyledCell) `
  flex: 0 0 26px;
`

const StyledCategoryIcon = styled(props => <props.icon className={props.className}/>) `
  width: 16px;
  height: 15px;
  fill: ${props => rgbaToString(props.category.color)};
`

const StyledStatusIcon = styled(props => <props.icon className={props.className}/>)<{ status: OrderServiceStatus }> `
  width: 16px;
  height: 15px;
  fill: ${props => {
    if (props.status === 'Completed') {
      return props.theme.colors.OK
    } else if (props.status === 'Message') {
      return props.theme.colors.ALERT
    } else {
      return props.theme.colors.ICON_UNSELECTED
    }
  }};
  cursor: ${props => props.status === 'Message' ? 'pointer' : 'default'}
`

const getServiceStatusIcon = (status: OrderServiceStatus) => {
  switch (status) {
    case 'Completed':
      return CheckMarkSvg
    case 'Todo':
      return
    case 'Message':
      return MsgSvg
    default:
      throw new UnreachableCaseError(status)
  }
}

interface OrderServiceItemProps {
  service: OrderService
  onStatusClick?: () => void
}

const ServiceItem: React.FunctionComponent<OrderServiceItemProps> = props => {
  const { service: { category, date, time, photographer } } = props
  const handleStatusClick = () => {
    if (props.onStatusClick) {
      props.onStatusClick()
    }
  }

  return (
    <StyledItem>
      <StyledNameCell>
        {photographer
          ?
          <StyledOrderItemText>
            {photographer.user.firstName} {photographer.user.lastName}
          </StyledOrderItemText>
          :
          <StyledUnassignedText>
            Unassigned
          </StyledUnassignedText>
        }
      </StyledNameCell>
      <StyledCategoryCell>
        <Tooltipped tooltip={props.service.name}>
          <div>
            <StyledCategoryIcon
              icon={getServiceCategoryIcon(category.icon)}
              category={category}
            />
          </div>
        </Tooltipped>
      </StyledCategoryCell>
      <StyledDateCell>
        <StyledOrderItemText>
          {date}
        </StyledOrderItemText>
      </StyledDateCell>
      <StyledTimeCell>
        <StyledOrderItemText>
          {time}
        </StyledOrderItemText>
      </StyledTimeCell>
      <StyledMessageCell>
        {props.service.status !== 'Todo' &&
          <div
            onClick={props.service.status === 'Message' ? handleStatusClick : undefined}
          >
            <StyledStatusIcon
              icon={getServiceStatusIcon(props.service.status)}
              status={props.service.status}
            />
          </div>
        }
      </StyledMessageCell>
    </StyledItem>
  )
}

export default ServiceItem
