import { Brokerage } from '#veewme/gen/graphqlTypes'
import { privateUrls } from '#veewme/lib/urls'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ImportantDevices } from 'styled-icons/material/ImportantDevices'
import { Settings } from 'styled-icons/octicons/Settings'
import CheckMarkSvg from '../../../assets/svg/checkmark.svg'
import X from '../../../assets/svg/x.svg'
import Button from '../../../common/buttons/basicButton'
import DropDownButton from '../../../common/buttons/dropDownButton'
import IconButton from '../../../common/buttons/iconButton'
import styled from '../../../common/styled-components'
import { Cell, CellContentWrapper, Row } from '../tableItems'
import { BrokerageData } from './brokers'

const OfficesCell = styled(props => <Cell {...props} />)`
  & > ${CellContentWrapper} {
    justify-content: center;
  }
`
const AgentsCell = styled(props => <Cell {...props} />)`
  & > ${CellContentWrapper} {
    justify-content: center;
  }
`
const ActionsCell = styled(props => <Cell {...props} />)`
  & > ${CellContentWrapper} {
    flex-wrap: nowrap;
    & > *:not(:last-child) {
      margin-right: 15px;
    }
  }
`

const EditBrokerage = styled(Link)`
${props => props.theme.colors.FIELD_TEXT};
  &:visited {
    color: ${props => props.theme.colors.FIELD_TEXT};
  }
  &:hover {
    color: ${props => props.theme.colors.GREEN};
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

const DropdownStyled = styled(DropDownButton)`
  width: 100%;
  button {
    width: 100%;
    padding: 0 15px;
    background-color: transparent;
    border: none;
  }
`

const links = {
  editBrokerage: '#',
  officesList: '#',
  tourPreferences: '#',
  toursList: '#',
  toursListByOffice: '#'
}

export enum BrokerItemAction {
  Delete,
  Edit,
  Suspend
}

export interface BrokerItemViewProps {
  item: BrokerageData
  onActionClick: (action: BrokerItemAction, id: Brokerage['id']) => void
}

const BrokerItemView: React.FunctionComponent<BrokerItemViewProps> = props => {
  const { item } = props

  const actionOptions = [{
    items: [{
      label: 'Edit',
      linkTo: `${privateUrls.brokerages}/${props.item.id}`
    }, {
      label: 'Suspend',
      onClick: () => props.onActionClick(BrokerItemAction.Suspend, item.id)
    }, {
      label: 'Delete',
      onClick: () => props.onActionClick(BrokerItemAction.Delete, item.id)
    }]
  }]

  return (
    <Row>
      <Cell><EditBrokerage to={links.editBrokerage}>{item.companyName}</EditBrokerage></Cell>
      <Cell>
        {item.street}, {item.city}, {item.state}, {item.zip}
      </Cell>
      <Cell>{item.region && item.region.label}</Cell>
      <Cell>
        {item.companyPay ? <CheckIcon/> : <Xicon/>}
      </Cell>
      <Cell>
        {item.specialPricing ? <CheckIcon/> : <Xicon/>}
      </Cell>
      <OfficesCell>{item.offices.length}</OfficesCell>
      <AgentsCell>{item.agents.length}</AgentsCell>
      <ActionsCell>
        <IconButton castAs='link' to={links.tourPreferences} size='big' Icon={Settings} />
        <IconButton castAs='link' to={links.toursListByOffice} size='big' Icon={ImportantDevices} />
      </ActionsCell>
      <Cell>
        <Button to={links.officesList} label='Offices' size='small' />
      </Cell>
      <Cell>
        <DropdownStyled list={actionOptions} />
      </Cell>
    </Row>
  )
}

export default BrokerItemView
