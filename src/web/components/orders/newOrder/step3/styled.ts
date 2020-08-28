import styled from '#veewme/web/common/styled-components'
import { ServicesConfig, ServiceType } from '../common'

export const StyledSelectedServiceHeader = styled.header`
  display: flex;
  justify-content: space-between;
`

export const StyledPrice = styled.h4 `
  display: inline-block;
  margin: 0 10px;
  font-weight: 600;
  font-size: 26px;
  color: ${props => props.theme.colors.GREEN};
`

export const StyledOldPrice = styled(StyledPrice)`
  color: ${props => props.theme.colors.GREY};
  text-decoration: line-through;
`

export const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledHeaderIconWrapper = styled.div<{ serviceType?: ServiceType }> `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.serviceType ? props.theme.colors[ServicesConfig[props.serviceType].color] : props.theme.colors.PACKAGE_CARD};
  border-radius: 50%;
  margin-right: 10px;
  & svg {
    fill: ${props => props.serviceType ? props.theme.colors[ServicesConfig[props.serviceType].color] : props.theme.colors.PACKAGE_CARD};
  }
`

export const StyledServiceTitle = styled.h5`
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.theme.colors.FIELD_TEXT};
`

export const StyledServiceSubtitle = styled.h6`
  font-weight: 500;
  font-size: 14px;
  margin-top: 5px;
  color: ${props => props.theme.colors.FIELD_TEXT};
`

export const StyledGreyTitle = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.GREY};
`

export const StyledService = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const StyledInlineWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
`

export const StyledPanelContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  & > :not(:first-child) {
    padding: 30px 0;
    border-top: 2px solid ${props => props.theme.colors.BORDER}
  }
  & > :first-child {
    padding-bottom: 30px;
  }

  & > :last-child {
    padding-bottom: 0;
  }
`

export const StyledDetail = styled.div`
  font-size: 13px;
  width: 100%;
`

export const StyledDetailLabel = styled.p`
  color: ${props => props.theme.colors.LABEL_TEXT};
`

export const StyledDetailContent = styled.p`
  margin-top: 12px;
  margin-bottom: 20px;
  font-weight: 700;
  color: ${props => props.theme.colors.FIELD_TEXT};
`
