import { ServiceRegionAdjusted, SourceType } from '#veewme/graphql/types'
import { Service } from '#veewme/lib/types'
import NavigationWarning from '#veewme/web/common/formikFields/navigationWarning'
import * as log from '#veewme/web/common/log'
import { Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import * as Grid from '../../../common/grid'
import { NavHashLink } from '../../../common/hashLink'
import SecondaryNavigation from '../../../common/secondaryNavigation'
import { StyledFormWrapper, StyledGridWrapper } from '../common/styled'
import Details from './details'
import Notifications from './notifications'
import Regions from './regions'
import RightCol from './rightCol'
import Settings from './settings'

interface CustomProps {
  onSubmit: (values: Service) => void
  services: Service[] // list of all already defined services
}

export type FormValues = {
  selectAllRegions: boolean
  sourceType: SourceType
  duplicateFrom?: string
} & Service

type NewServiceFormViewProps = FormikProps<FormValues> & CustomProps

class NewServiceFormView extends React.Component<NewServiceFormViewProps, {}> {
  // https://stackoverflow.com/a/37282264
  static defaultProps = {
    services: []
  }

  updateRegionParams (prevProps: NewServiceFormViewProps) {
    /*
      Updates regions params when main price or compensation has been changed and when region switch is unchecked
      (when user doesn't want to set custom region params main price and compensation from Details section are used as defaults)
    */
    const { values: {
      price: prevPrice,
      defaultCompensation: prevDefaultCompensation
    }} = prevProps
    const { values: { price, defaultCompensation } } = this.props

    const regions = this.props.values.regions
    const prevRegions = prevProps.values.regions

    const priceChanged = prevPrice !== price
    const compensationChanged = prevDefaultCompensation !== defaultCompensation
    const regionsChanged = prevRegions !== regions

    if (priceChanged || compensationChanged || regionsChanged) {
      regions.forEach((region, i) => {
        // type safe field names
        const adjustedPriceName = `${nameof<FormValues>('regions')}[${i}].${nameof<ServiceRegionAdjusted>('adjustedPrice')}`
        const adjustedCompensationName = `${nameof<FormValues>('regions')}[${i}].${nameof<ServiceRegionAdjusted>('adjustedCompensation')}`

        // TODO remove cast
        const notCustom = !region.custom
        const userUncheckedCustomRegionSwitch = (region.custom !== prevRegions[i].custom) && notCustom

        if ((priceChanged && notCustom) || userUncheckedCustomRegionSwitch) {
          this.props.setFieldValue(adjustedPriceName, price)
        }
        if ((compensationChanged && notCustom) || userUncheckedCustomRegionSwitch) {
          this.props.setFieldValue(adjustedCompensationName, defaultCompensation)
        }
      })
    }
  }

  handleToggleAllRegions = (select: boolean) => {
    this.props.values.regions.forEach((_region, i) => {
      // type safe field name
      const customFieldName = `${nameof<FormValues>('regions')}[${i}].${nameof<ServiceRegionAdjusted>('custom')}`
      this.props.setFieldValue(customFieldName, select)
    })
  }

  componentDidUpdate (prevProps: NewServiceFormViewProps) {
    const { values: { duplicateFrom: prevDuplicateFrom } } = prevProps
    const { values: { duplicateFrom } } = this.props
    const duplicateFromChanged = prevDuplicateFrom !== duplicateFrom

    if (duplicateFromChanged) {
      log.debug('Duplicate has changed')
    }

    this.updateRegionParams(prevProps)

  }
  render () {
    const { values, services, touched } = this.props
    return (
      <StyledFormWrapper>
        <StyledGridWrapper as={Form} >
          <NavigationWarning touched={touched} />
          <Grid.Heading>
            <h1>New Service</h1>
          </Grid.Heading>
          <Grid.LeftDesktopAside>
            <SecondaryNavigation>
              <li><NavHashLink to='#details'>Details</NavHashLink></li>
              <li><NavHashLink to='#regions'>Regions</NavHashLink></li>
              <li><NavHashLink to='#settings'>Settings</NavHashLink></li>
              <li><NavHashLink to='#notifications'>Notifications</NavHashLink></li>
            </SecondaryNavigation>
          </Grid.LeftDesktopAside>
          <Grid.MainColumn>
            <Details values={values} services={services}/>
            <Regions values={values} onToggleAll={this.handleToggleAllRegions}/>
            <Settings<FormValues> />
            <Notifications />
          </Grid.MainColumn>
          <Grid.RightAside>
            <RightCol values={values} />
          </Grid.RightAside>
          <Grid.Footer />
        </StyledGridWrapper>
      </StyledFormWrapper>
    )
  }
}

const NewServiceForm = withFormik<CustomProps, FormValues>({
  handleSubmit:  (values, { setSubmitting, props }) => {
    props.onSubmit(values)
    setSubmitting(false)
  },
  // TODO update Service input in schema.graphql and, in consequence, this form's values
  mapPropsToValues: () => ({
    assignable: false,
    category: {
      color: {
        a: 1,
        b: 0,
        g: 0,
        r: 0
      },
      icon: 'Photo',
      id: 0, // TODO make optional for initial data
      label: ''
    },
    defaultCompensation: 0,
    defaultPay: 0,
    duration: 0,
    durationUnit: 'Minute',
    id: 0, // TODO make optional for initial data
    link: '',
    mediaOnly: false,
    name: '',
    note: '',
    orderNotifyEmail: '',
    packageServices: [],
    photographer: {
      activatable: false,
      address: {
        city: '',
        id: 0 // TODO make optional for initial data
      },
      id: 0, // TODO make optional for initial data
      phone: '',
      region: {
        id: 0, // TODO make optional for initial data
        label: ''
      },
      schedulable: false,
      thumb: '',
      user: {
        email: '',
        firstName: '',
        id: 0, // TODO make optional for initial data
        joinDate: '',
        lastActive: '',
        lastName: '',
        password: '',
        role: 'PHOTOGRAPHER'
      }
    },
    photographerPay: 0,
    price: 0,
    processor: '#processor1',
    propertySite: false,
    region: '',
    regions: [{
      adjustedCompensation: 0,
      adjustedPrice: 0,
      custom: false,
      id: 1,
      name: 'Northeast'
    }, {
      adjustedCompensation: 0,
      adjustedPrice: 0,
      custom: false,
      id: 2,
      name: 'Midwest'
    },{
      adjustedCompensation: 0,
      adjustedPrice: 0,
      custom: false,
      id: 3,
      name: 'Southwest'
    }],
    regionsCustomAll: true,
    selectAllRegions: false,
    serviceType: 'Primary',
    sourceType: 'New',
    suspended: false,
    tourNotifyEmail: ''
  })
})(NewServiceFormView)

export default NewServiceForm
