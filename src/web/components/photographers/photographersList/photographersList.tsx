import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { PaginationProps } from '../../../common/footer/pagination'
import ProfilesList from '../common/profilesList'
import { Photographer } from '../common/types'
import Filters, { FiltersFormValues } from './filters'

interface PhotographersListProps {
  photographers: Photographer[]
  onPinClick: (id: Photographer['id']) => void
  onSortClick: () => void
  isSortReverse: boolean
  onFiltersChange: (val: FiltersFormValues) => void
  paginationProps: PaginationProps
}

const PhotographersListView: React.FunctionComponent<PhotographersListProps> = props => (
  <>
    <Filters onChange={props.onFiltersChange} />
    <ProfilesList
      profiles={props.photographers} // TODO remove cast
      onPinClick={props.onPinClick}
      onSortClick={props.onSortClick}
      isSortReverse={props.isSortReverse}
      onDelete={id => log.debug(id)}
      {...props.paginationProps}
    />
  </>
)

export default PhotographersListView
