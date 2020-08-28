import { formatLines } from '#veewme/web/common/util'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import Truncate from 'react-truncate'
import styled from '../../../../common/styled-components'
import { ServicesConfig, ServiceType } from '../common'

const StyledCardContent = styled.div<{ serviceType: ServiceType }> `
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
  overflow: hidden;
  border-color: ${props => props.theme.colors[ServicesConfig[props.serviceType].color]};
  & svg {
    fill: ${props => props.theme.colors[ServicesConfig[props.serviceType].color]}
  }
`

const StyledImageWrapper = styled.div `
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 150px;
  justify-content: center;
`

const StyledIconWrapper = styled(StyledImageWrapper) `
  align-items: center;
`

const StyledIcon = styled(props => <props.icon className={props.className}/>) `
  width: 80px;
  height: 60px;
`

const StyledImage = styled.img `
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StyledTextWrapper = styled.div `
  flex: 1;
  margin: 20px 12px;
  position: relative;
`

const StyledScrollBar = styled(Scrollbars) `
  margin: 0;
  backface-visibility: hidden;
`

const StyledTruncateWrapper = styled.div `
`

const StyledReadMore = styled.span `
  color: ${props => props.theme.colors.BLUE};
`

interface ServiceCardContentProps {
  serviceType: ServiceType
  text: string
  image?: string
}

interface ServiceCardFrontContentProps extends ServiceCardContentProps {
  onReadMoreClick: (event: React.MouseEvent<HTMLSpanElement>) => void
}

export const ServiceCardFrontContent: React.FunctionComponent<ServiceCardFrontContentProps> = props => (
  <StyledCardContent serviceType={props.serviceType}>
    {props.image
      ? <StyledImageWrapper>
          <StyledImage src={props.image} alt='image for the service'/>
        </StyledImageWrapper>
      : <StyledIconWrapper>
          <StyledIcon icon={ServicesConfig[props.serviceType].icon}/>
        </StyledIconWrapper>
    }
    <StyledTextWrapper>
      <StyledTruncateWrapper>
        <Truncate
          lines={4}
          ellipsis={<span>... <StyledReadMore onClick={props.onReadMoreClick}>Read More</StyledReadMore></span>}
        >
          {formatLines(props.text)}
        </Truncate>
      </StyledTruncateWrapper>
    </StyledTextWrapper>
  </StyledCardContent>
)

export const ServiceCardBackContent: React.FunctionComponent<ServiceCardContentProps> = props => (
  <StyledCardContent serviceType={props.serviceType}>
    <StyledTextWrapper>
      <StyledScrollBar autoHeight={true} autoHeightMax={260}>
        {formatLines(props.text)}
      </StyledScrollBar>
    </StyledTextWrapper>
  </StyledCardContent>
)
