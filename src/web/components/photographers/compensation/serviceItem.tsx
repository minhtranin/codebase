import { Service } from '#veewme/graphql/types'
import * as React from 'react'
import { StyledCell, StyledRow } from '../../../common/styledTable'

interface ServiceItemProps {
  service: Service
}

const ServiceItem: React.FunctionComponent<ServiceItemProps> = ({
  service
}) => {
  return (
    <StyledRow>
      <StyledCell>
        {service.name}
      </StyledCell>
      <StyledCell>
        {service.category}
      </StyledCell>
      <StyledCell>
        {service.serviceType}
      </StyledCell>
      <StyledCell>
        {service.region}
      </StyledCell>
      <StyledCell>
        {`${service.photographer.user.firstName} ${service.photographer.user.lastName}`}
      </StyledCell>
      <StyledCell>
        ${service.defaultPay}
      </StyledCell>
      <StyledCell>
        {service.photographerPay ? `$${service.photographerPay}` : ''}
      </StyledCell>
    </StyledRow>
  )
}

export default ServiceItem
