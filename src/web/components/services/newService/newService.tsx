import { CreateServiceMutation, CreateServiceMutationVariables } from '#veewme/graphql/types'
import { CreateService } from '#veewme/lib/graphql/queries'
import { Service } from '#veewme/lib/types'
import { privateUrls } from '#veewme/lib/urls'
import * as log from '#veewme/web/common/log'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { useMutation } from '@apollo/react-hooks'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Form from './form'

const NewService: React.FunctionComponent<RouteComponentProps> = props => {
  const { addToast } = useToasts()

  const [createService, { loading }] = useMutation<CreateServiceMutation, CreateServiceMutationVariables>(
    CreateService,
    {
      onCompleted: () => {
        addToast(
          `Service was created successfully`,
          { appearance: 'success', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
        props.history.push(`${privateUrls.services}?allowRedirect`)
      },
      onError: error => {
        addToast(
          `Error ${error.message} while creating the service`,
          { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
      }
    }
  )

  const handleSubmit = (values: Service) => {
    createService({
      variables: values
    })
    .catch(e => log.debug(e.message))
  }

  return (
    <>
      {loading &&
        <DotSpinnerModal
          isOpen={loading}
        />
      }
      <Form
        onSubmit={handleSubmit}
        services={[]}
      />
    </>
  )
}

export default withRouter(NewService)
