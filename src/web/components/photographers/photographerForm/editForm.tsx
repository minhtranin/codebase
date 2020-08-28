import { privateUrls } from '#veewme/lib/urls'
import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { PhotographerFormikForm, PhotographerProfileValues } from '../profile/profileForm'

type PhotographerEditProps = RouteComponentProps<{ photographerId: string }>
const PhotographerEdit: React.FunctionComponent<PhotographerEditProps> = props => {
  const id = props.match.params.photographerId

  const handleSubmit = (values: PhotographerProfileValues) => {
    log.debug('Submit:', id, values)
    props.history.push(privateUrls.photographersList)
  }

  return (
    <PhotographerFormikForm
      onSubmit={handleSubmit}
      role='Photographer'
      initialData={{
        city: 'Las Vegas',
        country: 'US',
        phone: '',
        state: '',
        street: '',
        user: {
          email: '',
          firstName: 'Alan',
          lastName: 'Doe'
        },
        website: '',
        zip: ''
      }}
      regions={[{
        id: 0, // TODO make optional in initial data
        label: 'Region 1'
      }]}
    />
  )

}

export default PhotographerEdit
