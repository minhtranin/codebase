import { Order } from '#veewme/graphql/types'
import EditSvg from '#veewme/web/assets/svg/edit.svg'
import ItemDataLine from '#veewme/web/common/orderListItem/itemDataLine'
import * as React from 'react'
import IconButton from '../buttons/iconButton'
import { ActionClickCallback, ActionId } from './common'
import { StyledCellEditIconContainer, StyledDataCell } from './styled'

interface DataCellProps {
  order: Order
  onActionClick: ActionClickCallback
}

const DataCell: React.FunctionComponent<DataCellProps> = props => (
  <StyledDataCell>
    <ItemDataLine
      title={props.order.sqfeet ? 'Sq.Ft: ' : 'Sq. Meters: '}
      value={String(props.order.surface)}
    />
    <ItemDataLine
      title={'Beds/Baths: '}
      value={String(props.order.beds) + '/' + String(props.order.baths)}
    />
    <ItemDataLine
      title={'Order ID: '}
      value={String(props.order.id)}
    />
    <ItemDataLine
      title={'Order date: '}
      value={String(props.order.date)}
    />
    <StyledCellEditIconContainer>
      <IconButton
        type='button'
        castAs='button'
        size='small'
        Icon={EditSvg}
        onClick={() => props.onActionClick(props.order.id, ActionId.EditDataCell)}
      />
    </StyledCellEditIconContainer>
  </StyledDataCell>
)

export default DataCell
