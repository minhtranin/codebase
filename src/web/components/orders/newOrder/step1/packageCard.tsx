import { PackageCard as PackageCardType } from '#veewme/lib/types'
import * as React from 'react'
import CheckMarkSvg from '../../../../assets/svg/checkmark.svg'
import FormikCard, { FormikCardProps } from '../../../../common/formikFields/cardField'
import styled from '../../../../common/styled-components'

const StyledSubtitles = styled.div `
  height: 54px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const StyledSubtitleLine = styled.h5 `
  font-weight: 400;
  font-size: 15px;
  color: black;
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

const StyledService = styled.div `
  display: flex;
  align-items: center;
`

const StyledLabel = styled.p `
  display: inline-block;
  margin-left: 20px;
  font-weight: 500;
  color: black;
`

const StyledCheckMarkIcon = styled(CheckMarkSvg) `
  width: 20px;
  height: 16px;
  fill: ${props => props.theme.colors.GREEN};
`
const StyledPrice = styled.h4 `
  display: inline-block;
  margin: 0 10px;
  font-weight: 600;
  font-size: 26px;
  color: ${props => props.theme.colors.PACKAGE_CARD};
`

const StyledOldPrice = styled(StyledPrice) `
  color: ${props => props.theme.colors.GREY};
  text-decoration: line-through;
`

const StyledFooterContent = styled.div `
  display: flex;
  justify-content: space-around;
  align-items: center;
`

interface FooterContentProps {
  price: number
  oldPrice?: number
}

const FooterContent: React.FunctionComponent<FooterContentProps> = props => (
  <StyledFooterContent>
    {props.oldPrice && <StyledOldPrice>{'$ ' + props.oldPrice}</StyledOldPrice>}
    <StyledPrice>{'$ ' + props.price}</StyledPrice>
  </StyledFooterContent>
)

const StyledCard = styled(FormikCard) `
  width: 250px;
  height: 476px;
  border-color: ${props => props.theme.colors.GREEN};
  & header {
    background-color: ${props => props.theme.colors.GREEN};
  }
`

type PackageCardProps = PackageCardType & FormikCardProps

const PackageCard: React.FunctionComponent<PackageCardProps> = props => {
  const { form, field } = props
  return (
    <StyledCard
      field={field}
      form={form}
      id={props.id}
      title={props.title}
      footerContent={<FooterContent price={props.price} oldPrice={props.oldPrice}/>}
    >
      <StyledSubtitles>
        {props.subtitles.map((title, i) => (
          <StyledSubtitleLine key={i}>
            {title}
          </StyledSubtitleLine>)
        )}
      </StyledSubtitles>
      <StyledServicesWrapper>
        {props.services.map((service, i) => (
          <StyledService key={i}>
            <StyledCheckMarkIcon/>
            <StyledLabel>{service}</StyledLabel>
          </StyledService>)
        )}
      </StyledServicesWrapper>
    </StyledCard>
  )
}

export default PackageCard
