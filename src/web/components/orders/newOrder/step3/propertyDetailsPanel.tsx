import { Agent, Country, State } from '#veewme/lib/types'
import Panel from '#veewme/web/common/panel'
import * as React from 'react'
import { NewOrderValues } from '../common'
import { StyledDetail, StyledDetailContent, StyledDetailLabel, StyledInlineWrapper, StyledPanelContentWrapper } from './styled'

interface CustomProps {
  agents: Agent[]
  countries: Country[]
  states: State[]
  values: NewOrderValues
}

type PropertyDetailsPanelProps = CustomProps

const PropertyDetailsPanel: React.FunctionComponent<PropertyDetailsPanelProps> = props => {
  const { agentId, coListingAgentId, propertyAddress } = props.values
  const agent = props.agents.find(a => a.id === agentId)
  const coListingAgent = props.agents.find(a => a.id === coListingAgentId)
  const country = props.countries.find(c => c.id === propertyAddress.countryId)
  const state = props.states.find(s => s.id === propertyAddress.stateId)

  return (
    <Panel heading='Property Details'>
      <StyledPanelContentWrapper>
        <StyledInlineWrapper>
            <StyledDetail>
              <StyledDetailLabel>Agent:</StyledDetailLabel>
              {agent &&
                <StyledDetailContent>{agent.firstName} {agent.lastName}</StyledDetailContent>
              }
            </StyledDetail>
            <StyledDetail>
              <StyledDetailLabel>Co-Listing Agent:</StyledDetailLabel>
              {coListingAgent &&
                <StyledDetailContent>{coListingAgent.firstName} {coListingAgent.lastName}</StyledDetailContent>
              }
            </StyledDetail>
        </StyledInlineWrapper>
        <StyledInlineWrapper>
          <StyledDetail>
            <StyledDetailLabel>Street Address:</StyledDetailLabel>
            <StyledDetailContent>{propertyAddress.street}</StyledDetailContent>
          </StyledDetail>
          <StyledDetail>
            <StyledDetailLabel>City:</StyledDetailLabel>
            <StyledDetailContent>{propertyAddress.city}</StyledDetailContent>
          </StyledDetail>
          <StyledDetail>
            <StyledDetailLabel>State/Province:</StyledDetailLabel>
            <StyledDetailContent>{state && state.name}</StyledDetailContent>
          </StyledDetail>
          <StyledDetail>
            <StyledDetailLabel>ZIP/Postal Code:</StyledDetailLabel>
            <StyledDetailContent>{propertyAddress.zip}</StyledDetailContent>
          </StyledDetail>
          <StyledDetail>
            <StyledDetailLabel>Country:</StyledDetailLabel>
            <StyledDetailContent>{country && country.name}</StyledDetailContent>
          </StyledDetail>
        </StyledInlineWrapper>
      </StyledPanelContentWrapper>
    </Panel>
  )
}

export default PropertyDetailsPanel
