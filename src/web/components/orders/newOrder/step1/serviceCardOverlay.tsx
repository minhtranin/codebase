import Overlay from '#veewme/web/common/overlay'
import * as React from 'react'
import styled from '../../../../common/styled-components'

const StyledOverlayContent = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 4px;
`

const StyledOverlayContentHeader = styled.div `
  font-weight: 700;
  font-size: 16px;
  color: ${props => props.theme.colors.GREEN};
  margin-bottom: 30px;
`

const StyledOverlayContentText = styled.div `
  font-weight: 500;
  font-size: 13px;
  color: white;
`

const StyledOverlay = styled(Overlay) `
  border-radius: 7px;
`

interface ServiceCardOverlayProps {
  onOkClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  onCancelClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ServiceCardOverlay: React.FunctionComponent<ServiceCardOverlayProps> = props => (
  <StyledOverlay onOkClick={props.onOkClick} onCancelClick={props.onCancelClick}>
    <StyledOverlayContent>
      <StyledOverlayContentHeader>
        <p>Please Note!</p>
      </StyledOverlayContentHeader>
      <StyledOverlayContentText>
        <p>Please re-check the square footage. Overages will be billed separately. Garages and basements are billable and not included in tax records.</p>
      </StyledOverlayContentText>
    </StyledOverlayContent>
  </StyledOverlay>
)

export default ServiceCardOverlay
