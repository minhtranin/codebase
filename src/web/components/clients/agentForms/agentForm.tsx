import { Role } from '#veewme/gen/graphqlTypes'
import NavigationWarning from '#veewme/web/common/formikFields/navigationWarning'
import AccountInformation from '#veewme/web/common/formPanels/accountInformation'
import Address from '#veewme/web/common/formPanels/address'
import Brokerage from '#veewme/web/common/formPanels/brokerage'
import ContactInformation from '#veewme/web/common/formPanels/contactInformation'
import DefaultColorScheme from '#veewme/web/common/formPanels/defaultColorScheme'
import Fees from '#veewme/web/common/formPanels/fees'
import InternalNote from '#veewme/web/common/formPanels/internalNote'
import Notifications from '#veewme/web/common/formPanels/notifications'
import PluginTracking from '#veewme/web/common/formPanels/pluginTracking'
import PropertyFlyerLayout from '#veewme/web/common/formPanels/propertyFlyerLayout'
import PropertySiteMediaShowcase from '#veewme/web/common/formPanels/propertySiteMediaShowcase'
import Region from '#veewme/web/common/formPanels/region'
import SiteTourSettings from '#veewme/web/common/formPanels/siteTourSettings'
import SocialMedia from '#veewme/web/common/formPanels/socialMedia'
import Syndication from '#veewme/web/common/formPanels/syndication'
import { AgentValues } from '#veewme/web/common/formPanels/valuesInterfaces'
import { useIsDesktopView } from '#veewme/web/common/hooks'
import * as log from '#veewme/web/common/log'
import { EditorState } from 'draft-js'
import { Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import * as Grid from '../../../common/grid'
import AgentNavigation from './agentFormSidebar/agentNavigation'
import MetaData from './agentFormSidebar/metaData'
import { AffiliateFormOptions } from './types'

interface AgentFormCustomProps {
  affiliate?: AffiliateFormOptions
  role: Role
  initialData?: Partial<AgentValues>
  onSubmit: (values: AgentValues) => void
}

type AgentFormProps = FormikProps<AgentValues> & AgentFormCustomProps

const AgentForm: React.FunctionComponent<AgentFormProps> = props => {
  const [desktopView] = useIsDesktopView()
  return(
    <Grid.Wrapper as={Form} >
      <NavigationWarning touched={props.touched} />
      <Grid.Heading>
        <h1>Agent profile</h1>
      </Grid.Heading>
      <Grid.LeftDesktopAside>
        <AgentNavigation role={props.role} />
        <MetaData/>
      </Grid.LeftDesktopAside>
      <Grid.MainColumn>
        <AccountInformation role={props.role} />
        {!desktopView && props.role === 'AFFILIATE' && <Fees />}
        {!desktopView && <ContactInformation showAgentOptions />}
        <Brokerage
          brokers={props.affiliate
            ? props.affiliate.brokerages.map(brokerage => ({
              ...brokerage,
              logoUrl: 'https://placeimg.com/400/175/arch' // TODO replace when uploading files is implemented to brokerage
            }))
            : []
          }
        />
        <Address role={props.role} />
        <PropertySiteMediaShowcase />
        {props.role === 'AFFILIATE' && <Notifications />}
        <Syndication />
        <DefaultColorScheme />
        <SiteTourSettings />
        {props.role === 'AFFILIATE' && <PluginTracking />}
        {props.role === 'AFFILIATE' && <PropertyFlyerLayout />}
        <SocialMedia />
        {!desktopView && props.role === 'AFFILIATE' && <Region
          options={props.affiliate
            ? props.affiliate.regions.map(region => ({
              label: region.label,
              value: region.id
            }))
            : []
          }
        />}
        {!desktopView && props.role === 'AFFILIATE' && <InternalNote />}
      </Grid.MainColumn>
      {desktopView &&
        <Grid.RightAside>
          {props.role === 'AFFILIATE' && <Fees />}
          <ContactInformation showAgentOptions />
          {props.role === 'AFFILIATE' && <Region
            options={props.affiliate
              ? props.affiliate.regions.map(region => ({
                label: region.label,
                value: region.id
              }))
              : []
            }
          />}
          {props.role === 'AFFILIATE' && <InternalNote />}
        </Grid.RightAside>
      }
      <Grid.Footer />
    </Grid.Wrapper>
  )
}

export default withFormik<AgentFormCustomProps, AgentValues>({
  handleSubmit: (values, { props, setSubmitting }) => {
    log.debug(values)
    props.onSubmit(values)
    setSubmitting(false)
  },
  mapPropsToValues: props => ({
    agentAvatar: '',
    agentMLSid: '',
    bio: EditorState.createEmpty(),
    city: '',
    country: 'US',
    defaultColorScheme: { b: 62 , g: 204 , r: 159 },
    designations: '',
    emailCC: '',
    emailCCorderCompleted: false,
    emailCCorderPlaced: false,
    emailOffice: '',
    flyerLayout: 'FEATURED1',
    hideFlyerFromPropertySiteTour: false,
    internalNote: EditorState.createEmpty(),
    notifications: {
      newTourOrder: false,
      tourActivated: false
    },
    officeAdmin: false,
    others: '',
    phone: '',
    phoneMobile: '',
    phoneOffice: '',
    profileUrl: '',
    propertySiteMediaShowcase: {
      showPropertyMapOnShowcasePage: false,
      topOfTheShowcasePhoto: ''
    },
    propertySiteTourSettings: {
      displayAgentCompanyLogoOnTopOfEachTour: false,
      hideAnimateNavigationBar: false,
      removeExternalLinksFromUnbrandedTourFooter: false,
      removePhotographerBrandingFromBrandedTour: false,
      removePhotographerBrandingFromUnbrandedTour: false,
      removePropertyAddressFromUnbrandedTours: false,
      showPatternOverlayOnSlideShowAndVideoOverviewTour: false,
      showViewAdditionalPropertiesButtonOnTours: false
    },
    regionId: props.affiliate && props.affiliate.regions && props.affiliate.regions[0].id,
    specialPricing: false,
    state: 'AL',
    street: '',
    title: '',
    user: {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    },
    website: '',
    zip: '',
    ...props.initialData
  })
})(AgentForm)
