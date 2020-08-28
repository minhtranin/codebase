// import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { PaginationProps } from '../../../common/footer/pagination'
import ProfilesList from '../common/profilesList'
import { Processor } from '../common/types'
import Filters, { FiltersFormValues } from './filters'

interface ProcessorsListProps {
  processors: Processor[]
  onPinClick: (id: Processor['id']) => void
  onSortClick: () => void
  isSortReverse: boolean
  paginationProps: PaginationProps
  onDelete: (id: Processor['id']) => void
  onFiltersChange: (val: FiltersFormValues) => void
}

const ProcessorsListView: React.FunctionComponent<ProcessorsListProps> = props => (
  <>
    <Filters onChange={props.onFiltersChange} />
    <ProfilesList
      profiles={props.processors} // TODO remove cast
      onPinClick={props.onPinClick}
      onSortClick={props.onSortClick}
      isSortReverse={props.isSortReverse}
      onDelete={props.onDelete}
      role='Processor'
      {...props.paginationProps}
    />
  </>
)

export default ProcessorsListView
