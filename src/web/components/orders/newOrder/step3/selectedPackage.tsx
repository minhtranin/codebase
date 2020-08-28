import { PackageCard } from '#veewme/lib/types'
import CheckmarkSvg from '#veewme/web/assets/svg/checkmark.svg'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import { ServicesConfig, ServiceType } from '../common'
import { StyledGreyTitle, StyledHeaderIconWrapper, StyledOldPrice, StyledPrice, StyledSelectedServiceHeader, StyledService, StyledServiceSubtitle, StyledServiceTitle } from './styled'

const StyledHeaderIcon = styled(props => <props.icon className={props.className} />)`
  width: 20px;
  height: 18px;
`

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledPackagePrice = styled(StyledPrice)<{ serviceType?: ServiceType }> `
  color: ${props => props.serviceType ? props.theme.colors[ServicesConfig[props.serviceType].color] : props.theme.colors.PACKAGE_CARD};
`

const StyledPackageHeaderIconWrapper = styled(StyledHeaderIconWrapper)`
  border-color: ${props => props.theme.colors.PACKAGE_CARD};
  & svg {
    fill: ${props => props.theme.colors.PACKAGE_CARD};
  }
`

const StyledPackageServiceIcon = styled(props => <props.icon className={props.className}/>)`
  width: 22px;
  height: 20px;
`

const StyledPackageServicesList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`

const StyledPackageService = styled.li`
  flex: 1 1 48%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  margin: 5px 0;
  color: ${props => props.theme.colors.FIELD_TEXT};
  & svg {
    fill: ${props => props.theme.colors.PACKAGE_CARD};
    margin-right: 10px;
  }
`

interface SelectedPackageProps {
  card: PackageCard
}

const SelectedPackage: React.FunctionComponent<SelectedPackageProps> = props => (
  <StyledService>
    <StyledSelectedServiceHeader>
      <StyledTitleWrapper>
        <StyledPackageHeaderIconWrapper>
          <StyledHeaderIcon icon={CheckmarkSvg} />
        </StyledPackageHeaderIconWrapper>
        <div>
          <StyledServiceTitle>{props.card.title}<StyledGreyTitle> (Package)</StyledGreyTitle></StyledServiceTitle>
          <StyledServiceSubtitle>{props.card.subtitles.join(' ')}</StyledServiceSubtitle>
        </div>
      </StyledTitleWrapper>
      <div>
        {props.card.oldPrice &&
          <StyledOldPrice>${props.card.oldPrice}</StyledOldPrice>
        }
        <StyledPackagePrice>${props.card.price}</StyledPackagePrice>
      </div>
    </StyledSelectedServiceHeader>
    <StyledPackageServicesList>
      {props.card.services.map((service, key) => (
        <StyledPackageService key={key}>
          <StyledPackageServiceIcon icon={CheckmarkSvg} />
          {service}
        </StyledPackageService>
      ))}
    </StyledPackageServicesList>
  </StyledService>
)

export default SelectedPackage
