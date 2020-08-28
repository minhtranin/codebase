// import { PhotographersQuery } from '#veewme/graphql/types'
import { Photographers } from '#veewme/lib/graphql/queries'
import * as log from '#veewme/web/common/log'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { Photographer } from '../common/types'
import { FiltersFormValues } from './filters'
import PhotographersListView from './photographersList'

const PhotographersListContainer: React.FunctionComponent<RouteComponentProps> = () => {
  const [isReverseSort, setSortOrder] = React.useState(false)
  const { addToast } = useToasts()

  const handlePinClick = (id: Photographer['id']) => {
    log.debug('Pin photographer action', id) //tslint:disable-line
  }

  const handleSort = () => {
    // here will be logic responsible for sending request for sorted data
    log.debug('sort')
    setSortOrder(prevState => !prevState)
  }

  const handlePageChange = (page: number) => {
    log.debug('page changed', page)
  }

  const handleFiltersChange = (values: FiltersFormValues) => {
    log.debug('filters change - ', JSON.stringify(values))
  }

  // pagination config values will be read from API response, hardcoded values are only temporary
  const paginationProps = {
    maxButtons: 7,
    onPageChange: handlePageChange,
    pageLimit: 10,
    totalRecords: 100
  }

  const { data, loading } = useQuery<{
    photographers: Photographer[]
  }>(
    Photographers,
    { onError: error => {
      addToast(error.message, { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 })
    }}
  )

  return (
    <>
      {loading &&
        <DotSpinnerModal
          isOpen={loading}
        />
      }
      {!loading && data &&
        <PhotographersListView
          photographers={data.photographers} // TODO remove cast
          onPinClick={handlePinClick}
          onSortClick={handleSort}
          isSortReverse={isReverseSort}
          onFiltersChange={handleFiltersChange}
          paginationProps={paginationProps}
        />
      }
    </>
  )
}

export default PhotographersListContainer
