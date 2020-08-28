import NavigationWarning from '#veewme/web/common/formikFields/navigationWarning'
import { OptionValue } from '#veewme/web/common/formikFields/selectField'
import AddBrokerage from '#veewme/web/common/formPanels/addBrokerage'
import Address from '#veewme/web/common/formPanels/address'
import ContactInformation from '#veewme/web/common/formPanels/contactInformation'
import DefaultColorScheme from '#veewme/web/common/formPanels/defaultColorScheme'
import Fees from '#veewme/web/common/formPanels/fees'
import PhotoDownloadPresets from '#veewme/web/common/formPanels/photoDownloadPresets'
import PropertyFlyerLayout from '#veewme/web/common/formPanels/propertyFlyerLayout'
import PropertySiteMediaShowcase from '#veewme/web/common/formPanels/propertySiteMediaShowcase'
import PropertySiteMediaStyle from '#veewme/web/common/formPanels/propertySiteMediaStyle'
import Region from '#veewme/web/common/formPanels/region'
import SiteTourSettings from '#veewme/web/common/formPanels/siteTourSettings'
import Syndication from '#veewme/web/common/formPanels/syndication'
import { BrokerFormValues } from '#veewme/web/common/formPanels/valuesInterfaces'
import * as Grid from '#veewme/web/common/grid'
import { Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import NewBrokerNavigation from './brokerNavigation'

export interface FormOptions {
  regionOptions: OptionValue[]
}

interface BrokerCustomProps {
  formOptions: FormOptions
  values: BrokerFormValues
  onSubmit: (values: BrokerFormValues) => void
}

type BrokerFormProps = FormikProps<BrokerFormValues> & BrokerCustomProps

const BrokerForm: React.FunctionComponent<BrokerFormProps> = props => {
  return (
    <Grid.Wrapper as={Form}>
      <NavigationWarning touched={props.touched} />
      <Grid.Heading>
        <h1>Broker profile</h1>
      </Grid.Heading>
      <Grid.LeftDesktopAside>
        <NewBrokerNavigation/>
      </Grid.LeftDesktopAside>
      <Grid.MainColumn>
        <AddBrokerage />
        <Address />
        <PropertySiteMediaShowcase />
        <SiteTourSettings />
        <PhotoDownloadPresets
          values={props.values.photoDownloadPresets}
        />
        <DefaultColorScheme />
        <PropertyFlyerLayout showDisclaimer />
        <Syndication />
      </Grid.MainColumn>
      <Grid.RightAside>
        <Fees showMoreOptions />
        <ContactInformation />
        <Region
          options={props.formOptions.regionOptions}
        />
        <PropertySiteMediaStyle />
      </Grid.RightAside>
      <Grid.Footer />
    </Grid.Wrapper>
  )
}

export default withFormik<BrokerCustomProps, BrokerFormValues>({
  enableReinitialize: true,
  handleSubmit: (values, { props, setSubmitting }) => {
    props.onSubmit(values)
    setSubmitting(false)
  },
  mapPropsToValues: props => (props.values)
})(BrokerForm)
