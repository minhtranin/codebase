import { PackageCard as PackageCardType } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import { Field } from 'formik'
import * as React from 'react'
import Step1Carousel from '../../../../common/carousel/carousel'
import Panel from '../../../../common/panel'
import styled from '../../../../common/styled-components'
import { FormValues } from '../newOrderForm'
import PackageCard from './packageCard'

const StyledCarouselPanel = styled(Panel)`
  margin: 30px 0;
  padding: 0;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    margin: 6px 0;
    padding: 0;
    > div {
      padding: 0 10px;
    }
  }
`

const StyledCarouselWrapper = styled.div `
  display: flex;
  justify-content: center;
  /* padding: 20px 0; */
`

const StyledCardWrapper = styled.div `
  margin: 0 6px;
`

const StyledComment = styled.div `
  margin: 20px;
  p {
    font-weight: 500;
    font-size: 14px;
    color: ${props => props.theme.colors.SIDEBAR_ICON};
  }
`

const StyledCarousel = styled(Step1Carousel)`
  min-width: 870px;
  width: 870px;
  height: 530px;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    min-width: 608px;
    width: 608px;
  }
`

export interface PackagesPanelProps {
  values: FormValues
  packageCards: PackageCardType[]
}

const PackagesPanel: React.FunctionComponent<PackagesPanelProps> = props => {
  const getActiveIndicators = () => {
    const card = props.packageCards.find(pc => pc.id === props.values.packageCardId)
    if (card) {
      return [props.packageCards.indexOf(card)]
    } else {
      return []
    }
  }

  return(
    <StyledCarouselPanel heading='Select Package'>
      <StyledCarouselWrapper>
        <StyledCarousel
          showIndicator
          activeIndicators={getActiveIndicators()}
        >
          {props.packageCards.map((card, i) => (
            <StyledCardWrapper key={i}>
              <Field
                name={nameof<FormValues>('packageCardId')}
                component={PackageCard}
                id={card.id}
                value={props.values.packageCardId}
                title={card.title}
                subtitles={card.subtitles}
                services={card.services}
                price={card.price}
                oldPrice={card.oldPrice}
              />
            </StyledCardWrapper>
          ))}
        </StyledCarousel>
      </StyledCarouselWrapper>
      <StyledComment>
        <p>Order a la carte below</p>
      </StyledComment>
    </StyledCarouselPanel>
  )
}

export default PackagesPanel
