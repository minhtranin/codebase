import { ServiceCategory } from '#veewme/gen/graphqlTypes'
import { ServiceCard as ServiceCardType } from '#veewme/lib/types'
import Card from '#veewme/web/common/card'
import FlipCard from '#veewme/web/common/flipCard'
import { rgbaToString } from '#veewme/web/common/formikFields/colorField'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'
import { ServiceCardBackContent, ServiceCardFrontContent } from './serviceCardContent'
import { ServiceCardBackFooterContent, ServiceCardFrontFooterContent } from './serviceCardFooter'

const StyledServiceCardWrapper = styled.div`
  position: relative;
  margin: 6px;
`

const StyledFlipCard = styled(FlipCard) `
  width: 250px;
  height: 430px;
`

const StyledCardFront = styled(Card) <{ category: ServiceCategory, suspended?: boolean }> `
  height: 100%;
  background-color: white;
  border-color: ${props => props.suspended ? props.theme.colors.SUSPENDED : rgbaToString(props.category.color)};
  header {
    background-color: ${props => props.suspended ? props.theme.colors.SUSPENDED : rgbaToString(props.category.color)};
  }
  footer {
    svg {
      fill: ${props => props.suspended ? props.theme.colors.SUSPENDED : props.theme.colors.ICON_UNSELECTED};
    }
  }
  cursor: auto;
`

const StyledCardBack = styled(Card) <{ category: ServiceCategory, suspended?: boolean }> `
  height: 100%;
  background-color: white;
  border-color: ${props => props.suspended ? props.theme.colors.SUSPENDED : rgbaToString(props.category.color)};
  header {
    background-color: ${props => props.suspended ? props.theme.colors.SUSPENDED : rgbaToString(props.category.color)};
  }
  cursor: auto;
`

interface ServiceCardProps {
  className?: string
  category: ServiceCategory
  card: ServiceCardType
}

interface ServiceCardState {
  flipped: boolean
}

class ServiceCard extends React.PureComponent<ServiceCardProps, ServiceCardState> {
  state: ServiceCardState = {
    flipped: false
  }

  handleReadMoreClick = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ flipped: true })
  }

  handleFlipBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ flipped: false })
  }

  render () {
    const { card } = this.props
    return (
      <StyledServiceCardWrapper>
        <StyledFlipCard
          className={this.props.className}
          flipped={this.state.flipped}
          cardFront={
            <StyledCardFront
              id={card.id}
              category={this.props.category}
              suspended={card.suspended}
              title={card.title}
              footerContent={<ServiceCardFrontFooterContent
                category={this.props.category}
                price={'$ ' + card.price}
                suspended={card.suspended}
              />}
            >
              <ServiceCardFrontContent
                category={this.props.category}
                card={card}
                onReadMoreClick={this.handleReadMoreClick}
              />
            </StyledCardFront>
          }
          cardBack={
            <StyledCardBack
              id={card.id}
              category={this.props.category}
              title={card.title}
              suspended={card.suspended}
              footerContent={<ServiceCardBackFooterContent
                onClick={this.handleFlipBack}
                category={this.props.category}
                suspended={card.suspended}
              />}
            >
              <ServiceCardBackContent
                category={this.props.category}
                card={card}
              />
            </StyledCardBack>
          }
        />
      </StyledServiceCardWrapper>
    )
  }
}

export default ServiceCard
