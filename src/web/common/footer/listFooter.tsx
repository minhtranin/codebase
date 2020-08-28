import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import LegendBar, { LegendBarProps } from './legendBar'
import Pagination, { PaginationProps } from './pagination'

const StyledInfoBar = styled.div `
  min-height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.colors.TEXT};
  font-size: 11px;
`

const StyledPaginationBar = styled.div `
  min-height: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 3px solid ${props => props.theme.colors.BUTTON_BORDER};
`

const StyledFooter = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
`

type ListFooterProps = LegendBarProps & PaginationProps & { label?: string }

const ListFooter: React.FunctionComponent<ListFooterProps> = props => (
  <StyledFooter>
    <StyledInfoBar>
      <>
        {props.label &&
          <p>{props.label}</p>
        }
      </>
      <LegendBar statuses={props.statuses}/>
    </StyledInfoBar>
    <StyledPaginationBar>
      <Pagination
        totalRecords={props.totalRecords}
        pageLimit={props.pageLimit}
        onPageChange={props.onPageChange}
      />
    </StyledPaginationBar>
  </StyledFooter>
)

export default ListFooter
