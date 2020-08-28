import { Affiliate, AffiliateAccountQueryVariables, UpdateAffiliateMutation, UpdateAffiliateMutationVariables } from '#veewme/gen/graphqlTypes'
import { AffiliateAccount as AffiliateAccountQuery, UpdateAffiliate } from '#veewme/lib/graphql/queries'
import { privateUrls } from '#veewme/lib/urls'
import * as log from '#veewme/web/common/log'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { useMutation, useQuery } from '@apollo/react-hooks'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useToasts } from 'react-toast-notifications'
import EditAffiliateForm, { FormOptions } from './editAffiliateForm'
import { editAffiliateDefaultValues } from './editAffiliateValues'
import { AffiliateAccountQueryData, AffiliateAccountQueryResult } from './queriesDataTypes'
import { EditAffiliateValues } from './types'

export const formEmptyOptions: FormOptions = {
  audioTrackOptions: [],
  regionOptions: []
}

const useInitializeAffiliateForm = (affiliate?: AffiliateAccountQueryResult): EditAffiliateValues => {
  const [values, setValues] = useState<EditAffiliateValues>({
    ...editAffiliateDefaultValues
  })

  useEffect(() => {
    if (affiliate) {
      setValues({
        ...values,
        ...affiliate,
        // TODO remove when added to the backend
        billingFrequency: editAffiliateDefaultValues.billingFrequency,
        // TODO remove when coverPhoto added to the backend
        coverPhoto: editAffiliateDefaultValues.coverPhoto,
        // TODO remove when JSON conversion added
        description: editAffiliateDefaultValues.description,
        // TODO remove when logo added on the backend
        logo: '',
        // TODO remove when regions panel updated
        regionIds: affiliate.regions.map(region => region.id)
      })
    }
  }, [affiliate])

  return values
}

export interface EditAffiliateProps {
  affiliateId: Affiliate['id']
  accountEdit?: boolean
}

const EditAffiliate: React.FunctionComponent<RouteComponentProps & EditAffiliateProps> = props => {
  const { addToast } = useToasts()

  const { data, loading: loadingAffiliateAccount } = useQuery<AffiliateAccountQueryData, AffiliateAccountQueryVariables>(AffiliateAccountQuery, {
    onError: error => log.debug('Query Affiliate Account error:', error.message),
    variables: {
      id: props.affiliateId
    }
  })

  const initialFormValues = useInitializeAffiliateForm(data && data.affiliate)

  const [updateAffiliate, { client, loading: loadingUpdateAffiliate }] = useMutation<UpdateAffiliateMutation, UpdateAffiliateMutationVariables>(
    UpdateAffiliate,
    {
      onCompleted: result => {
        addToast(
          `Affiliate was updated successfully`,
          { appearance: 'success', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
        props.accountEdit && client && client.writeData({ data: {
          me: {
            __typename: 'Account',
            firstName: result.updateAffiliate.user.firstName,
            lastName: result.updateAffiliate.user.lastName
          }
        }})
        props.history.push(`${privateUrls.panel}?allowRedirect`)
      },
      onError: error => {
        addToast(
          `Error ${error.message} while updating affiliate`,
          { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
        log.debug(error.message)
      }
    }
  )

  const handleSubmit = (newValues: EditAffiliateValues) => {
    const { logo, ...variables } = newValues
    updateAffiliate({ variables })
    .catch(e => log.debug(e.message))
  }

  const loading = loadingAffiliateAccount || loadingUpdateAffiliate

  return (
    <>
      {loading &&
        <DotSpinnerModal
          isOpen={loading}
        />
      }
      {data &&
        <EditAffiliateForm
          initialValues={initialFormValues}
          onSubmit={handleSubmit}
        />
    }
    </>
  )
}

export default withRouter(EditAffiliate)
