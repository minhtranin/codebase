import { Order } from '#veewme/graphql/types'
import { LegendStatus } from '#veewme/web/common/footer/legendBar'
import ListFooter from '#veewme/web/common/footer/listFooter'
import * as log from '#veewme/web/common/log'
import { getOrderLegendStatus } from '#veewme/web/common/status'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import Filters from './filters'
import MediaItem from './mediaItem'

export const Wrapper = styled.div`
  border-top: 2px solid ${props => props.theme.colors.BORDER};
`

export const StyledMediaList = styled.ul``

const statuses: LegendStatus[] = [
  getOrderLegendStatus('Published'),
  getOrderLegendStatus('Unpublished'),
  getOrderLegendStatus('MediaOnly')
]

interface MediaListProps {
  orders: Order[]
}

const MediaList: React.FunctionComponent<MediaListProps> = props => {
  const { orders } = props
  return (
    <Wrapper>
      <Filters onChange={val => log.debug(val)} />
      <StyledMediaList>
        {orders.map(order => <MediaItem key={order.id} order={order} />)}
      </StyledMediaList>
      <ListFooter
        label='Displaying last 30 days'
        statuses={statuses}
        totalRecords={100}
        pageLimit={10}
        maxButtons={7}
        onPageChange={page => log.debug(page)}
      />
    </Wrapper>
  )
}

export default MediaList
