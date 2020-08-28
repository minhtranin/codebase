import { Field } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import SelectField from '../../../common/formikFields/selectField'
import SwitchField from '../../../common/formikFields/switchField'
import Panel from '../../../common/panel'
import styled from '../../../common/styled-components'
import { FormValues } from './form'

const StyledSwitch = styled(SwitchField)`
  margin-bottom: 5px;
`

const SiwtchLabelHint = styled.span`
  font-weight: 400;
`

const ProcessorWrapper = styled.div`
  margin-top: 15px;
  max-width: 40%;
`

const ProcessorOptions = [{
  label: 'Processor 1',
  value: '#processor1'
}, {
  label: 'Processor 2',
  value: '#processor2'
}, {
  label: 'Processor 3',
  value: '#processor3'
}]

interface SettingsAllowedField {
  propertySite: boolean
  mediaOnly: boolean
  assignable: boolean
}

/*
  Additional generic T used here because this form section will be reused in another form(s).
  T will represnt type of parent form values
*/
export class Settings<T extends SettingsAllowedField> extends React.Component<{}> {
  render () {
    return (
      <Panel id='settings' heading='Settings'>
        <Field
          name={nameof<T>('propertySite')}
          component={StyledSwitch}
          label='Property Site'
        />
        <Field
          name={nameof<T>('mediaOnly')}
          component={StyledSwitch}
          label='Media Only'
        />
        <Field
          name={nameof<FormValues>('assignable')}
          component={StyledSwitch}
          label={<>Assignable Service <SiwtchLabelHint>(Uncheck if not to appear in scheduling)</SiwtchLabelHint></>}
        />
        <ProcessorWrapper>
          <Field
            name={nameof<FormValues>('processor')}
            component={SelectField}
            options={ProcessorOptions}
            label='Processor'
          />
        </ProcessorWrapper>
      </Panel>
    )
  }
}

export default Settings
