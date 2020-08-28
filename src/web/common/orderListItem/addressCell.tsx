import { Order } from '#veewme/graphql/types'
import MapPin from '#veewme/web/assets/svg/map-pin.svg'
import * as React from 'react'
import styled from '../styled-components'
import { StyledAddressCell, StyledAddressTitle } from './styled'

// https://developers.google.com/maps/documentation/urls/guide#constructing-valid-urls
const googleMapsSearchQuery = 'https://www.google.com/maps/search/?api=1&'

const StyledPinIcon = styled(props => <props.icon className={props.className}/>)`
  width: 20px;
  height: 20px;
  fill: ${props => props.theme.colors.LABEL_TEXT}
  &:hover {
    fill: ${props => props.theme.colors.MAP_PIN}
  }
`

interface AddressCellProps {
  order: Order
}

const AddressCell: React.FunctionComponent<AddressCellProps> = props => (
  <StyledAddressCell
  >
    <a
      target='_blank'
      href={googleMapsSearchQuery + encodeURIComponent(props.order.address)}
    >
      <StyledAddressTitle>
        {props.order.address}
      </StyledAddressTitle>
      <StyledPinIcon
        icon={MapPin}
      />
    </a>
  </StyledAddressCell>
)

export default AddressCell
