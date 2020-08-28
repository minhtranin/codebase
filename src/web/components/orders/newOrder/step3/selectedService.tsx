import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import Truncate from 'react-truncate'
import { ServiceCard, ServicesConfig, ServiceType } from '../common'
import { StyledGreyTitle, StyledHeaderIconWrapper, StyledPrice, StyledSelectedServiceHeader, StyledService, StyledServiceSubtitle, StyledServiceTitle, StyledTitleWrapper } from './styled'

const MAX_TRUNCATED_LINES = 1

const StyledHeaderIcon = styled(props => <props.icon className={props.className}/>)`
  width: 20px;
  height: 18px;
`

const StyledContentWrapper = styled.div`
  margin-top: 20px;
  padding-right: 20px;
  font-size: 13px;
  font-weight: 500;
  color: ${props => props.theme.colors.FIELD_TEXT};
`

const StyledTruncateWrapper = styled.div`
  width: 100%;
`

export const StyledServicePrice = styled(StyledPrice)<{ serviceType?: ServiceType }> `
  color: ${props => props.serviceType ? props.theme.colors[ServicesConfig[props.serviceType].color] : props.theme.colors.PACKAGE_CARD};
`

const StyledReadMore = styled.button`
  margin-top: 12px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${props => props.theme.colors.BLUE};
  cursor: pointer;
`

interface SelectedServiceProps {
  card: ServiceCard
  serviceType: ServiceType
  onReadMoreClick?: (event: React.MouseEvent<HTMLSpanElement>) => void
}

interface SelectedServiceState {
  truncated: boolean,
  expanded: boolean
}

class SelectedService extends React.PureComponent<SelectedServiceProps, SelectedServiceState> {
  state: SelectedServiceState = {
    expanded: false,
    truncated: false
  }

  handleTruncate = (truncated: boolean) => {
    if (this.state.truncated !== truncated) {
      this.setState({ truncated })
    }
  }

  toggleLines = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render () {
    const { expanded, truncated } = this.state
    return (
      <StyledService>
        <StyledSelectedServiceHeader>
          <StyledTitleWrapper>
            <StyledHeaderIconWrapper serviceType={this.props.serviceType}>
              <StyledHeaderIcon icon={ServicesConfig[this.props.serviceType].icon} />
            </StyledHeaderIconWrapper>
            <div>
              <StyledServiceTitle>{this.props.card.title}<StyledGreyTitle>{` (${ServicesConfig[this.props.serviceType].category})`}</StyledGreyTitle></StyledServiceTitle>
              <StyledServiceSubtitle>{ServicesConfig[this.props.serviceType].label}</StyledServiceSubtitle>
            </div>
          </StyledTitleWrapper>
          <div>
            <StyledServicePrice serviceType={this.props.serviceType}>${this.props.card.price}</StyledServicePrice>
          </div>
        </StyledSelectedServiceHeader>
        <StyledContentWrapper>
          <StyledTruncateWrapper>
            <Truncate
              lines={expanded ? false : MAX_TRUNCATED_LINES}
              ellipsis={<span>... </span>}
              onTruncate={this.handleTruncate}
            >
              {this.props.card.text}
            </Truncate>
          </StyledTruncateWrapper>
          {truncated && !expanded &&
            <StyledReadMore onClick={this.toggleLines}>Read More</StyledReadMore>
          }
          {!truncated && expanded &&
            <StyledReadMore onClick={this.toggleLines}>Show Less</StyledReadMore>
          }
        </StyledContentWrapper>
      </StyledService>
    )
  }
}

export default SelectedService
