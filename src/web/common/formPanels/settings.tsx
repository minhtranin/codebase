import { nameof } from '#veewme/lib/util'
import Switch from '#veewme/web/common/formikFields/switchField'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field } from 'formik'
import * as React from 'react'
import { EditAffiliateValues, SettingsValues } from '../../components/affiliates/editAffiliate/types'

const SwitchDescription = styled.div`
  padding-right: 30px;
  font-size: 13px;
  line-height: 1.5;
  color: ${props => props.theme.colors.LABEL_TEXT};
`

const Settings: React.FunctionComponent<{}> = () => {
  return (
    <Panel heading='Client Permissions & Settings' id='settings' toggleable>
      <Field
        component={Switch}
        name={`${nameof<EditAffiliateValues>('permissionsAndSettings')}.${nameof<SettingsValues>('sendWelcomeEmailsToNewClients')}`}
        label={
          <>
          Send welcome email to new clients
          <SwitchDescription>
            Disable this setting to avoid sending emails to clients you create inside the back office.
          </SwitchDescription>
          </>
        }
      />
      <Field
        component={Switch}
        name={`${nameof<EditAffiliateValues>('permissionsAndSettings')}.${nameof<SettingsValues>('allowClientMediaUpload')}`}
        label={
          <>
            Allow client media upload
            <SwitchDescription>
              If you disable this, your clients will be able to see Manage Media window,manage photos and panoramas (rearrange, edit captions, delete), manage floor plans (upload). They will not see video tab and will not be able to upload neither photos nor panoramas.
            </SwitchDescription>
          </>
        }
      />
      <Field
        component={Switch}
        name={`${nameof<EditAffiliateValues>('permissionsAndSettings')}.${nameof<SettingsValues>('allowClientOrders')}`}
        label={
          <>
            Allow client orders
            <SwitchDescription>
              If disabled, clients cannot place orders (both Primary and Secondary services). You will need to place orders on their behalf.
            </SwitchDescription>
          </>
        }
      />
      <Field
        component={Switch}
        name={`${nameof<EditAffiliateValues>('permissionsAndSettings')}.${nameof<SettingsValues>('allowClientBillingAccess')}`}
        label={
          <>
            Allow client billing access
            <SwitchDescription>
              Hides access to billing information for clients. Also, in order confirmation emails. They will not see amounts and monetary information.
            </SwitchDescription>
          </>
        }
      />
      <Field
        component={Switch}
        name={`${nameof<EditAffiliateValues>('permissionsAndSettings')}.${nameof<SettingsValues>('orderConfirmationEmailRider')}`}
        label={
          <>
            Order confirmation email rider
            <SwitchDescription>
              Include a custom message or note to your clients in the Order Confirmation email.
            </SwitchDescription>
          </>
        }
      />
    </Panel>
  )
}

export default Settings
