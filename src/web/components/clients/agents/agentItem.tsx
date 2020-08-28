import { AgentsQuery } from '#veewme/gen/graphqlTypes'
import { privateUrls } from '#veewme/lib/urls'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Globe } from 'styled-icons/boxicons-regular/Globe'
import { Home } from 'styled-icons/boxicons-regular/Home'
import { AddCircle } from 'styled-icons/material/AddCircle'
import { ImportantDevices } from 'styled-icons/material/ImportantDevices'
import { SpeakerNotes } from 'styled-icons/material/SpeakerNotes'
import CheckMarkSvg from '../../../assets/svg/checkmark.svg'
import MailSvg from '../../../assets/svg/mail.svg'
import Avatar from '../../../assets/svg/male-user.svg'
import X from '../../../assets/svg/x.svg'
import Button from '../../../common/buttons/basicButton'
import DropDownButton from '../../../common/buttons/dropDownButton'
import IconButton from '../../../common/buttons/iconButton'
import Modal from '../../../common/modal'
import styled from '../../../common/styled-components'
import { Cell, CellContentWrapper, Row } from '../tableItems'

const AgentCell = styled(props => <Cell {...props} />)`
  & > ${CellContentWrapper} {
    flex-wrap: nowrap;
    & > * {
      margin-bottom: 5px;
      margin-top: 5px;
    }
  }
`

const LastOrderDateCell = styled(props => <Cell {...props} />)`
  border-right-style: solid;
`

const NewOrderCell = styled(props => <Cell {...props} />)`
  border-right-style: none;
`

const MoreCell = styled(props => <Cell {...props} />)`
  & > ${CellContentWrapper} > * {
    justify-content: flex-end;
    flex-wrap: nowrap;
  }
`

const AvatarContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.BORDER};
  margin-right: 10px;
  flex-shrink: 0;
  & > * {
    object-fit: cover;
    width: 100%;
    height: 100%;
    fill: ${props => props.theme.colors.BUTTON_ICON};
  }
`

const AgentData = styled.div``

const AgentName = styled(Link)`
  margin-bottom: 5px;
  display: block;
  &:visited {
    color: ${props => props.theme.colors.FIELD_TEXT};
  }
  &:hover {
    color: ${props => props.theme.colors.GREEN};
  }
`

const AgentButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  & > * {
    margin-right: 10px;
  }
`

const GreenButton = styled(props => <IconButton {...props} />)`
  & svg {
    fill: ${props => props.theme.colors.GREEN}
  }
`

const InternalNoteButton = styled(props => <IconButton {...props} />)`
  & svg {
    fill: ${props => props.theme.colors.ORANGE}
  }
`

const CheckIcon = styled(CheckMarkSvg)`
  width: 16px;
  fill: ${props => props.theme.colors.GREEN};
  margin: auto;
`

const Xicon = styled(X)`
  width: 13px;
  fill: ${props => props.theme.colors.BORDER};
  margin: auto;
`

const DataParagraph = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`
const DataLabel = styled.div`
  color: ${props => props.theme.colors.TEXT};
  &::after {
    content: "\u2002";
  }
`
const DataContent = styled.div``

const AddOrderWrapper = styled.div`
  position: relative;
`
const OrderHome = styled(Home)``
const AddIcon = styled(AddCircle)`
  position: absolute;
  width: 60%;
  bottom: -20%;
  right: -20%;
`

const AddOrder: React.FunctionComponent = () => (
  <AddOrderWrapper>
    <OrderHome/>
    <AddIcon/>
  </AddOrderWrapper>
)

const DropdownStyled = styled(DropDownButton)`
  width: 100%;
  button {
    width: 100%;
    padding: 0 15px;
    background-color: transparent;
    border: none;
  }
`

const InternalNoteModal = styled(Modal)`
  color: ${props => props.theme.colors.FIELD_TEXT};
`

export interface AgentItemProps {
  agent: AgentsQuery['agents'][0]
  onDelete: () => void
  toggleStatus: () => void
}

const AgentItem: React.FunctionComponent<AgentItemProps> = props => {
  const [isOpen, toggleModal] = React.useState<boolean>(false)
  return (
    <>
      <Row>
        <AgentCell>
          <AvatarContainer><Avatar/></AvatarContainer>
          <AgentData>
            <AgentName to={`${privateUrls.agent}/${props.agent.id}`}>{props.agent.user.firstName} {props.agent.user.lastName}</AgentName>
            <AgentButtonsWrapper>
              <GreenButton to={`mailto:${props.agent.user.email}`} size='small' Icon={MailSvg} />
              {props.agent.website && <IconButton castAs='link' to={props.agent.website} size='small' Icon={Globe} />}
              {props.agent.internalNote &&
                <InternalNoteButton
                  onClick={() => toggleModal(prev => !prev)}
                  size='small'
                  Icon={SpeakerNotes}
                />
              }
            </AgentButtonsWrapper>
          </AgentData>
        </AgentCell>
        <Cell>
          {props.agent.brokerage ? (
            <>
              <DataParagraph>
                <DataContent>{props.agent.brokerage.companyName}</DataContent>
              </DataParagraph>
              <DataParagraph>
                <DataContent>
                  {props.agent.brokerage.city}, {props.agent.brokerage.state}, {props.agent.brokerage.zip}
                </DataContent>
              </DataParagraph>
            </>
          ) : <>-</>}
        </Cell>
        <Cell>
          <DataParagraph>
            <DataLabel>Office: </DataLabel>
            <DataContent>{props.agent.phone}</DataContent>
          </DataParagraph>
          { props.agent.phoneMobile &&
            <DataParagraph>
              <DataLabel>Mobile: </DataLabel>
              <DataContent>{props.agent.phoneMobile}</DataContent>
            </DataParagraph>
          }
        </Cell>
        <Cell>
          {props.agent.specialPricing ? <CheckIcon/> : <Xicon/>}
        </Cell>
        <Cell>
          {props.agent.companyPay ? <CheckIcon/> : <Xicon/>}
        </Cell>
        <Cell>{props.agent.region ? props.agent.region.label : '-'}</Cell>
        <LastOrderDateCell>
          -
        </LastOrderDateCell>
        <NewOrderCell>
          <GreenButton to='#' size='big' Icon={AddOrder} />
        </NewOrderCell>
        <Cell>
          <IconButton castAs='link' to='#' size='big' Icon={ImportantDevices} />
        </Cell>
        <Cell>
          <Button to='#' label='Orders' size='small' />
        </Cell>
        <MoreCell>
          <DropdownStyled
            list={[{
              items: [{
                label: 'Edit',
                linkTo: `${privateUrls.agent}/${props.agent.id}`
              }, {
                label: props.agent.status === 'ACTIVE' ? 'Suspend' : 'Activate',
                onClick: props.toggleStatus
              }, {
                label: 'Delete',
                onClick: props.onDelete
              }]
            }]}
          />
        </MoreCell>
      </Row>
      {props.agent.internalNote &&
        <InternalNoteModal
          title='Internal Note'
          isOpen={isOpen}
          onRequestClose={() => toggleModal(prev => !prev)}
        >
          {/*props.agent.internalNote.getCurrentContent().getPlainText()*/}
          Proin ut velit ullamcorper, cursus turpis vitae, luctus neque. Vestibulum elementum scelerisque tincidunt. Nunc quis ornare dolor. Ut posuere efficitur ex, nec mollis mi malesuada quis. Nullam in velit in ex suscipit dapibus. Nulla vitae accumsan mi. Sed facilisis tincidunt erat non elementum. Maecenas tempus a lorem vel dapibus. Nullam nec nisi sem.
        </InternalNoteModal>
      }
    </>
  )
}

export default AgentItem
