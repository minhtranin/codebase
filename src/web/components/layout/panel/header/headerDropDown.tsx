import { Role } from '#veewme/gen/graphqlTypes'
import ArrowSvg from '#veewme/web/assets/svg/arrow.svg'
import DropDownList, { DropDownListGroups } from '#veewme/web/common/dropDownList'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import { HEADER_HEIGHT_PX } from '../constants'

const BUTTON_HEIGHT_PX = HEADER_HEIGHT_PX - 2

const DropDownWrapper = styled.div `
  position: relative;
  outline: none;
  border: none;
  min-height: ${BUTTON_HEIGHT_PX}px;
  height: 100%;
  background-color: ${props => props.theme.colors.HEADER_BACKGROUND};
  border-left: 1px solid ${props => props.theme.colors.BORDER};
`
const ButtonContainer = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
  border: none;
  outline: none;
  background: none;
`

const ButtonCaption = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 22px;
  height: ${BUTTON_HEIGHT_PX}px;
`

const StyledIcon = styled(props => <props.icon className={props.className}/>) `
  width: 36px;
  height: 36px;
  fill: ${props => props.theme.colors.ICON_UNSELECTED};
  &:hover, &:active {
    fill: ${props => props.theme.colors.ICON_HOVER};
  }
  ${ButtonContainer}:hover & {
    fill: ${props => props.theme.colors.BUTTON_ICON_HOVER};
  }
`

const StyledArrow = styled(ArrowSvg) `
  width: 20px;
  height: 12px;
  fill: ${props => props.theme.colors.ICON_UNSELECTED};
  &:hover, &:active {
    fill: ${props => props.theme.colors.ICON_HOVER};
  }
  ${ButtonContainer}:hover & {
    fill: ${props => props.theme.colors.BUTTON_ICON_HOVER};
  }
`

const StyledDropDown = styled(DropDownList) `
  max-height: unset !important;
  & > * {
    max-height: unset !important;
    & > * {
      max-height: unset !important;
    }
  }
`

interface HeaderDropDownProps {
  list: DropDownListGroups
  icon?: React.SVGFactory
  role?: Role
}

interface HeaderDropDownState {
  listOpen: boolean
}

export default class HeaderDropDown extends React.PureComponent<HeaderDropDownProps, HeaderDropDownState> {
  state: HeaderDropDownState = {
    listOpen: false
  }

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  mouseLeave = () => {
    this.setState(() => ({
      listOpen: false
    }))
  }

  render () {
    return (
      <DropDownWrapper onMouseLeave={this.mouseLeave}>
        <ButtonContainer onClick={this.toggleList}>
          {this.props.icon &&
            <StyledIcon icon={this.props.icon}/>
          }
          <ButtonCaption>
            {this.props.children}
          </ButtonCaption>
          <StyledArrow/>
        </ButtonContainer>
        {this.state.listOpen &&
          <StyledDropDown
            list={this.props.list}
            role={this.props.role}
            onListClick={this.toggleList}
          />
        }
      </DropDownWrapper>
    )
  }
}
