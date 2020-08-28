import { Service, ServicesComponent } from '#veewme/graphql/types'
import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Pagination, { PaginationProps } from '../../../common/footer/pagination'
import { SortButton } from '../../../common/sortButton'
import styled from '../../../common/styled-components'
import { StyledHeaderCell, StyledTable } from '../../../common/styledTable'
import Filters, { FiltersFormValues } from './filters'
import ServiceItem from './serviceItem'

const StyledTableWrapper = styled.div`
  max-width: 100%;
  margin: 30px -1px;
  border: 1px solid ${props => props.theme.colors.TEXT};
  border-top-width: 0;
  border-radius: 5px;
  overflow: hidden;

  th:nth-last-child(2) {
    width: 110px;
  }

  th:last-child {
    width: 165px;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    table th {
      padding: 10px;
    }
  }
`

interface HeaderSortCellProps {
  label: string
  columnName: string
  sortColumn: string
  onSortClick: (columnName: string) => void
  isSortReverse: boolean
}

const HeaderSortCell: React.FunctionComponent<HeaderSortCellProps> = props => {
  const activeColumn = props.columnName === props.sortColumn
  return (
    <StyledHeaderCell
      onClick={() => props.onSortClick(props.columnName)}
      activeSort={activeColumn}
    >
      <span >
        {props.label}
        <SortButton
          active={activeColumn}
          reverse={activeColumn && props.isSortReverse}
        />
      </span>
    </StyledHeaderCell>
  )
}

interface CompensationTableViewProps {
  services: Service[]
  onSortClick: (columnName: string) => void
  isSortReverse: boolean
  sortColumn: string
  onFiltersChange: (val: FiltersFormValues) => void
}

const CompensationTableView: React.FunctionComponent<CompensationTableViewProps & PaginationProps> = ({
  services,
  totalRecords,
  onPageChange,
  pageLimit,
  ...props
}) => (
  <>
    <Filters onChange={props.onFiltersChange} />
    <StyledTableWrapper>
      <StyledTable>
        <tbody>
          <tr>
            <HeaderSortCell
              columnName='service'
              label='Service/Product name'
              {...props}
            />
            <HeaderSortCell
              columnName='category'
              label='Category'
              {...props}
            />
            <HeaderSortCell
              columnName='serviceType'
              label='Service type'
              {...props}
            />
            <HeaderSortCell
              columnName='region'
              label='Region'
              {...props}
            />
            <HeaderSortCell
              columnName='photographer'
              label='Photographer'
              {...props}
            />
            <StyledHeaderCell>
              Default pay
            </StyledHeaderCell>
            <StyledHeaderCell>
              Photographer pay
            </StyledHeaderCell>
          </tr>
          {services.map(service => (
            <ServiceItem service={service} key={service.id} />
          ))}
        </tbody>
      </StyledTable>
    </StyledTableWrapper>
    <Pagination
      totalRecords={totalRecords}
      pageLimit={pageLimit}
      onPageChange={onPageChange}
    />
  </>
)

// This component will be responsible for loading data and some other logic
// TODO:  When gets bigger and more complex should be moved to separate file
interface CompensationTableContainerState {
  reverseSort: boolean,
  sortColumnName: string
}

class CompensationTableContainer extends React.PureComponent<RouteComponentProps, CompensationTableContainerState> {
  state = {
    reverseSort: false,
    sortColumnName: 'name'
  }

  handleSort = (columnName: string) => {
    // here will be logic responsible for sending request for sorted data
    log.debug('sort', columnName)
    this.setState(prevState => ({
      // toggle sort order only if currently sorted column is clicked
      reverseSort: columnName === prevState.sortColumnName ? !prevState.reverseSort : false,
      sortColumnName: columnName
    }))
  }

  handlePageChange = (page: number) => {
    log.debug('page changed', page)
  }

  handleFiltersChange = (values: FiltersFormValues) => {
    log.debug('filters change - ', JSON.stringify(values))
  }

  render () {
    // pagination config values will be read from API response, hardcoded values are only temporrary
    const paginationProps = {
      maxButtons: 7,
      onPageChange: this.handlePageChange,
      pageLimit: 10,
      totalRecords: 100
    }

    return (
      <ServicesComponent>
        {({ data, loading }) => (
          <>
            {loading && <div>Loading...</div>}
            {!loading && data &&
              <CompensationTableView
                services={data.services as Service[]} // TODO remove cast
                onSortClick={(columnName: string) => this.handleSort(columnName)}
                sortColumn={this.state.sortColumnName}
                isSortReverse={this.state.reverseSort}
                onFiltersChange={this.handleFiltersChange}
                {...paginationProps}
              />
            }
          </>
        )}
      </ServicesComponent>
    )
  }
}

export default CompensationTableContainer
