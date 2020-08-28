import { AgentQueryVariables, UpdateAgentMutation, UpdateAgentMutationVariables } from '#veewme/gen/graphqlTypes'
import { Agent, UpdateAgent } from '#veewme/lib/graphql/queries'
import { privateUrls } from '#veewme/lib/urls'
import { prepareEditorValueForStorage } from '#veewme/lib/util'
import { AgentValues } from '#veewme/web/common/formPanels/valuesInterfaces'
import * as log from '#veewme/web/common/log'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { convertFromRaw, EditorState } from 'draft-js'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useToasts } from 'react-toast-notifications'
import AgentForm from './agentForm'
import { AgentQuery } from './types'

const EditAgentForm: React.FunctionComponent<RouteComponentProps<{ agentId: string }>> = props => {
  const { addToast } = useToasts()
  const agentId = parseInt(props.match.params.agentId, 10)
  const { data, loading: queryLoading } = useQuery<AgentQuery, AgentQueryVariables>(Agent, { variables: { id: agentId } })

  const [updateAgent, { loading: updateLoading }] = useMutation<UpdateAgentMutation, UpdateAgentMutationVariables>(
    UpdateAgent,
    {
      onCompleted: result => {
        addToast(
          `Agent ${result.updateAgent.user.email} was updated successfully`,
          { appearance: 'success', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 2500 }
        )
        props.history.push(`${privateUrls.agents}?allowRedirect`)
      },
      onError: error => {
        addToast(
          `Error ${error.message} while updating Agent`,
          { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
        log.debug(error.message)
      }
    }
  )

  if (data && data.agent) {
    const {
      affiliate,
      region,
      ...agent
    } = data.agent

    return (
      <>
        <AgentForm
          affiliate={affiliate}
          initialData={{
            ...agent,
            bio: agent.bio ? EditorState.createWithContent(convertFromRaw(agent.bio)) : EditorState.createEmpty(),
            brokerageId: agent.brokerage && agent.brokerage.id,
            internalNote: agent.internalNote ? EditorState.createWithContent(convertFromRaw(agent.internalNote)) : EditorState.createEmpty(),
            propertySiteMediaShowcase: {
              showPropertyMapOnShowcasePage: false,
              topOfTheShowcasePhoto: ''
            },
            regionId: region.id
          }}
          onSubmit={(values: AgentValues) => {
            const variables = {
              ...values,
              affiliateId: affiliate.id,
              bio: prepareEditorValueForStorage(values.bio),
              id: agent.id,
              internalNote: prepareEditorValueForStorage(values.internalNote)
            }
            delete variables.propertySiteMediaShowcase // TODO add propertySiteMediaShowcase to Agents fields on the backend
            updateAgent({ variables }).catch(error => addToast(
              `Error ${error.message} while updating Agent`,
              { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
            ))
          }}
          role='AFFILIATE'
        />
        <DotSpinnerModal isOpen={queryLoading || updateLoading} />
      </>
    )
  } else {
    return <DotSpinnerModal isOpen={queryLoading || updateLoading} />
  }
}

export default withRouter(EditAgentForm)
