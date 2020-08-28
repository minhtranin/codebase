import { ServiceCategory } from '#veewme/gen/graphqlTypes'
import { ServiceCard } from '#veewme/lib/types'
import { rgbaToString } from '#veewme/web/common/formikFields/colorField'
import styled from '#veewme/web/common/styled-components'
import { formatLines } from '#veewme/web/common/util'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import Truncate from 'react-truncate'
import { getServiceCategoryIcon } from '../common/util'

const StyledCardContent = styled.div<{ category: ServiceCategory, suspended?: boolean }> `
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
  overflow: hidden;
  color: ${props => props.suspended ? props.theme.colors.SUSPENDED : 'inherit'};
  & svg {
    fill: ${props => props.suspended ? props.theme.colors.SUSPENDED : rgbaToString(props.category.color)}
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

const StyledImage = styled.img<{ suspended?: boolean }> `
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${props => props.suspended ? 'grayscale(100%) opacity(30%)' : 'none'}
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

const StyledReadMore = styled.span<{ suspended?: boolean }> `
  color: ${props => props.suspended ? props.theme.colors.SUSPENDED : props.theme.colors.BLUE};
  cursor: ${props => props.suspended ? 'default' : 'pointer'}
`

interface ServiceCardContentProps {
  category: ServiceCategory
  card: ServiceCard
}

interface ServiceCardFrontContentProps extends ServiceCardContentProps {
  onReadMoreClick: (event: React.MouseEvent<HTMLSpanElement>) => void
}

export const ServiceCardFrontContent: React.FunctionComponent<ServiceCardFrontContentProps> = props => (
  <StyledCardContent
    category={props.category}
    suspended={props.card.suspended}
  >
    {props.card.image
      ? <StyledImageWrapper>
          <StyledImage suspended={props.card.suspended} src={props.card.image} alt='image for the service'/>
        </StyledImageWrapper>
      : <StyledIconWrapper>
          <StyledIcon icon={props.category.icon && getServiceCategoryIcon(props.category.icon)}/>
        </StyledIconWrapper>
    }
    <StyledTextWrapper>
      <StyledTruncateWrapper>
        <Truncate
          lines={4}
          ellipsis={
            <span>...
              <StyledReadMore
                onClick={props.card.suspended ? undefined : props.onReadMoreClick}
                suspended={props.card.suspended}
              >
                Read More
              </StyledReadMore>
            </span>
          }
        >
          {formatLines(props.card.text)}
        </Truncate>
      </StyledTruncateWrapper>
    </StyledTextWrapper>
  </StyledCardContent>
)

export const ServiceCardBackContent: React.FunctionComponent<ServiceCardContentProps> = props => (
  <StyledCardContent
    category={props.category}
    suspended={props.card.suspended}
  >
    <StyledTextWrapper>
      <StyledScrollBar autoHeight={true} autoHeightMax={260}>
        {formatLines(props.card.text)}
      </StyledScrollBar>
    </StyledTextWrapper>
  </StyledCardContent>
)
