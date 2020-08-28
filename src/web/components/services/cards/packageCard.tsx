import { PackageCard as PackageCardType } from '#veewme/lib/types'
import CheckMarkSvg from '#veewme/web/assets/svg/checkmark.svg'
import Card from '#veewme/web/common/card'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'

const StyledSubtitles = styled.div<{ suspended?: boolean }> `
  height: 54px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${props => props.suspended ? props.theme.colors.SUSPENDED : 'black'};
`

const StyledSubtitleLine = styled.h5 `
  font-weight: 400;
  font-size: 15px;
  margin: 4px 0;
`

const StyledServicesWrapper = styled.div `
  flex: 1;
  height: 246px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 12px;
  margin-bottom: 12px;
  font-size: 12px;
  & > div {
    margin: 6px 0;
  }
  & :first-child {
    margin-top: 0;
  }
`

const StyledService = styled.div<{ suspended?: boolean }> `
  display: flex;
  align-items: center;
  & p {
    color: ${props => props.suspended ? props.theme.colors.SUSPENDED : 'black'};
  }
  & svg {
    fill: ${props => props.suspended ? props.theme.colors.SUSPENDED : props.theme.colors.GREEN};
  }
`

const StyledLabel = styled.p `
  display: inline-block;
  margin-left: 20px;
  font-weight: 500;
`

const StyledCheckMarkIcon = styled(CheckMarkSvg) `
  width: 20px;
  height: 16px;
`

const StyledPrice = styled.h4<{ suspended?: boolean }> `
  display: inline-block;
  margin: 0 10px;
  font-weight: 600;
  font-size: 26px;
  color: ${props => props.suspended ? props.theme.colors.SUSPENDED : props.theme.colors.PACKAGE_CARD};
`

const StyledOldPrice = styled(StyledPrice) `
  color: ${props => props.suspended ? props.theme.colors.SUSPENDED : props.theme.colors.GREY};
  text-decoration: line-through;
`

const StyledFooterContent = styled.div `
  display: flex;
  justify-content: space-around;
  align-items: center;
`

interface FooterContentProps {
  card: PackageCardType
  currency: string
}

const FooterContent: React.FunctionComponent<FooterContentProps> = props => (
  <StyledFooterContent>
    {props.card.oldPrice && <StyledOldPrice suspended={props.card.suspended}>{props.currency + ' ' + props.card.oldPrice}</StyledOldPrice>}
    <StyledPrice suspended={props.card.suspended}>{props.currency + ' ' + props.card.price}</StyledPrice>
  </StyledFooterContent>
)

const StyledCard = styled(Card)<{ suspended?: boolean }> `
  margin: 0 6px;
  width: 250px;
  background-color: white;
  border-color: ${props => props.suspended ? props.theme.colors.SUSPENDED : props.theme.colors.GREEN};
  & header {
    background-color: ${props => props.suspended ? props.theme.colors.SUSPENDED : props.theme.colors.GREEN};
  }
`

interface PackageCardProps {
  card: PackageCardType
  currency?: string
}

const PackageCard: React.FunctionComponent<PackageCardProps> = ({ currency = '$', ...props }) => {
  return (
    <StyledCard
      id={props.card.id}
      title={props.card.title}
      suspended={props.card.suspended}
      footerContent={<FooterContent
        card={props.card}
        currency={currency}
      />}
    >
      <StyledSubtitles suspended={props.card.suspended}>
        {props.card.subtitles.map((subtitle, i) => (
          <StyledSubtitleLine key={i}>
            {subtitle}
          </StyledSubtitleLine>)
        )}
      </StyledSubtitles>
      <StyledServicesWrapper>
        {props.card.services.map((service, i) => (
          <StyledService
            key={i}
            suspended={props.card.suspended}
          >
            <StyledCheckMarkIcon/>
            <StyledLabel>{service}</StyledLabel>
          </StyledService>)
        )}
      </StyledServicesWrapper>
    </StyledCard>
  )
}

export default PackageCard
