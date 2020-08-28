import * as log from '#veewme/web/common/log'
import * as React from 'react'
import ResetForm from './resetPasswordForm'

const ResetContainer: React.FunctionComponent = () => {
  return (
    <ResetForm onSubmit={values => log.debug(values)} />
  )
}

export default ResetContainer
