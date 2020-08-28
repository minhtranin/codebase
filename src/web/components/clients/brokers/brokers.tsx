import { Agent, Brokerage, BrokeragesQueryVariables, DeleteBrokerageMutation, DeleteBrokerageMutationVariables, Office, Region } from '#veewme/gen/graphqlTypes'
import { UnreachableCaseError } from '#veewme/lib/error'
import { Brokerages, DeleteBrokerage } from '#veewme/lib/graphql/queries'
import * as log from '#veewme/web/common/log'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { useMutation, useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import Pagination from '../../../common/footer/pagination'
import styled from '../../../common/styled-components'
import ClientPageWrapper from '../clientPageWrapper'
import * as TableItems from '../tableItems'
import BrokerItemView, { BrokerItemAction } from './brokerItem'
import Filters from './filters'
import ListHeader from './listHeader'

const NameCell = styled.col` width: 19%`
const AddressCell = styled.col` width: 29%`
const RegionCell = styled.col` width: 14%`
const CompanyPayCell = styled.col` width: 6%`
const SpecialPriceCell = styled.col` width: 6%`
const OfficesCell = styled.col` width: 5%`
const AgentsCell = styled.col` width: 5%`
const ActionsCell = styled.col` width: 7%`
const OfficesListCell = styled.col`width: 6%`
const MoreCell = styled.col`width: 3%`

export type BrokerageData =
  Pick<Brokerage,
    | 'id'
    | 'city'
    | 'companyName'
    | 'country'
    | 'state'
    | 'status'
    | 'street'
    | 'zip'
  > & {
    agents: Array<Pick<Agent, 'id'>>
    companyPay?: boolean
    offices: Array<Pick<Office, 'id'>>
    region: Pick<Region, 'label'>
    specialPricing?: boolean
  }

export interface BrokeragesQuery {
  brokerages: BrokerageData[]
}

const Brokers: React.FunctionComponent<{}> = () => {
  const { addToast } = useToasts()

  const [reverseSort, setReverseSort] = useState<boolean>(false)

  const { loading : loadingBrokerages, data } = useQuery<BrokeragesQuery, BrokeragesQueryVariables>(Brokerages,
    {
      onError: error => log.debug('Query Brokerages error:', error.message)
    }
  )

  const [deleteBrokerage, { loading: loadingDelete }] = useMutation<DeleteBrokerageMutation, DeleteBrokerageMutationVariables>(
    DeleteBrokerage,
    {
      awaitRefetchQueries: true,
      onCompleted: () => {
        addToast(
          `Brokerage was deleted successfully`,
          { appearance: 'success', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
      },
      onError: error => {
        addToast(
          `Error ${error.message} while deleting the brokerage`,
          { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
      },
      refetchQueries: ['Brokerages']
    }
  )

  const handleDeleteBrokerage = (id: Brokerage['id']) => {
    deleteBrokerage({
      variables: { id }
    }).catch(e => log.debug(e.message))
  }

  const handleAction = (action: BrokerItemAction, itemId: Brokerage['id']) => {
    switch (action) {
      case BrokerItemAction.Delete:
        handleDeleteBrokerage(itemId)
        break
      case BrokerItemAction.Edit:
        log.debug('Clicked on action Edit')
        break
      case BrokerItemAction.Suspend:
        log.debug('Clicked on action Suspend')
        break
      default: throw new UnreachableCaseError(action)
    }
  }

  const handleSort = () => {
    setReverseSort(!reverseSort)
  }

  const loading = loadingBrokerages || loadingDelete

  return (
    <>
      {loading &&
        <DotSpinnerModal
          isOpen={loading}
        />
      }
      {data && data.brokerages &&
        <ClientPageWrapper>
          <Filters onChange={vals => log.debug(vals)} />
          <TableItems.Table>
            <colgroup>
              <NameCell />
              <AddressCell />
              <RegionCell />
              <CompanyPayCell />
              <SpecialPriceCell />
              <OfficesCell />
              <AgentsCell />
              <ActionsCell />
              <OfficesListCell />
              <MoreCell />
            </colgroup>
            <ListHeader
              onSort={handleSort}
              reverseSort={reverseSort}
            />
            <tbody>
              {data.brokerages.map(brokerage => (
                <BrokerItemView
                  key={brokerage.id}
                  item={brokerage}
                  onActionClick={handleAction}
                />
              ))}
            </tbody>
          </TableItems.Table>
          <Pagination />
        </ClientPageWrapper>
      }
    </>
  )
}

export default Brokers
