import styled from '#veewme/web/common/styled-components'

export const StyledHelpWrapper = styled.div `
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 5px;
`

export const StyledRedSpanHeader = styled.header `
  width: 100%;
  & span {
    color: ${props => props.theme.colors.ALERT};
  }
`

export const StyledBold = styled.span `
    font-weight: 700;
`

export const StyledGreenBold = styled(StyledBold) `
    color: ${props => props.theme.colors.GREEN};
`

export const StyledFooter = styled.footer `
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 3px solid ${props => props.theme.colors.BORDER};
  padding: 20px;
  font-weight: 600;
  font-size: 14px;
`

export const StyledFooterText = styled.p `
  color: ${props => props.theme.colors.LABEL_TEXT};
`

export const StyledFooterSpan = styled.span `
  color: black;
`
