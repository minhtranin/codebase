import { Agent, Currency } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import SelectField from '#veewme/web/common/formikFields/selectField'
import { Field } from 'formik'
import * as React from 'react'
import Panel from '../../../../common/panel'
import styled from '../../../../common/styled-components'
import { FormValues } from '../newOrderForm'

const StyledHeader = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  & span {
    color: ${props => props.theme.colors.ALERT};
  }
`

const AgentPanelHeader: React.FunctionComponent<{}> = () => (
  <StyledHeader>
    <p>Agent <span>*</span></p>
    <p>Co-listing Agent</p>
  </StyledHeader>
)

interface AgentPanelProps {
  agents: Agent[]
  currencies: Currency[]
}

const StyledInputsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  input {width: 100%;}
`

const AgentPanel: React.FunctionComponent<AgentPanelProps> = props => {
  const getAgentOptions = () => (
    props.agents.map(agent => ({
      label: agent.firstName + ' ' + agent.lastName,
      value: agent.id
    }))
  )

  return (
    <Panel heading='' headingPlacedComponent={<AgentPanelHeader />}>
      <StyledInputsWrapper>
        <Field
          name={nameof<FormValues>('agentId')}
          component={SelectField}
          placeholder='Agent...'
          options={getAgentOptions()}
        />
        <Field
          name={nameof<FormValues>('coListingAgentId')}
          component={SelectField}
          placeholder='Co-listing Agent...'
          options={getAgentOptions()}
        />
      </StyledInputsWrapper>
    </Panel>
  )
}

export default AgentPanel
