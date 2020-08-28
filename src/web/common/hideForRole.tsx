import { MeQuery, Role } from '#veewme/graphql/types'
import { Me } from '#veewme/lib/graphql/queries'
import * as log from '#veewme/web/common/log'
import { useQuery } from '@apollo/react-hooks'
import * as React from 'react'

interface HideForRoleProps {
  roles: Role[]
}

// Use this component only inside main app section (to make sure required data are already available in apollo cache)
const HideForRole: React.FunctionComponent<HideForRoleProps> = ({ children, roles }) => {
  const { data, loading } = useQuery<MeQuery>(Me, {
    fetchPolicy: 'cache-only'
  })

  log.debug('Hide for Role comp:', loading)
  const role = data && data.me.role
  const hide = role ? roles.find(r => r === role) : false

  return (
    <>{!hide && children}</>
  )
}

export default HideForRole
