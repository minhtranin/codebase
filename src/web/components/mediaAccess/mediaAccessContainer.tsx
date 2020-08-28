import { Order, OrdersComponent } from '#veewme/graphql/types'
import * as Grid from '#veewme/web/common/grid'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import * as React from 'react'
import MediaList from './mediaList'

const MediaAccess: React.FunctionComponent = () => {
  return (
    <Grid.PageContainer>
      <Grid.Header>Media</Grid.Header>
      <OrdersComponent>
        {({ data, loading, error }) => {
          const orders = data && data.orders ? data.orders as Order[] : []
          if (error) {
            return error.message
          }
          return (
            <>
              <MediaList orders={orders} />
              <DotSpinnerModal isOpen={loading} />
            </>
          )
        }}
      </OrdersComponent>
    </Grid.PageContainer>
  )
}

export default MediaAccess
