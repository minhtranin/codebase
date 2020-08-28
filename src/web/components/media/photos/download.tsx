import * as React from 'react'
import { memo, useCallback, useState } from 'react'
import Arrow from '../../../assets/svg/arrow.svg'
import Button from '../../../common/buttons/basicButton'
import styled from '../../../common/styled-components'

const StyledDropdown = styled.div`
  position: relative;
`

const List = styled.ul `
  position: absolute;
  right: 0;
  width: 100%;
  z-index: 100;
  border-radius: 0 0 5px 5px;
  border: 1px solid ${props => props.theme.colors.BUTTON_BORDER};
  background-color: ${props => props.theme.colors.HEADER_BACKGROUND};
`

const ListItem = styled.li`
  font-weight: 500;
  font-size: 12px;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;

  a {
    display: block;
    margin: 5px 0;
    padding: 10px 20px;
    color: ${props => props.theme.colors.FIELD_TEXT};

    &:hover,
    &:active {
      background-color: ${props => props.theme.colors.GREEN};
      color: #fff;
    }
  }
`

const Download: React.FunctionComponent<{}> = () => {
  const [visible, setDropdownVisibility] = useState(false)
  const toggleDropdown = useCallback(() => setDropdownVisibility(prev => !prev), [])
  const closeDropdown = useCallback(() => setDropdownVisibility(false), [])

  const downloadOptions = (
    <List onClick={toggleDropdown}>
      <ListItem>
        <a href='#' download target='_blank'>Print</a>
      </ListItem>
      <ListItem>
        <a href='#' download target='_blank'>Web</a>
      </ListItem>
    </List>
  )
  return (
    <StyledDropdown onMouseLeave={closeDropdown}>
      <Button
        buttonTheme='primary'
        label='Download'
        type='button'
        icon={Arrow}
        iconLast={true}
        onClick={toggleDropdown}
      />
      {visible && downloadOptions}
    </StyledDropdown>
  )
}

export default memo(Download)
