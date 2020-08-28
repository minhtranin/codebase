import { ServiceCard as ServiceCardType } from '#veewme/lib/types'
import Card from '#veewme/web/common/card'
import FormikFlipCard from '#veewme/web/common/formikFields/flipCardField'
import { FieldProps } from 'formik'
import * as React from 'react'
import styled from '../../../../common/styled-components'
import { ServicesConfig, ServiceType } from '../common'
import { ServiceCardBackContent, ServiceCardFrontContent } from './serviceCardContent'
import { ServiceCardBackFooterContent, ServiceCardFrontFooterContent } from './serviceCardFooter'
import ServiceCardOverlay from './serviceCardOverlay'

const StyledServiceCardWrapper = styled.div`
  position: relative;
  margin: 6px;
`

const StyledFormikFlipCard = styled(FormikFlipCard) <{ serviceType: ServiceType }> `
  width: 250px;
  height: 430px;
`

const StyledCardFront = styled(Card) <{ serviceType: ServiceType }> `
  height: 100%;
  border-color: ${props => props.theme.colors[ServicesConfig[props.serviceType].color]};
  header {
    background-color: ${props => props.theme.colors[ServicesConfig[props.serviceType].color]};
  }
  footer {
    svg {
      fill: ${props => props.theme.colors.ICON_UNSELECTED};
    }
  }
`

const StyledCardBack = styled(Card) <{ serviceType: ServiceType }> `
  height: 100%;
  border-color: ${props => props.theme.colors[ServicesConfig[props.serviceType].color]};
  header {
    background-color: ${props => props.theme.colors[ServicesConfig[props.serviceType].color]};
  }
`

interface CustomProps {
  className?: string
  serviceType: ServiceType
  card: ServiceCardType
  requireConfirm?: boolean
}

type ServiceCardProps = CustomProps & FieldProps

interface ServiceCardState {
  flipped: boolean
  confirmed: boolean
  showOverlay: boolean
}

class ServiceCard extends React.PureComponent<ServiceCardProps, ServiceCardState> {
  static defaultProps = {
    requireConfirm: false
  }

  state: ServiceCardState = {
    confirmed: false,
    flipped: false,
    showOverlay: false
  }

  setValue = () => {
    const value = this.props.field.value === this.props.card.id ? '' : this.props.card.id
    this.props.form.setFieldValue(this.props.field.name, value)
  }

  confirm = () => {
    if (!this.state.confirmed) {
      this.setState({ showOverlay: true })
    } else {
      this.setState({
        confirmed: !this.state.confirmed
      }, () => this.setValue())
    }
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

  handleOkClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    this.setValue()
    this.setState({
      confirmed: true,
      showOverlay: false
    })
  }

  handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    this.setState({
      confirmed: false,
      showOverlay: false
    })
  }

  render () {
    const { form, field, card } = this.props
    return (
      <StyledServiceCardWrapper>
        <StyledFormikFlipCard
          field={field}
          form={form}
          className={this.props.className}
          serviceType={this.props.serviceType}
          flipped={this.state.flipped}
          id={card.id}
          confirmCallback={this.props.requireConfirm ? this.confirm : undefined}
          cardFront={
            <StyledCardFront
              id={card.id}
              serviceType={this.props.serviceType}
              title={card.title}
              footerContent={<ServiceCardFrontFooterContent serviceType={this.props.serviceType} price={'$ ' + card.price} />}
            >
              <ServiceCardFrontContent
                serviceType={this.props.serviceType}
                text={card.text}
                image={card.image}
                onReadMoreClick={this.handleReadMoreClick}
              />
            </StyledCardFront>
          }
          cardBack={
            <StyledCardBack
              id={card.id}
              serviceType={this.props.serviceType}
              title={card.title}
              footerContent={<ServiceCardBackFooterContent onClick={this.handleFlipBack} serviceType={this.props.serviceType} />}
            >
              <ServiceCardBackContent
                serviceType={this.props.serviceType}
                text={card.text}
              />
            </StyledCardBack>
          }
        />
        {this.state.showOverlay &&
          <ServiceCardOverlay onOkClick={this.handleOkClick} onCancelClick={this.handleCancelClick} />
        }
      </StyledServiceCardWrapper>
    )
  }
}

export default ServiceCard
