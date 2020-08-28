import { BrokerageOwnerQueryVariables, CreateBrokerageMutation, CreateBrokerageMutationVariables, EnabledPhotoPresetCreateInput, MeQuery } from '#veewme/gen/graphqlTypes'
import { BrokerageOwner, CreateBrokerage, Me } from '#veewme/lib/graphql/queries'
import { privateUrls } from '#veewme/lib/urls'
import { BrokerFormValues } from '#veewme/web/common/formPanels/valuesInterfaces'
import * as log from '#veewme/web/common/log'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useToasts } from 'react-toast-notifications'
import BrokerForm from './brokerForm'
import { useInitializeBrokerageForm } from './initializeBrokerageForm'
import { BrokerageOwnerQueryData } from './queriesDataTypes'

// TODO Check user role for brokerage creation

const NewBroker: React.FunctionComponent<RouteComponentProps> = props => {
  const { addToast } = useToasts()

  const { loading: loadingMe } = useQuery<MeQuery>(Me,
    {
      fetchPolicy: 'cache-only',
      onCompleted: result => executeOwnerQuery({ variables: { id: result.me.accountId } })
    }
  )

  const [ executeOwnerQuery, { data: ownerData, loading: loadingBrokerage }] = useLazyQuery<BrokerageOwnerQueryData, BrokerageOwnerQueryVariables>(BrokerageOwner, {
    onError: error => log.debug('Query BrokerageOwner error:', error.message)
  })

  const [values, formOptions] = useInitializeBrokerageForm(ownerData && ownerData.affiliate)

  const [createBrokerage, { loading: loadingCreateBrokerage }] = useMutation<CreateBrokerageMutation, CreateBrokerageMutationVariables>(
    CreateBrokerage,
    {
      onCompleted: result => {
        addToast(
          `Broker ${result.createBrokerage.companyName} was created successfully`,
          { appearance: 'success', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
        props.history.push(`${privateUrls.brokerages}?allowRedirect`)
      },
      onError: error => {
        addToast(
          `Error ${error.message} while creating broker`,
          { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
        log.debug(error.message)
      }
    }
  )

  const handleSubmit = (submitValues: BrokerFormValues) => {
    const { music, ...newValues } = submitValues
    createBrokerage({
      variables: {
        ...newValues,
        owner: newValues.ownerId,
        photoDownloadPresets: newValues.photoDownloadPresets.map<EnabledPhotoPresetCreateInput>(preset => ({
          downloadTrigger: preset.downloadTrigger,
          enabled: preset.enabled,
          photoPresetId: preset.photoPreset.id
        }))
      }
    })
    .catch(e => log.debug(e.message))
  }

  const loading = loadingBrokerage || loadingCreateBrokerage || loadingMe

  return (
    <>
      <DotSpinnerModal isOpen={loading} />
      {ownerData &&
        <BrokerForm
          formOptions={formOptions}
          values={values}
          onSubmit={handleSubmit}
        />
      }
    </>
  )
}

export default withRouter(NewBroker)
