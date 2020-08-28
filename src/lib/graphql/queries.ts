import gql from 'graphql-tag'

export const DemoImages = gql`
  query DemoImages($id: Int!) {
    demoImages(where: { id: $id }) {
      id
      images {
        id
        filename
        path
      }
      cropImages {
        id
        filename
        path
      }
    }
  }
`

export const AddDemoImages = gql`
  mutation AddDemoImages(
    $id: Int!
    $images: [Upload!]!
    $cropImages: [Upload!]!
  ) {
    addDemoImages(
      data: {
        images: $images
        cropImages: $cropImages
      }
      where: { id: $id }
    ) {
      id
    }
  }
`

export const Me = gql`
  query Me {
    me {
      accountId
      firstName
      lastName
      role
    }
  }
`

export const Orders = gql`
  query Orders {
    orders {
      id
      agent
      agentEmail
      agentPin
      active
      address
      beds
      baths
      broker
      cost
      date
      images
      MLS
      officeTel
      mobileTel
      price
      services {
        id
        category {
          id
          color {
            a
            b
            g
            r
          }
          icon
          label
        }
        date
        name
        photographer {
          id
          user {
            firstName
            lastName
          }
        }
        status
        time
      }
      sqfeet
      status
      surface
      thumb
      videos {
        id
      }
    }
  }
`

export const PendingOrders = gql`
  query PendingOrders {
    pendingOrders {
      id
      address
      agent
      date
      services {
        date
        done
        photographer { id }
        service
      }
      status
    }
  }
`

export const Photographers = gql`
  query Photographers {
    photographers {
      id
      activatable
      city
      phone
      region { label }
      schedulable
      user {
        firstName
        lastName
      }
      thumb
    }
  }
`

export const ServiceCategories = gql`
  query ServiceCategories {
    serviceCategories {
      id
      color {
        a
        b
        g
        r
      }
      icon
      label
    }
  }
`

export const Services = gql`
  query Services {
    services {
      id
      assignable
      category {
        id
        color {
          a
          b
          g
          r
        }
        icon
        label
      }
      defaultCompensation
      defaultPay
      duration
      durationUnit
      link
      mediaOnly
      name
      note
      orderNotifyEmail
      packageServices {
        id
      }
      photographer {
        id
        activatable
        city
        phone
        region { label }
        schedulable
        user {
          firstName
          lastName
        }
        thumb
      }
      photographerPay
      price
      processor
      propertySite
      region
      regions {
        adjustedCompensation
        adjustedPrice
        custom
        name
      }
      serviceType
      suspended
      tourNotifyEmail
    }
  }
`

export const CreateService = gql`
  mutation CreateService($name: String!) {
    createService(data: {
      assignable: false
      category: {
        create: {
          color: {
            create: {
              a: 1
              b: 0
              g: 0
              r: 0
            }
          }
          icon: Photo
          label: "some category"
        }
      }
      defaultPay: 0
      duration: 1
      durationUnit: Hour
      mediaOnly: false
      name: $name
      photographer: {
        create: {
          activatable: false
          city: "New York"
          phone: "123"
          user: { create: {
            email: "servicePhotographer1@veewme.com"
            firstName: "Test"
            lastName: "Photographer"
            password: "password"
          }}
          schedulable: true
        }
      }
      price: 123
      processor: "Processor"
      propertySite: false
      region: "some region"
      serviceType: Primary
      sourceType: New
      suspended: false
    }) {
      name
    }
  }
`

export const CreateDemoThing = gql`
  mutation createDemoThing($foo: String, $bar: Int!) {
    createDemoThing(data: {
      foo: $foo
      bar: $bar
    }) {
      id
      foo
      bar
    }
  }
`

export const AllDemoThings = gql`
  query allDemoThings {
    demoThings {
      id
      foo
      bar
    }
  }
`

export const AffiliateAccount = gql`
  query affiliateAccount($id: Int!) {
    affiliate(where: { id: $id }) {
      id
      areasCovered
      city
      companyName
      country
      defaultColorScheme {
        r
        g
        b
        a
      }
      description
      emailOffice
      featuredPropertySites {
        id
      }
      mediaExports {
        id
        height
        name
        resolution
        width
      }
      permissionsAndSettings {
        allowClientBillingAccess
        allowClientMediaUpload
        allowClientOrders
        orderConfirmationEmailRider
        sendWelcomeEmailsToNewClients
      }
      phone
      phoneOffice
      regions {
        id
        label
      }
      state
      street
      tourColor {
        r
        g
        b
        a
      }
      usefulLinks {
        propertySiteLink
        loginLink
        signupLink
      }
      user {
        email
        firstName
        lastName
      }
      website
      whiteLabel {
        customDomain
        enabled
      }
      zip
    }
  }
`

export const Affiliate = gql`
  query affiliate($id: Int!) {
    affiliate(where: { id: $id }) {
      id
      areasCovered
      city
      companyName
      country
      defaultColorScheme {
        id
        r
        g
        b
        a
      }
      description
      emailOffice
      featuredPropertySites {
        id
      }
      mediaExports {
        id
        height
        name
        resolution
        width
      }
      permissionsAndSettings {
        id
        allowClientBillingAccess
        allowClientMediaUpload
        allowClientOrders
        orderConfirmationEmailRider
        sendWelcomeEmailsToNewClients
      }
      phone
      phoneOffice
      regions {
        id
        label
      }
      state
      street
      user {
        id
        email
        firstName
        joinDate
        lastActive
        lastName
        password
        role
      }
      website
      whiteLabel {
        id
        customDomain
        enabled
      }
      zip
    }
  }
`

export const Affiliates = gql`
  query affiliates {
    affiliates {
      agents {
        id
      }
      city
      companyName
      country
      emailOffice
      id
      orders {
        id
      }
      phone
      phoneOffice
      state
      status {
        id
        activityStatus
        confirmed
        type
      }
      user {
        email
        firstName
        joinDate
        lastActive
        lastName
      }
      website
      whiteLabel {
        enabled
      }
    }
  }
`

export const CreateAffiliate = gql`
  mutation createAffiliate(
    $city: String!
    $companyName: String!
    $country: Country!
    $phone: String!
    $state: State!
    $street: String!
    $user: UserSignupInput!
    $website: String
    $zip: String!
  ) {
    createAffiliate(data: {
      city: $city
      companyName: $companyName
      country: $country
      phone: $phone
      state: $state
      street: $street
      user: $user
      website: $website
      zip: $zip
    }) {
      id
      companyName
      user {
        email
      }
    }
  }
`

export const DeleteAffiliate = gql`
  mutation deleteAffiliate(
    $id: Int!
  ) {
    deleteAffiliate(where: {
      id: $id
    }) {
      id
    }
  }
`

export const UpdateAffiliate = gql`
  mutation updateAffiliate(
    $id: Int!
    $areasCovered: String
    $city: String
    $companyName: String
    $country: Country
    $defaultColorScheme: ColorUpdateDataInput
    $description: Json
    $emailOffice: String
    $featuredPropertySites: [Int!]
    $mediaExports: [PhotoPresetInput!]
    $permissionsAndSettings: AffiliateSettingsUpdateDataInput
    $phone: String!
    $phoneOffice: String
    $regions: [RegionUpdateInput!]
    $state: State
    $street: String
    $tourColor: ColorUpdateDataInput
    $user: UserUpdateDataInput
    $website: String
    $whiteLabel: WhiteLabelUpdateDataInput
    $zip: String
  ) {
    updateAffiliate(
      data: {
        areasCovered: $areasCovered
        city: $city
        companyName: $companyName
        country: $country
        defaultColorScheme: $defaultColorScheme
        description: $description
        emailOffice: $emailOffice
        featuredPropertySites: $featuredPropertySites
        mediaExports: $mediaExports
        permissionsAndSettings: $permissionsAndSettings
        phone: $phone
        phoneOffice: $phoneOffice
        regions: $regions
        state: $state
        street: $street
        tourColor: $tourColor
        user: $user
        website: $website
        whiteLabel: $whiteLabel
        zip: $zip
      },
      where: {
        id: $id
      }
    ) {
      id
      companyName
      user {
        email
        firstName
        lastName
      }
    }
  }
`

export const ToggleAffiliateStatus = gql`
  mutation ToggleAffiliateStatus(
    $id: Int!
    $status: AffiliateStatusUpdateDataInput!
  ) {
    updateAffiliate(
      data: {
        status: $status
      }
      where: { id: $id }
    ) {
      id
      companyName
      user { email }
    }
  }
`

export const AffiliateForCreatingItems = gql`
  query AffiliateForCreatingItems($id: Int!) {
    affiliate(where: { id: $id }) {
      id
      brokerages {
        id
        companyName
      }
      regions {
        id
        label
      }
    }
  }
`

export const AgentAccount = gql`
  query AgentAccount($id: Int!) {
    agent (where: { id: $id }) {
      id
      affiliate {
        id
        brokerages {
          id
          companyName
        }
        regions {
          id
          label
        }
      }
      agentMLSid
      bio
      brokerage {
        id
      }
      city
      country
      defaultColorScheme {
        a
        b
        g
        r
      }
      designations
      displayAgentCompanyLogoOnTopOfEachTour
      emailCC
      emailCCOnorderCompleted
      emailCCOnorderPlaced
      emailOffice
    hideAnimateNavigationBar
      others
      phone
      phoneMobile
      phoneAlternate
      profileUrl
      region { id }
      removeExternalLinksFromUnbrandedTourFooter
      removePhotographerBrandingFromBrandedTour
      removePhotographerBrandingFromUnbrandedTour
      removePropertyAddressFromUnbrandedTours
      showPatternOverlayOnSlideShowAndVideoOverviewTour
      showViewAdditionalPropertiesButtonOnTours
      status
      state
      street
      title
      user {
        email
        firstName
        lastName
        role
      }
      website
      zip
    }
  }
`

export const Agent = gql`
  query Agent($id: Int!) {
    agent(where: { id: $id }) {
      id
      agentMLSid
      affiliate {
        id
        brokerages {
          id
          companyName
        }
        regions {
          id
          label
        }
      }
      bio
      brokerage {
        id
      }
      city
      country
      defaultColorScheme {
        a
        b
        g
        r
      }
      designations
      displayAgentCompanyLogoOnTopOfEachTour
      emailCC
      emailCCOnorderCompleted
      emailCCOnorderPlaced
      emailOffice
      flyerDisclaimer
      flyerLayout
      hideAnimateNavigationBar
      hideFlyerFromPropertySiteTour
      internalNote
      newTourOrder
      officeAdmin
      others
      phone
      phoneMobile
      phoneAlternate
      profilePicture {
        path
      }
      profileUrl
      region {
        id
      }
      removeExternalLinksFromUnbrandedTourFooter
      removePhotographerBrandingFromBrandedTour
      removePhotographerBrandingFromUnbrandedTour
      removePropertyAddressFromUnbrandedTours
      showPatternOverlayOnSlideShowAndVideoOverviewTour
      showViewAdditionalPropertiesButtonOnTours
      specialPricing
      state
      status
      street
      title
      tourActivated
      user {
        email
        firstName
        lastName
        role
      }
      website
      zip
    }
  }
`

export const Agents = gql`
  query Agents($affiliateId: Int) {
    agents(where: { affiliate: { id: $affiliateId } }) {
      id
      brokerage {
        city
        state
        zip
        companyName
      }
      companyPay
      internalNote
      phone
      phoneMobile
      region {
        label
      }
      specialPricing
      status
      user {
        email
        firstName
        lastName
      }
      website
    }
  }
`

export const CreateAgent = gql`
  mutation CreateAgent(
    $affiliateId: Int
    $agentMLSid: String
    $bio: Json
    $brokerageId: Int
    $city: String
    $companyPay: Boolean
    $country: Country
    $defaultColorScheme: ColorCreateInput
    $designations: String
    $displayAgentCompanyLogoOnTopOfEachTour: Boolean
    $emailCC: String
    $emailCCOnorderCompleted: Boolean
    $emailCCOnorderPlaced: Boolean
    $emailOffice: String
    $flyerDisclaimer: String
    $flyerLayout: FlyerLayoutName
    $hideAnimateNavigationBar: Boolean
    $hideFlyerFromPropertySiteTour: Boolean
    $internalNote: Json
    $newTourOrder: Boolean
    $officeAdmin: Boolean
    $others: String
    $phone: String!
    $phoneMobile: String
    $phoneAlternate: String
    $profilePicture: Upload
    $profileUrl: String
    $regionId: Int
    $removeExternalLinksFromUnbrandedTourFooter: Boolean
    $removePhotographerBrandingFromBrandedTour: Boolean
    $removePhotographerBrandingFromUnbrandedTour: Boolean
    $removePropertyAddressFromUnbrandedTours: Boolean
    $showPatternOverlayOnSlideShowAndVideoOverviewTour: Boolean
    $showViewAdditionalPropertiesButtonOnTours: Boolean
    $specialPricing: Boolean
    $state: State
    $street: String
    $title: String
    $tourActivated: Boolean
    $user: UserCreateInput!
    $website: String
    $zip: String
  ) {
    createAgent(data: {
      affiliateId: $affiliateId
      agentMLSid: $agentMLSid
      bio: $bio
      brokerageId: $brokerageId
      city: $city
      companyPay: $companyPay
      country: $country
      defaultColorScheme: $defaultColorScheme
      designations: $designations
      displayAgentCompanyLogoOnTopOfEachTour: $displayAgentCompanyLogoOnTopOfEachTour
      emailCC: $emailCC
      emailCCOnorderCompleted: $emailCCOnorderCompleted
      emailCCOnorderPlaced: $emailCCOnorderPlaced
      emailOffice: $emailOffice
      flyerDisclaimer: $flyerDisclaimer
      flyerLayout: $flyerLayout
      hideAnimateNavigationBar: $hideAnimateNavigationBar
      hideFlyerFromPropertySiteTour: $hideFlyerFromPropertySiteTour
      internalNote: $internalNote
      newTourOrder: $newTourOrder
      officeAdmin: $officeAdmin
      others: $others
      phone: $phone
      phoneMobile: $phoneMobile
      phoneAlternate: $phoneAlternate
      profilePicture: $profilePicture
      profileUrl: $profileUrl
      regionId: $regionId
      removeExternalLinksFromUnbrandedTourFooter: $removeExternalLinksFromUnbrandedTourFooter
      removePhotographerBrandingFromBrandedTour: $removePhotographerBrandingFromBrandedTour
      removePhotographerBrandingFromUnbrandedTour: $removePhotographerBrandingFromUnbrandedTour
      removePropertyAddressFromUnbrandedTours: $removePropertyAddressFromUnbrandedTours
      showPatternOverlayOnSlideShowAndVideoOverviewTour: $showPatternOverlayOnSlideShowAndVideoOverviewTour
      showViewAdditionalPropertiesButtonOnTours: $showViewAdditionalPropertiesButtonOnTours
      specialPricing: $specialPricing
      state: $state
      street: $street
      title: $title
      tourActivated: $tourActivated
      user: $user
      website: $website
      zip: $zip
    }) {
      id
      user {
        email
      }
    }
  }
`

export const SignupAgent = gql`
  mutation SignupAgent(
    $phone: String!
    $user: UserSignupInput!
    $website: String
  ) {
    signupAgent(data: {
      phone: $phone
      user: $user
      website: $website
    }) {
      id
      user {
        email
      }
    }
  }
`

export const DeleteAgent = gql`
  mutation deleteAgent(
    $id: Int!
  ) {
    deleteAgent(where: {
      id: $id
    }) {
      id
    }
  }
`

export const UpdateAgent = gql`
  mutation UpdateAgent(
    $id: Int!
    $affiliateId: Int
    $agentMLSid: String
    $bio: Json
    $brokerageId: Int
    $city: String
    $companyPay: Boolean
    $country: Country
    $defaultColorScheme: ColorUpdateDataInput
    $designations: String
    $displayAgentCompanyLogoOnTopOfEachTour: Boolean
    $emailCC: String
    $emailCCOnorderCompleted: Boolean
    $emailCCOnorderPlaced: Boolean
    $emailOffice: String
    $flyerDisclaimer: String
    $flyerLayout: FlyerLayoutName
    $hideAnimateNavigationBar: Boolean
    $hideFlyerFromPropertySiteTour: Boolean
    $internalNote: Json
    $newTourOrder: Boolean
    $officeAdmin: Boolean
    $others: String
    $phone: String
    $phoneMobile: String
    $phoneAlternate: String
    $profilePicture: Upload
    $profileUrl: String
    $regionId: Int
    $removeExternalLinksFromUnbrandedTourFooter: Boolean
    $removePhotographerBrandingFromBrandedTour: Boolean
    $removePhotographerBrandingFromUnbrandedTour: Boolean
    $removePropertyAddressFromUnbrandedTours: Boolean
    $showPatternOverlayOnSlideShowAndVideoOverviewTour: Boolean
    $showViewAdditionalPropertiesButtonOnTours: Boolean
    $specialPricing: Boolean
    $state: State
    $street: String
    $title: String
    $tourActivated: Boolean
    $user: UserUpdateDataInput
    $website: String
    $zip: String
  ) {
    updateAgent(data: {
      affiliateId: $affiliateId
      agentMLSid: $agentMLSid
      bio: $bio
      brokerageId: $brokerageId
      city: $city
      companyPay: $companyPay
      country: $country
      defaultColorScheme: $defaultColorScheme
      designations: $designations
      displayAgentCompanyLogoOnTopOfEachTour: $displayAgentCompanyLogoOnTopOfEachTour
      emailCC: $emailCC
      emailCCOnorderCompleted: $emailCCOnorderCompleted
      emailCCOnorderPlaced: $emailCCOnorderPlaced
      emailOffice: $emailOffice
      flyerDisclaimer: $flyerDisclaimer
      flyerLayout: $flyerLayout
      hideAnimateNavigationBar: $hideAnimateNavigationBar
      hideFlyerFromPropertySiteTour: $hideFlyerFromPropertySiteTour
      internalNote: $internalNote
      newTourOrder: $newTourOrder
      officeAdmin: $officeAdmin
      others: $others
      phone: $phone
      phoneMobile: $phoneMobile
      phoneAlternate: $phoneAlternate
      profilePicture: $profilePicture
      profileUrl: $profileUrl
      regionId: $regionId
      removeExternalLinksFromUnbrandedTourFooter: $removeExternalLinksFromUnbrandedTourFooter
      removePhotographerBrandingFromBrandedTour: $removePhotographerBrandingFromBrandedTour
      removePhotographerBrandingFromUnbrandedTour: $removePhotographerBrandingFromUnbrandedTour
      removePropertyAddressFromUnbrandedTours: $removePropertyAddressFromUnbrandedTours
      showPatternOverlayOnSlideShowAndVideoOverviewTour: $showPatternOverlayOnSlideShowAndVideoOverviewTour
      showViewAdditionalPropertiesButtonOnTours: $showViewAdditionalPropertiesButtonOnTours
      specialPricing: $specialPricing
      state: $state
      street: $street
      title: $title
      tourActivated: $tourActivated
      user: $user
      website: $website
      zip: $zip
    }
    where: { id: $id }
  ) {
      id
      user {
        email
      }
    }
  }
`

export const UpdateAgentAccount = gql`
  mutation UpdateAgentAccount(
    $id: Int!
    $affiliateId: Int
    $agentMLSid: String
    $bio: Json
    $brokerageId: Int
    $city: String
    $country: Country
    $defaultColorScheme: ColorUpdateDataInput
    $designations: String
    $displayAgentCompanyLogoOnTopOfEachTour: Boolean
    $emailCC: String
    $emailCCOnorderCompleted: Boolean
    $emailCCOnorderPlaced: Boolean
    $emailOffice: String
    $hideAnimateNavigationBar: Boolean
    $others: String
    $phone: String
    $phoneMobile: String
    $phoneAlternate: String
    $profileUrl: String
    $removeExternalLinksFromUnbrandedTourFooter: Boolean
    $removePhotographerBrandingFromBrandedTour: Boolean
    $removePhotographerBrandingFromUnbrandedTour: Boolean
    $removePropertyAddressFromUnbrandedTours: Boolean
    $showPatternOverlayOnSlideShowAndVideoOverviewTour: Boolean
    $showViewAdditionalPropertiesButtonOnTours: Boolean
    $state: State
    $street: String
    $title: String
    $user: UserUpdateDataInput
    $website: String
    $zip: String
  ) {
    updateAgent(data: {
      affiliateId: $affiliateId
      agentMLSid: $agentMLSid
      bio: $bio
      brokerageId: $brokerageId
      city: $city
      country: $country
      defaultColorScheme: $defaultColorScheme
      designations: $designations
      displayAgentCompanyLogoOnTopOfEachTour: $displayAgentCompanyLogoOnTopOfEachTour
      emailCC: $emailCC
      emailCCOnorderCompleted: $emailCCOnorderCompleted
      emailCCOnorderPlaced: $emailCCOnorderPlaced
      emailOffice: $emailOffice
      hideAnimateNavigationBar: $hideAnimateNavigationBar
      others: $others
      phone: $phone
      phoneMobile: $phoneMobile
      phoneAlternate: $phoneAlternate
      profileUrl: $profileUrl
      removeExternalLinksFromUnbrandedTourFooter: $removeExternalLinksFromUnbrandedTourFooter
      removePhotographerBrandingFromBrandedTour: $removePhotographerBrandingFromBrandedTour
      removePhotographerBrandingFromUnbrandedTour: $removePhotographerBrandingFromUnbrandedTour
      removePropertyAddressFromUnbrandedTours: $removePropertyAddressFromUnbrandedTours
      showPatternOverlayOnSlideShowAndVideoOverviewTour: $showPatternOverlayOnSlideShowAndVideoOverviewTour
      showViewAdditionalPropertiesButtonOnTours: $showViewAdditionalPropertiesButtonOnTours
      state: $state
      street: $street
      title: $title
      user: $user
      website: $website
      zip: $zip
    },
    where: { id: $id }
  ) {
      id
      user {
        email
        firstName
        lastName
      }
    }
  }
`

export const ToggleAgentStatus = gql`
  mutation ToggleAgentStatus(
    $id: Int!
    $status: ActivityStatus!
  ) {
    updateAgent(data: {
      affiliateId: null
      status: $status
      brokerageId: null
    }
    where: { id: $id }
  ) {
      id
      user {
        email
      }
      status
    }
  }
`

export const BrokerageOwner = gql`
  query brokerageOwner($id: Int!) {
    affiliate(where: { id: $id }) {
      id
      mediaExports {
        id
        height
        name
        resolution
        width
      }
      regions {
        id
        label
      }
    }
  }
`

export const Brokerage = gql`
  query Brokerage($brokerageId: Int!) {
    brokerage(where: { id: $brokerageId }) {
      id
      brokerSubsidy
      city
      companyName
      companyPay
      country
      defaultColorScheme {
        a
        b
        g
        r
      }
      discount
      displayAgentCompanyLogoOnTopOfEachTour
      emailOffice
      flyerDisclaimer
      flyerLayout
      hideAnimateNavigationBar
      hideFlyerFromPropertySiteTour
      owner {
        id
        mediaExports {
          id
          height
          name
          resolution
          width
        }
        regions {
          id
          label
        }
      }
      phone
      photoDownloadPresets {
        id
        photoPreset {
          id
          height
          name
          resolution
          width
        }
        enabled
        downloadTrigger
      }
      propertySiteMediaStyle
      region {
        id
        label
      }
      removeExternalLinksFromUnbrandedTourFooter
      removePhotographerBrandingFromBrandedTour
      removePhotographerBrandingFromUnbrandedTour
      removePropertyAddressFromUnbrandedTours
      showPatternOverlayOnSlideShowAndVideoOverviewTour
      showViewAdditionalPropertiesButtonOnTours
      specialPricing
      state
      street
      website
      zip
    }
  }
`

export const Brokerages = gql`
  query Brokerages($ownerId: Int) {
    brokerages (where: { owner: { id: $ownerId } }){
      id
      agents {
        id
      }
      city
      companyName
      companyPay
      country
      offices {
        id
      }
      region {
        label
      }
      specialPricing
      status
      state
      street
      zip
    }
  }
`

export const CreateBrokerage = gql`
  mutation CreateBrokerage(
      $brokerSubsidy: Boolean
      $city: String!
      $companyName: String!
      $companyPay: Boolean
      $country: Country!
      $defaultColorScheme: ColorCreateInput!
      $discount: String
      $displayAgentCompanyLogoOnTopOfEachTour: Boolean
      $emailOffice: String
      $flyerDisclaimer: String
      $flyerLayout: FlyerLayoutName
      $hideAnimateNavigationBar: Boolean
      $hideFlyerFromPropertySiteTour: Boolean
      $owner: Int!
      $phone: String!
      $photoDownloadPresets: [EnabledPhotoPresetCreateInput!]!
      $propertySiteMediaStyle: PropertySiteMediaStyles!
      $regionId: Int!
      $removeExternalLinksFromUnbrandedTourFooter: Boolean
      $removePhotographerBrandingFromBrandedTour: Boolean
      $removePhotographerBrandingFromUnbrandedTour: Boolean
      $removePropertyAddressFromUnbrandedTours: Boolean
      $showPatternOverlayOnSlideShowAndVideoOverviewTour: Boolean
      $showViewAdditionalPropertiesButtonOnTours: Boolean
      $specialPricing: Boolean
      $state: State!
      $street: String!
      $website: String
      $zip: String!
    ) {
    createBrokerage(data: {
      brokerSubsidy: $brokerSubsidy
      city: $city
      companyName: $companyName
      companyPay: $companyPay
      country: $country
      defaultColorScheme: $defaultColorScheme
      discount: $discount
      displayAgentCompanyLogoOnTopOfEachTour: $displayAgentCompanyLogoOnTopOfEachTour
      emailOffice: $emailOffice
      flyerDisclaimer: $flyerDisclaimer
      flyerLayout: $flyerLayout
      hideAnimateNavigationBar: $hideAnimateNavigationBar
      hideFlyerFromPropertySiteTour: $hideFlyerFromPropertySiteTour
      owner: $owner
      phone: $phone
      photoDownloadPresets: $photoDownloadPresets
      propertySiteMediaStyle: $propertySiteMediaStyle
      regionId: $regionId
      removeExternalLinksFromUnbrandedTourFooter: $removeExternalLinksFromUnbrandedTourFooter
      removePhotographerBrandingFromBrandedTour: $removePhotographerBrandingFromBrandedTour
      removePhotographerBrandingFromUnbrandedTour: $removePhotographerBrandingFromUnbrandedTour
      removePropertyAddressFromUnbrandedTours: $removePropertyAddressFromUnbrandedTours
      showPatternOverlayOnSlideShowAndVideoOverviewTour: $showPatternOverlayOnSlideShowAndVideoOverviewTour
      showViewAdditionalPropertiesButtonOnTours: $showViewAdditionalPropertiesButtonOnTours
      specialPricing: $specialPricing
      state: $state
      street: $street
      website: $website
      zip: $zip
    }) {
      id
      companyName
    }
  }
`

export const UpdateBrokerage = gql`
  mutation updateBrokerage(
    $id: Int!
    $brokerSubsidy: Boolean
    $city: String
    $companyName: String
    $companyPay: Boolean
    $country: Country
    $defaultColorScheme: ColorUpdateDataInput
    $discount: String
    $displayAgentCompanyLogoOnTopOfEachTour: Boolean
    $emailOffice: String
    $flyerDisclaimer: String
    $flyerLayout: FlyerLayoutName
    $hideAnimateNavigationBar: Boolean
    $hideFlyerFromPropertySiteTour: Boolean
    $phone: String
    $photoDownloadPresets: [EnabledPhotoPresetUpdateInput!]
    $propertySiteMediaStyle: PropertySiteMediaStyles
    $regionId: Int!
    $removeExternalLinksFromUnbrandedTourFooter: Boolean
    $removePhotographerBrandingFromBrandedTour: Boolean
    $removePhotographerBrandingFromUnbrandedTour: Boolean
    $removePropertyAddressFromUnbrandedTours: Boolean
    $showPatternOverlayOnSlideShowAndVideoOverviewTour: Boolean
    $showViewAdditionalPropertiesButtonOnTours: Boolean
    $specialPricing: Boolean
    $state: State
    $status: ActivityStatus
    $street: String
    $website: String
    $zip: String
  ) {
    updateBrokerage(
      data: {
        brokerSubsidy: $brokerSubsidy
        city: $city
        companyName: $companyName
        companyPay: $companyPay
        country: $country
        defaultColorScheme: $defaultColorScheme
        discount: $discount
        displayAgentCompanyLogoOnTopOfEachTour: $displayAgentCompanyLogoOnTopOfEachTour
        emailOffice: $emailOffice
        flyerDisclaimer: $flyerDisclaimer
        flyerLayout: $flyerLayout
        hideAnimateNavigationBar: $hideAnimateNavigationBar
        hideFlyerFromPropertySiteTour: $hideFlyerFromPropertySiteTour
        phone: $phone
        photoDownloadPresets: $photoDownloadPresets
        propertySiteMediaStyle: $propertySiteMediaStyle
        regionId: $regionId
        removeExternalLinksFromUnbrandedTourFooter: $removeExternalLinksFromUnbrandedTourFooter
        removePhotographerBrandingFromBrandedTour: $removePhotographerBrandingFromBrandedTour
        removePhotographerBrandingFromUnbrandedTour: $removePhotographerBrandingFromUnbrandedTour
        removePropertyAddressFromUnbrandedTours: $removePropertyAddressFromUnbrandedTours
        showPatternOverlayOnSlideShowAndVideoOverviewTour: $showPatternOverlayOnSlideShowAndVideoOverviewTour
        showViewAdditionalPropertiesButtonOnTours: $showViewAdditionalPropertiesButtonOnTours
        specialPricing: $specialPricing
        state: $state
        status: $status
        street: $street
        website: $website
        zip: $zip
      },
      where: $id
    ) {
      id
    }
  }
`

export const ToggleBrokerageAcitivityStatus = gql`
  mutation toggleBrokerageAcitivityStatus(
    $id: Int!
    $status: ActivityStatus!
  ) {
    toggleBrokerageAcitivityStatus(
      data: {
        status: $status
      }
      where: $id
    ) {
      id
    }
  }
`

export const DeleteBrokerage = gql`
  mutation deleteBrokerage(
    $id: Int!
  ) {
    deleteBrokerage(where: {
      id: $id
    }) {
      id
    }
  }
`

export const LogIn = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(data: {
      email: $email
      password: $password
    }) {
      id
    }
  }
`

export const LogOut = gql`
  mutation LogOut($noargs: Boolean = true) {
    logOut(noargs: $noargs)
  }
`

export const TourBanner = gql`
  query TourBanner($id: Int!) {
    tourBanner(where: { id: $id }) {
      id
      color {
        a
        b
        g
        r
      }
      label
      blackText
    }
  }
`

export const TourBanners = gql`
  query TourBanners {
    tourBanners {
      id
      color {
        a
        b
        g
        r
      }
      label
      blackText
    }
  }
`

export const CreateTourBanner = gql`
  mutation CreateTourBanner(
    $label: String!
    $color: ColorCreateInput!
    $blackText: Boolean
  ) {
    createTourBanner(data: {
      color: $color
      label: $label
      blackText: $blackText
    }) {
      id
      label
    }
  }
`

export const UpdateTourBanner = gql`
  mutation UpdateTourBanner(
    $id: Int!
    $label: String!
    $color: ColorUpdateDataInput!
    $blackText: Boolean
  ) {
    updateTourBanner(
      data: {
        color: $color
        label: $label
        blackText: $blackText
      },
      where: {
        id: $id
      }
    ) {
      id
      label
    }
  }
`

export const DeleteTourBanner = gql`
  mutation DeleteTourBanner($id: Int!) {
    deleteTourBanner(where: { id: $id }) {
      id
      label
    }
  }
`

export const DemoUpload = gql`
  mutation DemoUpload($data: Upload!) {
    demoUpload(data: $data)
  }
`

export const CheckWhiteLabel = gql`
  mutation CheckWhiteLabel($id: Int! $cname: String!) {
    checkWhiteLabel(data: {
      id: $id
      cname: $cname
    })
  }
`

export const Processor = gql`
  query Processor($processorId: Int!) {
    processor(where: { id: $processorId }) {
      id
      activatable
      affiliate {
        regions {
          id
          label
        }
      }
      city
      country
      enableServiceDone
      internalNote
      phone
      regionId
      schedulable
      state
      street
      user {
        email
        firstName
        lastName
      }
      website
      zip
    }
  }
`

export const Processors = gql`
  query Processors {
    processors {
      id
      activatable
      affiliate {
        regions {
          id
          label
        }
      }
      city
      enableServiceDone
      internalNote
      phone
      region { label }
      schedulable
      state
      street
      user {
        email
        firstName
        lastName
      }
      zip
    }
  }
`

export const DeleteProcessor = gql`
  mutation deleteProcessor(
    $id: Int!
  ) {
    deleteProcessor(where: {
      id: $id
    }) {
      id
    }
  }
`

export const CreateProcessor = gql`
  mutation createProcessor(
    $activatable: Boolean
    $affiliateId: Int
    $city: String
    $country: Country
    $enableServiceDone: Boolean
    $internalNote: Json
    $phone: String
    $regionId: Int
    $schedulable: Boolean
    $state: String
    $street: String
    $user: UserCreateInput!
    $website: String
    $zip: String
  ) {
    createProcessor(data: {
      activatable: $activatable
      affiliateId: $affiliateId
      city: $city
      country: $country
      enableServiceDone: $enableServiceDone
      internalNote: $internalNote
      phone: $phone
      regionId: $regionId
      schedulable: $schedulable
      state: $state
      street: $street
      user: $user
      website: $website
      zip: $zip
    }) {
      id
      country
      phone
      street
      state
      zip
    }
  }
`

export const UpdateProcessor = gql`
  mutation updateProcessor(
    $id: Int!
    $activatable: Boolean
    $affiliateId: Int
    $city: String
    $country: Country
    $enableServiceDone: Boolean
    $internalNote: Json
    $phone: String
    $regionId: Int
    $schedulable: Boolean
    $state: String
    $street: String
    $user: UserUpdateInput
    $website: String
    $zip: String
  ) {
    updateProcessor(data: {
      activatable: $activatable
      affiliateId: $affiliateId
      city: $city
      country: $country
      enableServiceDone: $enableServiceDone
      internalNote: $internalNote
      phone: $phone
      regionId: $regionId
      schedulable: $schedulable
      state: $state
      street: $street
      user: $user
      website: $website
      zip: $zip
    }, where: {
      id: $id
    }) {
      user {
        firstName
        lastName
      }
      country
      phone
      street
      state
      zip
    }
  }
`
