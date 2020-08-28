import ArrowSvg from '#veewme/web/assets/svg/arrow.svg'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'

const StyledButton = styled.div<{ current?: boolean }> `
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border-radius: 15px;
  background-color: ${props => props.current ? props.theme.colors.GREEN : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledPagination = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
`

type Direction = 'left' | 'right'

const StyledArrowButton = styled.div<{ direction: Direction }> `
  width: 30px;
  height: 30px;
  margin: 0 5px;
  border: 2px solid ${props => props.theme.colors.BORDER};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: rotate(${props => props.direction === 'left' ? '90deg' : '-90deg'});
  & svg {
    width: 15px;
    height: 15px;
    fill: ${props => props.theme.colors.BUTTON_ICON_HOVER}
  }
`

interface PageNumberButtonProps {
  id: number,
  label: string,
  current?: boolean,
  onClick?: (id: number) => void
}

const PageNumberButton: React.FunctionComponent<PageNumberButtonProps> = props => {
  const handleClick = () => {
    if (props.onClick) props.onClick(props.id)
  }

  return (
    <StyledButton current={props.current} onClick={handleClick}>
      <p>{props.label}</p>
    </StyledButton>
  )
}

export interface PaginationProps {
  totalRecords: number,
  pageLimit: number,
  maxButtons: number
  onPageChange?: (page: number) => void
}

interface PaginationState {
  currentPageId: number,
  totalPages: number,
  maxButtons: number
}

class Pagination extends React.PureComponent<PaginationProps, PaginationState> {
  static defaultProps = {
    maxButtons: 7,
    pageLimit: 30,
    totalRecords: 0
  }

  state: PaginationState = {
    currentPageId: 1,
    maxButtons: this.props.maxButtons,
    totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit)
  }

  pages: Array<{id: number, label: string}> = [
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
    { id: 4, label: '4' },
    { id: 5, label: '5' },
    { id: 6, label: '6' }
  ]

  handlePageClick = (id: number) => {
    this.setState({ currentPageId: id })
    if (this.props.onPageChange) this.props.onPageChange(id)
  }

  handleArrowLeftClick = () => {
    const page: number = Math.max((this.state.currentPageId - 1), 1)
    this.setState({
      currentPageId: page
    })
    if (this.props.onPageChange) this.props.onPageChange(page)
  }

  handleArrowRightClick = () => {
    const page: number = Math.min((this.state.currentPageId + 1), this.state.maxButtons)
    this.setState({
      currentPageId: page
    })
    if (this.props.onPageChange) this.props.onPageChange(page)
  }

  render () {
    return (
      <StyledPagination>
        <StyledArrowButton direction='left' onClick={this.handleArrowLeftClick}>
          <ArrowSvg/>
        </StyledArrowButton>
        {this.pages.map(page => (
          <PageNumberButton
            key={page.id}
            id={page.id}
            label={page.label}
            current={this.state.currentPageId === page.id}
            onClick={this.handlePageClick}
          />
        ))}
        <StyledArrowButton direction='right' onClick={this.handleArrowRightClick}>
          <ArrowSvg/>
        </StyledArrowButton>
      </StyledPagination>
    )
  }
}

export default Pagination
