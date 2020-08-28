import { nameof } from '#veewme/lib/util'
import Switch from '#veewme/web/common/formikFields/switchField'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field } from 'formik'
import * as React from 'react'
import { PropertySiteTourSettingsValues } from './valuesInterfaces'

const SwitchDescription = styled.div`
  padding-right: 30px;
  font-size: 13px;
  line-height: 1.5;
  color: ${props => props.theme.colors.LABEL_TEXT};
`

const SiteTourSettings: React.FunctionComponent<{}> = () => {
  return (
    <Panel heading='Property Site / Tour Settings' id='siteTourSettings' toggleable>
      <Field
        component={Switch}
        disabled
        name={nameof<PropertySiteTourSettingsValues>('displayAgentCompanyLogoOnTopOfEachTour')}
        label={
          <>
          Display agent company logo on top of each tour (Bogart Realty setting)
          <SwitchDescription>
            Enable this to display agent company logo more prominently on tours. the logo will show up on top-right
            corner of each tour, taking place of price and property type, which will then reside above the property description.
            Contact your company administrator / service provider if you wish to change this setting.
          </SwitchDescription>
          </>
        }
      />
      <Field
        component={Switch}
        name={nameof<PropertySiteTourSettingsValues>('hideAnimateNavigationBar')}
        label={
          <>
            Hide / Animate Navigation Bar
            <SwitchDescription>Navigation Bar not visible, will appear when scrolling down</SwitchDescription>
          </>
        }
      />
      <Field
        component={Switch}
        name={nameof<PropertySiteTourSettingsValues>('showPatternOverlayOnSlideShowAndVideoOverviewTour')}
        label='Show pattern overlay on SlideShow and Video Overview Tour.'
      />
      <Field
        component={Switch}
        name={nameof<PropertySiteTourSettingsValues>('removeExternalLinksFromUnbrandedTourFooter')}
        label={
          <>
            Remove ecternal links from unbranded tour footer
            <SwitchDescription>Photographer branding will be visible but not clickable</SwitchDescription>
          </>
        }
      />
      <Field
        component={Switch}
        name={nameof<PropertySiteTourSettingsValues>('showViewAdditionalPropertiesButtonOnTours')}
        label='Show "View Additional Properties" button on tours'
      />
      <Field
        component={Switch}
        disabled
        name={nameof<PropertySiteTourSettingsValues>('removePropertyAddressFromUnbrandedTours')}
        label={
          <>
            Remove property address from unbranded tours (for selected MLS compliance) (Bogart Realty settings)
            <SwitchDescription>
              Enable this to remove property address & map / location from the unbranded tour, and generated faux videos.
              Contact your company administrator / service provider if you wish to change this setting.
            </SwitchDescription>
          </>
        }
      />
      <Field
        component={Switch}
        name={nameof<PropertySiteTourSettingsValues>('removePhotographerBrandingFromUnbrandedTour')}
        label={
          <>
            Remove photographer branding from unbranded tour
            <SwitchDescription>This will remove any reference to photograper from the unbranded tour</SwitchDescription>
          </>
        }
      />
      <Field
        component={Switch}
        name={nameof<PropertySiteTourSettingsValues>('removePhotographerBrandingFromBrandedTour')}
        label={
          <>
            Remove photographer branding from branded tour
            <SwitchDescription>This will remove any reference to photograper from the branded tour</SwitchDescription>
          </>
        }
      />
    </Panel>
  )
}

export default SiteTourSettings
