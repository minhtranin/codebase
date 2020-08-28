import { privateUrls } from '#veewme/lib/urls'
import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { PhotographerFormikForm, PhotographerProfileValues } from '../profile/profileForm'

type PhotographerAddProps = RouteComponentProps<{ photographerId: string }>
const PhotographerAdd: React.FunctionComponent<PhotographerAddProps> = props => {

  const handleSubmit = (values: PhotographerProfileValues) => {
    log.debug('Submit:', values)
    props.history.push(privateUrls.photographersList)
  }

  return (
    <PhotographerFormikForm
      onSubmit={handleSubmit}
      role='Photographer'
      regions={[{
        id: 0, // TODO make optional in initial data
        label: 'Region 1'
      }]}
    />
  )

}

export default PhotographerAdd
