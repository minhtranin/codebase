import { DeleteProcessor, Processors } from '#veewme/lib/graphql/queries'
import * as log from '#veewme/web/common/log'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { useMutation, useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { Processor } from '../common/types'
import { FiltersFormValues } from './filters'
import ProcessorsListView from './processorsList'

const ProcessorsListContainer: React.FunctionComponent<RouteComponentProps> = () => {
  const [isReverseSort, setSortOrder] = React.useState(false)
  const { addToast } = useToasts()

  const handlePinClick = (id: Processor['id']) => {
    log.debug('Pin action', id) //tslint:disable-line
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
    log.debug('Filters change - ', JSON.stringify(values))
  }

  // pagination config values will be read from API response, hardcoded values are only temporary
  const paginationProps = {
    maxButtons: 7,
    onPageChange: handlePageChange,
    pageLimit: 10,
    totalRecords: 100
  }

  const { data, loading: loadingData } = useQuery<{
    processors: Processor[]
  }>(
    Processors,
    {
      onError: error => {
        addToast(error.message, { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 })
      }
    }
  )

  const [ deleteProcessor, { loading: deleting } ] = useMutation<{}, {
    id: Processor['id']
  }>(
    DeleteProcessor,
    {
      awaitRefetchQueries: true,
      onCompleted: () => {
        addToast('Processor has been deleted', { appearance: 'success', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 })
      },
      onError: error => {
        addToast(error.message, { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 })
      },
      refetchQueries: ['Processors']
    }
  )

  const loading = loadingData || deleting

  return (
    <>
      {loading &&
        <DotSpinnerModal
          isOpen={loading}
        />
      }
      {data &&
        <ProcessorsListView
          processors={data.processors} // TODO remove cast
          onPinClick={handlePinClick}
          onSortClick={handleSort}
          isSortReverse={isReverseSort}
          paginationProps={paginationProps}
          onFiltersChange={handleFiltersChange}
          onDelete={id => deleteProcessor({ variables: { id } })}
        />
      }
    </>
  )
}

export default ProcessorsListContainer
