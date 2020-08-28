import { AffiliateForCreatingItemsQueryVariables, CreateAgentMutation, CreateAgentMutationVariables, MeQuery } from '#veewme/gen/graphqlTypes'
import { AffiliateForCreatingItems, CreateAgent, Me } from '#veewme/lib/graphql/queries'
import { privateUrls } from '#veewme/lib/urls'
import { prepareEditorValueForStorage } from '#veewme/lib/util'
import * as log from '#veewme/web/common/log'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useToasts } from 'react-toast-notifications'
import AgentForm from './agentForm'
import { AffiliateForCreatingItemsQuery } from './types'

const NewAgentForm: React.FunctionComponent<RouteComponentProps> = props => {
  const { addToast } = useToasts()

  useQuery<MeQuery>(Me, {
    fetchPolicy: 'cache-only',
    onCompleted: result => executeAffiliateQuery({ variables: { id: result.me.accountId } })
  })

  const [
    executeAffiliateQuery,
    { data, loading: queryLoading }
  ] = useLazyQuery<AffiliateForCreatingItemsQuery, AffiliateForCreatingItemsQueryVariables>(
    AffiliateForCreatingItems,
    { onError: error => log.debug('Query AgentAccount error:', error.message) }
  )
  const [createAgent, { loading: createLoading }] = useMutation<CreateAgentMutation, CreateAgentMutationVariables>(
    CreateAgent,
    {
      onCompleted: result => {
        addToast(
          `Agent ${result.createAgent.user.email} was created successfully`,
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

  if (data && data.affiliate) {
    return (
      <>
        <AgentForm
          role='AFFILIATE'
          onSubmit={variables => {
            createAgent({ variables: {
              ...variables,
              affiliateId: data.affiliate.id,
              bio: prepareEditorValueForStorage(variables.bio),
              internalNote: prepareEditorValueForStorage(variables.internalNote)
            }}).catch(e => { log.debug(e.message) })
          }}
          affiliate={data.affiliate}
        />
        <DotSpinnerModal isOpen={createLoading || queryLoading} />
      </>
    )
  } else {
    return <DotSpinnerModal isOpen={createLoading || queryLoading} />
  }
}

export default withRouter(NewAgentForm)
