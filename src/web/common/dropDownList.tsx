import { Role } from '#veewme/gen/graphqlTypes'
import { UnreachableCaseError } from '#veewme/lib/error'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Link } from 'react-router-dom'

const StyledList = styled.div `
  position: absolute;
  right: 0;
  min-width: 75%;
  max-height: 300px;
  z-index: 100;
  border-radius: 0 0 5px 5px;
  border: 1px solid ${props => props.theme.colors.BUTTON_BORDER};
  background-color: ${props => props.theme.colors.HEADER_BACKGROUND};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const StyledScrollbars = styled(Scrollbars) `
  max-height: 300px;
`

const StyledListItemGroup = styled.li `
  width: 100%;
  border-top: 2px solid ${props => props.theme.colors.BUTTON_BORDER};
  & > :first-child {
    border-top: none;
  }
`

const StyledListItemGroupHeader = styled.ul `
  display: flex;
  align-items: center;
  padding: 8px 4px;
  background-color: ${props => props.theme.colors.BUTTON_BORDER};
  font-weight: 600;
  font-size: 11px;
`

type ListItemSize = 's' | 'm' | 'l'

const StyledListItem = styled.li<{ size: ListItemSize }> `
  ${props => {
    switch (props.size) {
      case 's':
        return `
          margin: 2px 0;
          padding: 4px 16px;
          font-size: 10px;
        `
      case 'm':
        return `
          margin: 4px 0;
          padding: 6px 16px;
          font-size: 11px;
        `
      case 'l':
        return `
          margin: 4px 0;
          padding: 8px 20px;
          font-size: 11px;
        `
      default:
        throw new UnreachableCaseError(props.size)
    }
  }}
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${props => props.theme.colors.GREEN};
    color: #fff;
  }
`

interface DropDownListItemBase {
  label: string
  visibleByRoles?: Role[]
}

export interface DropDownListItemAction extends DropDownListItemBase {
  onClick?: (e: React.MouseEvent) => void
}

export interface DropDownListItemLink extends DropDownListItemBase {
  linkTo: string
}

export type DropDownListItem = DropDownListItemLink | DropDownListItemAction

interface DropDownListGroupProps {
  header?: string
  items: DropDownListItem[]
  itemSize?: ListItemSize
  role?: Role
}

function isLink (item: DropDownListItem): item is DropDownListItemLink {
// TSLINT ISSUE: https://github.com/palantir/tslint/issues/3972
// tslint:disable-next-line: strict-type-predicates
  return (item as DropDownListItemLink).linkTo !== undefined
}

function isAction (item: DropDownListItem): item is DropDownListItemAction {
// TSLINT ISSUE: https://github.com/palantir/tslint/issues/3972
// tslint:disable-next-line: strict-type-predicates
  return (item as DropDownListItemAction).onClick !== undefined
}

const isVisibleByRole = (item: DropDownListItem, role?: Role): boolean => (
  !role ||
  !item.visibleByRoles ||
  item.visibleByRoles.includes(role)
)

const DropDownListGroup: React.FunctionComponent<DropDownListGroupProps> = ({ itemSize = 'l', ...props }) => (
  <StyledListItemGroup>
    {props.header &&
      <StyledListItemGroupHeader>
        {props.header}
      </StyledListItemGroupHeader>
    }
    <ul>
      {props.items.filter(item => isVisibleByRole(item, props.role)).map((item, key) => {
        if (isLink(item)) {
          return (
            <Link
              key={key}
              to={item.linkTo}
            >
              <StyledListItem
                size={itemSize}
              >
                {item.label}
              </StyledListItem>
            </Link>
          )
        } else if (isAction(item)) {
          return (
            <StyledListItem
              key={key}
              size={itemSize}
              onClick={item.onClick}
            >
              {item.label}
            </StyledListItem>
          )
        } else throw new UnreachableCaseError(item)
      })}
    </ul>
  </StyledListItemGroup>
)

export type DropDownListGroups = DropDownListGroupProps[]

interface DropDownListProps {
  list: DropDownListGroups
  className?: string
  role?: Role
  onListClick: (e: React.MouseEvent) => void
}

const DropDownList: React.FunctionComponent<DropDownListProps> = props => (
  <StyledList className={props.className}>
    <StyledScrollbars autoHeight>
      <ul onClick={props.onListClick}>
        {props.list.map((group, key) => (
          <DropDownListGroup
            key={key}
            header={group.header}
            items={group.items}
            itemSize={group.itemSize}
            role={props.role}
          />
        ))}
      </ul>
    </StyledScrollbars>
  </StyledList>
)

export default DropDownList
