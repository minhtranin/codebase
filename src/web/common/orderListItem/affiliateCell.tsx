import { Order } from '#veewme/graphql/types'
import EditSvg from '#veewme/web/assets/svg/edit.svg'
import IconButton from '#veewme/web/common/buttons/iconButton'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import { ActionClickCallback, ActionId } from './common'
import ItemDataLine from './itemDataLine'
import { StyledCell, StyledCellEditIconContainer } from './styled'

const StyledAffiliateCell = styled(StyledCell) `
  position: relative;
  grid-area: affiliate;
  border-right: 1px dashed ${props => props.theme.colors.INFO_BORDER};
  padding-right: 26px;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    padding-bottom: 0;
  }
`

interface AffiliateCellProps {
  className?: string
  order: Order
  onActionClick: ActionClickCallback
}

// TODO replace mock data with proper data from order
const AffiliateCell: React.FunctionComponent<AffiliateCellProps> = props => (
  <StyledAffiliateCell className={props.className}>
    <ItemDataLine
      title='Affiliate: '
      value='Properties NYC'
    />
    <ItemDataLine
      title='City: '
      value='New York'
    />
    <ItemDataLine
      title='State/Zip: '
      value='New York/12110'
    />
    <ItemDataLine
      title='Country: '
      value='United States'
    />
    <StyledCellEditIconContainer>
      <IconButton
        type='button'
        castAs='button'
        size='small'
        Icon={EditSvg}
        onClick={() => props.onActionClick(props.order.id, ActionId.EditAffiliateCell)}
      />
    </StyledCellEditIconContainer>
  </StyledAffiliateCell>
)

export default AffiliateCell
