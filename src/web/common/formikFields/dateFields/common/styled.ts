import styled from '#veewme/web/common/styled-components'

export const StyledDateFieldWrapper = styled.div `
  position: relative;
  outline: none;
  font-size: 13px;
`

export const LeftChevronWrapper = styled.div`
  position: absolute;
  left: 4px;
  top: 5px;
`

export const RightChevronWrapper = styled.div`
  position: absolute;
  right: 4px;
  top: 5px;
`

export const StyledDateSelectOptionsWrapper = styled.div `
  position: absolute;
  display: flex;
  right: 0px;
  z-index: 10;
  max-height: 300px;
  border: 1px solid ${props => props.theme.colors.BUTTON_BORDER};
  background-color: ${props => props.theme.colors.HEADER_BACKGROUND};
  border-radius: 0 0 5px 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
