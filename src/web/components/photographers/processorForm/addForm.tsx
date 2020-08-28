import { AffiliateForCreatingItemsQueryVariables, MeQuery } from '#veewme/gen/graphqlTypes'
import { AffiliateForCreatingItems, CreateProcessor, Me } from '#veewme/lib/graphql/queries'
import { privateUrls } from '#veewme/lib/urls'
import { prepareEditorValueForStorage } from '#veewme/lib/util'
import * as log from '#veewme/web/common/log'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { Processor } from '../common/types'
import { ProcessorFormikForm, ProcessorProfileValues } from '../profile/profileForm'

const ProcessorAdd: React.FunctionComponent<RouteComponentProps> = props => {
  const { addToast } = useToasts()

  useQuery<MeQuery>(Me, {
    fetchPolicy: 'cache-only',
    onCompleted: result => executeAffiliateQuery({ variables: { id: result.me.accountId } })
  })

  const [
    executeAffiliateQuery,
    { data, loading: queryLoading }
  ] = useLazyQuery<{
    affiliate: {
      regions: Array<{
        id: number // TODO use graphql types
        label: string
      }>
    }
  }, AffiliateForCreatingItemsQueryVariables>(
    AffiliateForCreatingItems,
    { onError: error => log.debug('Query AgentAccount error:', error.message) }
  )

  const [createProcessor, { loading }] = useMutation<{}, Omit<Processor, 'id'>>(
    CreateProcessor,
    {
      onCompleted: () => {
        addToast(
          `Processor was created successfully`,
          { appearance: 'success', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 2500 }
        )
        props.history.push(`${privateUrls.processors}?allowRedirect`)
      },
      onError: error => {
        addToast(
          `Error ${error.message} occured.`,
          { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
      }
    }
  )

  const handleSubmit = (values: ProcessorProfileValues) => {
    log.debug('Submit:', values)
    createProcessor({
      variables: {
        ...values,
        internalNote: prepareEditorValueForStorage(values.internalNote)
      }
    }).catch(e => log.debug(e))
  }

  const loadingData = loading || queryLoading
  const loader = loadingData && <DotSpinnerModal isOpen={loadingData} />
  const regions = data && data.affiliate ? data.affiliate.regions : []

  return (
    <>
      {
        data && <ProcessorFormikForm
          regions={regions}
          onSubmit={handleSubmit}
          role='Processor'
        />
      }
      {loader}
    </>
  )

}

export default ProcessorAdd
