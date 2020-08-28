import { Affiliate, AffiliateSettings, Color, Order, PhotoPreset, Region, UsefulLinks, User, WhiteLabel } from '#veewme/gen/graphqlTypes'

export interface AffiliateAccountQueryData {
  affiliate: AffiliateAccountQueryResult
}

export type AffiliateAccountQueryResult = Pick<
    Affiliate,
    'id'
    | 'city'
    | 'companyName'
    | 'country'
    | 'description'
    | 'phone'
    | 'state'
    | 'street'
    | 'zip'
  >
  & {
    areasCovered?: string
    defaultColorScheme: Pick<
      Color,
      'id' | 'r' | 'g' | 'b' | 'a'
    >
    emailOffice?: string
    featuredPropertySites: Array<Order['id']>
    mediaExports: Array<Pick<
      PhotoPreset,
      'id' | 'height' | 'name' | 'resolution' | 'width'
    >>
    permissionsAndSettings: {
      id: AffiliateSettings['id']
      allowClientBillingAccess: boolean
      allowClientMediaUpload: boolean
      allowClientOrders: boolean
      orderConfirmationEmailRider: boolean
      sendWelcomeEmailsToNewClients: boolean
    }
    phoneOffice?: string
    regions: Array<Pick<Region, 'id' | 'label'>>
    tourColor: Pick<
      Color,
      'id' | 'r' | 'g' | 'b' | 'a'
    >
    usefulLinks: {
      id: UsefulLinks['id']
      propertySiteLink: string
      loginLink: string
      signupLink: string
    }
    user: Pick<
      User,
      | 'id'
      | 'email'
      | 'firstName'
      | 'joinDate'
      | 'lastActive'
      | 'lastName'
      | 'password'
      | 'role'
    >
    website?: string
    whiteLabel: {
      id: WhiteLabel['id']
      customDomain: string
      enabled: boolean
    }
  }
