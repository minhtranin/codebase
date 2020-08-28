import { Role } from '#veewme/graphql/types'

export const defaultDateFormat = 'MM/DD/YYYY'
type MainRoles = Exclude<Role, 'DEVELOPER'>

type RolesAccess = {
  [K in MainRoles]: string[]
}

export const rolesAccess: RolesAccess = {
  ADMIN: [
    'Dashboard',
    'Affiliates',
    'Clients',
    'Orders',
    'Settings'
  ],
  AFFILIATE: [
    'Dashboard',
    'Clients',
    'Orders',
    'Services',
    'Fulfillment',
    'Employees'
  ],
  AGENT: [
    'Dashboard',
    'Orders',
    'Media Access'
  ],
  PHOTOGRAPHER: [
    'Dashboard',
    'Jobs'
  ],
  PROCESSOR: [
    'Dashboard',
    'Jobs'
  ]
}
