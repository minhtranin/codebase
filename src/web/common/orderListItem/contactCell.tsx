import { Order } from '#veewme/graphql/types'
import EditSvg from '#veewme/web/assets/svg/edit.svg'
import MailSvg from '#veewme/web/assets/svg/mail.svg'
import ItemDataLine from '#veewme/web/common/orderListItem/itemDataLine'
import { StyledNoteButton } from '#veewme/web/components/orders/orders/ordersListItem'
import * as React from 'react'
import { SpeakerNotes } from 'styled-icons/material'
import IconButton from '../buttons/iconButton'
import { ActionClickCallback, ActionId } from './common'
import { StyledAgentWrapper, StyledCellEditIconContainer, StyledContactCell, StyledIconWrapper } from './styled'

interface ContactCellProps {
  order: Order
  onActionClick: ActionClickCallback
}

const ContactCell: React.FunctionComponent<ContactCellProps> = props => (
  <StyledContactCell>
    <StyledAgentWrapper>
      <ItemDataLine
        title={'Agent: '}
        value={props.order.agent}
      />
      <StyledIconWrapper>
        <IconButton
          type='button'
          castAs='button'
          size='small'
          Icon={MailSvg}
          onClick={() => props.onActionClick(props.order.id, ActionId.ContactEmail)}
        />
      </StyledIconWrapper>
      <StyledIconWrapper>
        <StyledNoteButton
          type='button'
          castAs='button'
          size='small'
          Icon={SpeakerNotes}
          onClick={() => props.onActionClick(props.order.id, ActionId.ContactNote)}
        />
      </StyledIconWrapper>
    </StyledAgentWrapper>
    <ItemDataLine
      title={'Broker: '}
      value={props.order.broker}
    />
    <ItemDataLine
      title={'Office: '}
      value={props.order.officeTel}
    />
    <ItemDataLine
      title={'Mobile: '}
      value={props.order.mobileTel}
    />
    <StyledCellEditIconContainer>
      <IconButton
        type='button'
        castAs='button'
        size='small'
        Icon={EditSvg}
        onClick={() => props.onActionClick(props.order.id, ActionId.EditContactCell)}
      />
    </StyledCellEditIconContainer>
  </StyledContactCell>
)

export default ContactCell
