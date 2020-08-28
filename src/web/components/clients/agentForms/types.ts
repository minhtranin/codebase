import * as GraphQLTypes from '#veewme/graphql/types'

export interface AffiliateFormOptions {
  id: GraphQLTypes.Affiliate['id']
  brokerages: Array<
    Pick<GraphQLTypes.Brokerage, 'id' | 'companyName'>
  >
  regions: Array<Pick<GraphQLTypes.Region, 'id' | 'label'>>
}

export interface AffiliateForCreatingItemsQuery {
  affiliate: AffiliateFormOptions
}

export interface AgentAccountQuery {
  agent: Pick<
    GraphQLTypes.Agent,
    | 'id'
    | 'bio'
    | 'displayAgentCompanyLogoOnTopOfEachTour'
    | 'emailCCOnorderCompleted'
    | 'emailCCOnorderPlaced'
    | 'hideAnimateNavigationBar'
    | 'removeExternalLinksFromUnbrandedTourFooter'
    | 'removePhotographerBrandingFromBrandedTour'
    | 'removePhotographerBrandingFromUnbrandedTour'
    | 'removePropertyAddressFromUnbrandedTours'
    | 'showPatternOverlayOnSlideShowAndVideoOverviewTour'
    | 'showViewAdditionalPropertiesButtonOnTours'
  > & {
    affiliate?: AffiliateFormOptions
    agentMLSid?: string
    brokerage?: Pick<GraphQLTypes.Brokerage, 'id'>
    city?: string
    country?: GraphQLTypes.Country
    defaultColorScheme: Pick<
      GraphQLTypes.Color,
      'a' | 'b' | 'g' | 'r'
    >
    designations?: string
    displayAgentCompanyLogoOnTopOfEachTour?: boolean
    emailCC?: string
    emailOffice?: string
    hideAnimateNavigationBar?: boolean
    others?: string
    phoneAlternate?: string
    phoneMobile?: string
    phoneOffice?: string
    profileUrl?: string
    removeExternalLinksFromUnbrandedTourFooter?: boolean
    removePhotographerBrandingFromBrandedTour?: boolean
    removePhotographerBrandingFromUnbrandedTour?: boolean
    removePropertyAddressFromUnbrandedTours?: boolean
    showPatternOverlayOnSlideShowAndVideoOverviewTour?: boolean
    showViewAdditionalPropertiesButtonOnTours?: boolean
    state?: GraphQLTypes.State
    street?: string
    title?: string
    user: Pick<
      GraphQLTypes.User,
      'email' | 'firstName' | 'lastName' | 'role'
    >
    website?: string
    zip?: string
  }
}

export interface AgentQuery {
  agent: Pick<
    GraphQLTypes.Agent,
    | 'id'
    | 'bio'
    | 'city'
    | 'companyPay'
    | 'displayAgentCompanyLogoOnTopOfEachTour'
    | 'emailCCOnorderCompleted'
    | 'emailCCOnorderPlaced'
    | 'hideAnimateNavigationBar'
    | 'hideFlyerFromPropertySiteTour'
    | 'newTourOrder'
    | 'removeExternalLinksFromUnbrandedTourFooter'
    | 'removePhotographerBrandingFromBrandedTour'
    | 'removePhotographerBrandingFromUnbrandedTour'
    | 'removePropertyAddressFromUnbrandedTours'
    | 'showPatternOverlayOnSlideShowAndVideoOverviewTour'
    | 'showViewAdditionalPropertiesButtonOnTours'
    | 'specialPricing'
    | 'country'
    | 'flyerLayout'
    | 'internalNote'
    | 'officeAdmin'
    | 'status'
    | 'tourActivated'
    | 'zip'
  > & {
    affiliate: AffiliateFormOptions
    agentMLSid?: string
    brokerage?: Pick<GraphQLTypes.Brokerage, 'id'>
    city?: string
    country?: GraphQLTypes.Country
    defaultColorScheme: Pick<
      GraphQLTypes.Color,
      'a' | 'b' | 'g' | 'r'
    >
    designations?: string
    emailCC?: string
    flyerDisclaimer?: string
    emailOffice?: string
    others?: string
    phoneAlternate?: string
    phoneMobile?: string
    phoneOffice?: string
    profileUrl?: string
    region: Pick<GraphQLTypes.Region, 'id' | 'label'>
    state?: GraphQLTypes.State
    street?: string
    tourActivated?: boolean
    user: Pick<
      GraphQLTypes.User,
      'email' | 'firstName' | 'lastName' | 'role'
    >
    website?: string
    title?: string
    zip?: string
  }
}
