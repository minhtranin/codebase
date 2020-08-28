import NavigationWarning from '#veewme/web/common/formikFields/navigationWarning'
import { OptionValue } from '#veewme/web/common/formikFields/selectField'
import Billing from '#veewme/web/common/formPanels/billing'
import SocialMedia from '#veewme/web/common/formPanels/socialMedia'
import Syndication from '#veewme/web/common/formPanels/syndication'
import * as Grid from '#veewme/web/common/grid'
import { useIsDesktopView } from '#veewme/web/common/hooks'
import * as log from '#veewme/web/common/log'
import { Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import ColorScheme from '../../../common/formPanels/colorScheme'
import Company from '../../../common/formPanels/company'
import Contact from '../../../common/formPanels/contact'
import FauxVideoMusic from '../../../common/formPanels/fauxVideoMusic'
import PhotoExports from '../../../common/formPanels/photoExports'
import Plugins from '../../../common/formPanels/plugins'
import PropertySiteMediaGallery from '../../../common/formPanels/propertySiteMediaGallery'
import Regions from '../../../common/formPanels/regions'
import Settings from '../../../common/formPanels/settings'
import UsefulLinks from '../../../common/formPanels/usefulLinks'
import WhiteLabel from '../../../common/formPanels/whiteLabel'
import EditAffiliateNavigation from './editAffiliateSidebar/editAffiliateNavigation'
import MetaData from './editAffiliateSidebar/metaData'
import { EditAffiliateValues } from './types'

// TODO remove mock data
const mockRegions = [
  { label: 'Region 1', id: 1 },
  { label: 'Region 2', id: 2 },
  { label: 'Region 3', id: 3 }
]

export interface FormOptions {
  audioTrackOptions: OptionValue[]
  regionOptions: OptionValue[]
}

interface EditAffiliateCustomProps {
  initialValues: EditAffiliateValues
  onSubmit: (values: EditAffiliateValues) => void
}

type EditAffiliateFormProps = FormikProps<EditAffiliateValues> & EditAffiliateCustomProps

const EditAffiliateForm: React.FunctionComponent<EditAffiliateFormProps> = props => {
  const [desktopView] = useIsDesktopView()

  return(
    <Grid.Wrapper as={Form} >
      <NavigationWarning touched={props.touched} />
      <Grid.Heading>
        <h1>Affiliate Details</h1>
      </Grid.Heading>
      <Grid.LeftDesktopAside>
        <EditAffiliateNavigation />
        <MetaData/>
      </Grid.LeftDesktopAside>
      <Grid.MainColumn>
        <Company/>
        <Contact/>
        <Billing/>
        <PropertySiteMediaGallery
          values={props.values}
        />
        <UsefulLinks
          values={props.values.usefulLinks}
        />
        <Settings/>
        <PhotoExports
          presets={props.values.mediaExports}
        />
        <Syndication />
        <WhiteLabel/>
        <Plugins/>
        <SocialMedia />
      </Grid.MainColumn>
      {desktopView &&
        <Grid.RightAside>
          <Regions
            regions={mockRegions}
            values={props.values}
          />
          <ColorScheme/>
          <FauxVideoMusic/>
        </Grid.RightAside>
      }
      <Grid.Footer />
    </Grid.Wrapper>
  )
}

export default withFormik<EditAffiliateCustomProps, EditAffiliateValues>({
  enableReinitialize: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    log.debug('submit values', values)
    const regionIds = values.regionIds.filter(id => id)
    props.onSubmit({ ...values, regionIds })
    setSubmitting(false)
  },
  mapPropsToValues: props => (props.initialValues)
})(EditAffiliateForm)
