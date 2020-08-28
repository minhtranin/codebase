import { Card, HomeSizeUnit, LatLng, Location, LotSizeUnit, Occupancy, PromoCode } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import { BreadcrumbNavigation } from '#veewme/web/common/breadcrumbs/breadcrumbNavigation'
import * as Grid from '#veewme/web/common/grid'
import * as log from '#veewme/web/common/log'
import { addressToLatLng } from '#veewme/web/common/map'
import styled from '#veewme/web/common/styled-components'
import { EditorState } from 'draft-js'
import { Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { AllServicesCards, NewOrderValues, ServiceCard } from './common'
import StepFooter from './footer'
import Step1 from './step1/step1'
import Step2, { Step2FieldsProps } from './step2/step2'
import Step3 from './step3/step3'
import Step4 from './step4/step4'

export const LAST_STEP = 3

export type FormValues = {
  amenityToAdd: string
  promoCodeToCheck: string
} & NewOrderValues

const StyledGridLeftAside = styled(Grid.LeftAside) `
  & > nav {
    @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) and (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XXL}) {
      & > div:first-child > div:first-child > div:first-child {display: flex;}
    }
  }
`

type CustomProps = {
  promoCodes: PromoCode[]
  onSubmit: (values: FormValues) => void
} & AllServicesCards & Step2FieldsProps

type NewOrderFormViewProps = FormikProps<FormValues> & CustomProps

interface NewOrderFormViewState {
  discount: number
  validPromoCode: boolean
}

class ScrollToTopOnMount extends React.Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return null
  }
}

class NewOrderFormView extends React.PureComponent<NewOrderFormViewProps, NewOrderFormViewState> {
  state: NewOrderFormViewState = {
    discount: 0,
    validPromoCode: false
  }

  getServicesPrice = (serviceCards: ServiceCard[], selectedCardIds: Array<Card['id']>) => {
    return serviceCards.reduce((sum, card) => {
      if (selectedCardIds.includes(card.id)) {
        sum += card.price
      }
      return sum
    }, 0)
  }

  getPromoCode = (code: string, promoCodes?: PromoCode[]) => {
    if (promoCodes) {
      return promoCodes.find(pc => pc.code === code)
    } else return
  }

  getDiscount = (price: number, promoCode: PromoCode) => {
    if (promoCode.discountType === 'amount') {
      return promoCode.discount // TODO check if discount is greater than price?
    } else {
      return price * promoCode.discount / 100
    }
  }

  getOrderTotal = (values: FormValues) => {
    let total: number = 0
    if (values.packageCardId) {
      total += this.props.packageCards.filter(card => card.id === values.packageCardId)[0].price
    }
    total += this.getServicesPrice(this.props.primaryPhotoCards, values.primaryPhotoCardIds)
    total += this.getServicesPrice(this.props.videoCards, values.videoCardIds)
    total += this.getServicesPrice(this.props.addOnPhotoCards, values.addOnPhotoCardIds)
    total += this.getServicesPrice(this.props.floorPlanCards, values.floorPlanCardIds)
    return total
  }

  updateLatLng = (values: FormValues) => {
    const ZOOM_CONTINENT = 3
    const ZOOM_COUNTRY = 5
    const ZOOM_CITY = 9
    const ZOOM_STREET = 16
    const { street, city, zip, stateId, countryId } = values.propertyAddress
    const state = this.props.states.find(s => s.id === stateId)
    const stateName = state ? state.name : ''
    const country = this.props.countries.find(c => c.id === countryId)
    const countryName = country ? country.name : ''
    const address = [street, zip, city, stateName, countryName].join(' ')
    addressToLatLng(address)
      .then(response => {
        if (response) {
          this.props.setFieldValue(`${nameof<FormValues>('location')}.${nameof<Location>('latLng')}.${nameof<LatLng>('lat')}`, response.lat)
          this.props.setFieldValue(`${nameof<FormValues>('location')}.${nameof<Location>('latLng')}.${nameof<LatLng>('lng')}`, response.lng)
          let zoom: number = ZOOM_CONTINENT
          if ((zip.length > 0 || street.length > 0) && city.length > 0) {
            zoom = ZOOM_STREET
          } else if (city.length > 0) {
            zoom = ZOOM_CITY
          } else if (state) {
            zoom = ZOOM_COUNTRY
          }
          this.props.setFieldValue(`${nameof<FormValues>('location')}.${nameof<Location>('zoom')}`, zoom)
        }
      })
      .catch(() => log.error('addressToLatLng Error'))
  }

  handleUpdateLocation = () => {
    this.updateLatLng(this.props.values)
  }

  handleLocationPanelExpand = () => {
    this.updateLatLng(this.props.values)
  }

  handleApplyPromoCode = () => {
    const promoCode = this.getPromoCode(this.props.values.promoCodeToCheck, this.props.promoCodes)
    if (promoCode) {
      this.props.setFieldValue(nameof<FormValues>('promoCodeId'), promoCode.id)
      this.setState({
        discount: this.getDiscount(this.props.values.orderTotal, promoCode),
        validPromoCode: true
      })
    } else {
      this.props.setFieldValue(nameof<FormValues>('promoCodeId'), '')
      this.setState({
        discount: 0,
        validPromoCode: false
      })
    }
  }

  componentDidUpdate (prevProps: NewOrderFormViewProps) {
    const { values: prevValues } = prevProps
    const { values } = this.props
    if (prevValues.packageCardId !== values.packageCardId
      || prevValues.primaryPhotoCardIds !== values.primaryPhotoCardIds
      || prevValues.videoCardIds !== values.videoCardIds
      || prevValues.addOnPhotoCardIds !== values.addOnPhotoCardIds
      || prevValues.floorPlanCardIds !== values.floorPlanCardIds) {
      this.props.setFieldValue(nameof<FormValues>('orderTotal'), this.getOrderTotal(values))
    }
  }

  render () {
    const { values } = this.props
    const steps = [
      {
        label: 'Choose Service',
        render: () => (
          <>
            <ScrollToTopOnMount/>
            <Step1
              values={values}
              packageCards={this.props.packageCards}
              primaryPhotoCards={this.props.primaryPhotoCards}
              videoCards={this.props.videoCards}
              addOnPhotoCards={this.props.addOnPhotoCards}
              floorPlanCards={this.props.floorPlanCards}
            />
          </>
        )
      },
      {
        label: 'Enter Property Details',
        render: () => (
          <>
            <ScrollToTopOnMount/>
            <Step2
              values={values}
              agents={this.props.agents}
              amenities={this.props.amenities}
              countries={this.props.countries}
              states={this.props.states}
              currencies={this.props.currencies}
              listingTypesCategories={this.props.listingTypesCategories}
              onUpdateLocation={this.handleUpdateLocation}
            />
          </>
        )
      },
      {
        label: 'Confirm Order',
        render: () => (
          <>
            <ScrollToTopOnMount/>
            <Step3
              values={values}
              agents={this.props.agents}
              countries={this.props.countries}
              states={this.props.states}
              packageCards={this.props.packageCards}
              primaryPhotoCards={this.props.primaryPhotoCards}
              videoCards={this.props.videoCards}
              addOnPhotoCards={this.props.addOnPhotoCards}
              floorPlanCards={this.props.floorPlanCards}
              discount={this.state.discount}
              validPromoCode={this.state.validPromoCode}
              onApplyPromoCode={this.handleApplyPromoCode}
            />
          </>
        )
      },
      {
        label: 'Payment',
        render: () => (
          <>
            <ScrollToTopOnMount/>
            <Step4
              values={values}
              countries={this.props.countries}
              states={this.props.states}
            />
          </>
        )
      }
    ]
    const footers = [
      {
        render: () => (
          <StepFooter step={0} orderTotal={values.orderTotal} enableNext={values.orderTotal > 0} />
        )
      },
      {
        render: () => (
          <StepFooter step={1} />
        )
      },
      {
        render: () => (
          <StepFooter step={2} />
        )
      },
      {
        render: () => (
          <StepFooter step={3} orderTotal={values.orderTotal}/>
        )
      }
    ]
    return (
      <BreadcrumbNavigation.Provider steps={steps} footers={footers}>
        <Grid.Wrapper as={Form}>
          <Grid.Heading>
            <h1>Add New Order</h1>
          </Grid.Heading>
          <StyledGridLeftAside>
            <BreadcrumbNavigation.Breadcrumbs />
          </StyledGridLeftAside>
          <Grid.MainColumnFullWidth>
            <BreadcrumbNavigation.SelectedStep />
          </Grid.MainColumnFullWidth>
          <Grid.FooterContainer>
            <BreadcrumbNavigation.SelectedFooter />
          </Grid.FooterContainer>
        </Grid.Wrapper>
      </BreadcrumbNavigation.Provider>
    )
  }
}

const NewOrderForm = withFormik<CustomProps, FormValues>({
  handleSubmit: (values, { setSubmitting, props }) => {
    props.onSubmit(values)
    setSubmitting(false)
  },
  mapPropsToValues: () => ({
    addOnPhotoCardIds: [],
    amenities: [],
    amenityToAdd: '',
    creditCard: {
      cardNumber: '',
      CVC: '',
      expiration: ''
    },
    floorPlanCardIds: [],
    location: {
      dontDisplay: false,
      latLng: {
        lat: 37.09024,
        lng: -95.712891
      },
      name: 'United States',
      zoom: 3
    },
    orderTotal: 0,
    primaryPhotoCardIds: [],
    promoCodeToCheck: '',
    propertyAddress: {
      city: '',
      countryId: 'US',
      dontShowOnSite: false,
      stateId: '',
      street: '',
      zip: ''
    },
    propertyDetails: {
      bedrooms: 1,
      currency: '',
      fullBathrooms: 1,
      garages: 0,
      halfBathrooms: 0,
      hideHeadline: false,
      homeSize: 0,
      homeSizeUnit: HomeSizeUnit.SqFt,
      lotSize: 0,
      lotSizeUnit: LotSizeUnit.Acres,
      parkingSpaces: 0,
      price: 0,
      primaryMLS: 0,
      propertyDescription: EditorState.createEmpty(),
      propertyHeadline: '',
      rental: false,
      secondaryMLS: 0,
      shortPropertyDescription: '',
      yearBuilt: 0
    },
    shippingInfo: {
      address: {
        city: '',
        countryId: 'US',
        stateId: '',
        street: '',
        zip: ''
      },
      email: '',
      firstName: '',
      lastName: ''
    },
    shootInfo: {
      lockBox: false,
      occupancy: Occupancy.Occupied
    },
    videoCardIds: []
  })
})(NewOrderFormView)

export default NewOrderForm
