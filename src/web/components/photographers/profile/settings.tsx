import { Field } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import SwitchField from '../../../common/formikFields/switchField'
import Panel from '../../../common/panel'
import styled from '../../../common/styled-components'
import { Profile } from '../common/types'

const StyledSwitch = styled(SwitchField)`
  margin-bottom: 5px;
`

const SiwtchLabelHint = styled.span`
  display: block;
  margin-top: 3px;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5;
  color: ${props => props.theme.colors.LABEL_TEXT};
`

interface SettingsProps {
  role?: 'Processor' | 'Photographer'
}

const Settings: React.FunctionComponent<SettingsProps> = props => (
  <Panel id='settings' heading='Settings'>
    <Field
      name={nameof<Profile>('activatable')}
      component={StyledSwitch}
      label={
        <>
          Can Activate Tours
          <SiwtchLabelHint>{`Enables ${props.role} to activate and publish tours, using a shared payment method if necessary.`}</SiwtchLabelHint>
        </>
      }
    />
    {
      props.role === 'Photographer' && <Field
        name={nameof<Profile>('schedulable')}
        component={StyledSwitch}
        label={
          <>
            Can schedule
            <SiwtchLabelHint>Enables photographer to schedule photo shoots.</SiwtchLabelHint>
          </>
        }
      />
    }
    <Field
      name={nameof<Profile>('enableServiceDone')}
      component={StyledSwitch}
      label={
        <>
          Can mark service as done
          <SiwtchLabelHint>Can access all tours, upload & manage media. If checked can activate/publish tours.</SiwtchLabelHint>
        </>
      }
    />
  </Panel>
)

export default Settings
