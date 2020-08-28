import { Order, OrderService } from '#veewme/graphql/types'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { StatusClickCallback } from './common'
import ServiceItem from './serviceItem'
import { StyledServicesCell, StyledServicesList } from './styled'

interface ServicesCellProps {
  className?: string
  order: Order
  onServiceStatusClick: StatusClickCallback
}

const ServicesCell: React.FunctionComponent<ServicesCellProps> = props => (
  <StyledServicesCell className={props.className}>
    <Scrollbars>
      <StyledServicesList>
        {/* TODO remove cast */}
        {(props.order.services as OrderService[]).map(service => (
          <ServiceItem
            key={service.id}
            service={service}
            onStatusClick={() => props.onServiceStatusClick(props.order.id, service.id)}
          />
        ))}
      </StyledServicesList>
    </Scrollbars>
  </StyledServicesCell>
)

export default ServicesCell
