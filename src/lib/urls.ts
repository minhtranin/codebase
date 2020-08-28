interface URLlist {
  [urlName: string]: string
}

const privatePage = '/panel'
const publicPage = ''

const account = `${privatePage}/account`
const affiliates = `${privatePage}/affiliates`
const clients = `${privatePage}/clients`
const dashboard = `${privatePage}/`
const dev = `${privatePage}/dev` // TODO TMP demo pages for testing components,
const employees = `${privatePage}/employees`
const jobs = `${privatePage}/jobs`
const orders = `${privatePage}/orders`
const mediaAccess = `${privatePage}/media-access`
const panel = `${privatePage}/`
const photographers = `${privatePage}/fulfillment`
const services = `${privatePage}/services`
const settings = `${privatePage}/settings`
const support = `${privatePage}/support`

const accountUrls: URLlist = {
  account
}

const affiliatesUrls: URLlist = {
  affiliates,
  editAffiliate: `${affiliates}/:affiliateId`
}

const clientsUrls: URLlist = {
  addAgent: `${clients}/agent/add`,
  addBrokerage: `${clients}/brokerage/add`,
  addOffice: `${clients}/office/add`,
  agent: `${clients}/agent`,
  agents: `${clients}/agents`,
  brokerages: `${clients}/brokerages`,
  clients,
  editAgent: `${clients}/agent/:agentId`,
  editBrokerage: `${clients}/brokerages/:brokerageId`,
  offices: `${clients}/offices`
}

// TODO TMP demo pages for testing components
const devUrls: URLlist = {
  demoApi: `${dev}/demo-api`,
  demoAvatars: `${dev}/demo-avatars`,
  demoButtons: `${dev}/demo-buttons`,
  demoChips: `${dev}/demo-chips`,
  demoForm: `${dev}/demo-form`,
  demoFormAlt: `${dev}/demo-form-alternative`,
  demoGridNoContent: `${dev}/demo-grid-no-content`,
  demoMedia: `${dev}/demo-media`,
  demoModals: `${dev}/demo-modals`,
  demoSpinners: `${dev}/demo-spinners`,
  demoToasts: `${dev}/demo-toast`,
  demoUpload: `${dev}/demo-upload`,
  demoUploadImages: `${dev}/demo-upload-images`,
  demoValidation: `${dev}/demo-validation`,
  dev
}

const emplyeesUrls: URLlist = {
  addEmployee: `${employees}/add`,
  editEmployee: `${employees}/:employeeId`,
  employees
}

const ordersUrls: URLlist = {
  addOrder: `${orders}/order/add`,
  media: `${orders}/order/:orderId/media`,
  mediaOnly: `${orders}/media_only`,
  order: `${orders}/order/:orderId`,
  orders,
  pendingOrders: `${orders}/pending`
}

const singleOrderMediaUrls: URLlist = {
  addInteractive: `${ordersUrls.media}/interactive/add`,
  addVideo:  `${ordersUrls.media}/video/add`,
  document: `${ordersUrls.media}/documents/document`,
  documents: `${ordersUrls.media}/documents`,
  editDocument: `${ordersUrls.media}/documents/document/:documentId`,
  editInteractive: `${ordersUrls.media}/interactive/:interactiveId`,
  editPanorama: `${ordersUrls.media}/panoramas/:panoramaId`,
  flyer: `${ordersUrls.media}/flyer`,
  interactive: `${ordersUrls.media}/interactive`,
  panoramas: `${ordersUrls.media}/panoramas`,
  photos: `${ordersUrls.media}/photos`,
  video: `${ordersUrls.media}/video`
}

const mediaAccessUrls: URLlist = {
  mediaAccess
}

const photographersUrls: URLlist = {
  addPhotographer: `${photographers}/photographer/add`,
  addProcessor: `${photographers}/processor/add`,
  compensation: `${photographers}/compensation`,
  editPhotographer: `${photographers}/photographers/edit/:photographerId`,
  editProcessor: `${photographers}/processors/edit/:processorId`,
  photographers,
  photographersList: `${photographers}/photographers`,
  processors: `${photographers}/processors`
}

const servicesUrls: URLlist = {
  addPopup: `${services}/popup/add`,
  addPromoCode: `${services}/codes/add`,
  addService: `${services}/service/add`,
  codes: `${services}/codes`,
  popup: `${services}/popup`,
  services
}

// TODO temporary jobs pages for testing components
const jobsUrls: URLlist = {
  adminOrders: `${jobs}/admin`,
  agentOrders: `${jobs}/agent`,
  jobs,
  photographerOrders: `${jobs}/photographer`
}

const settingsUrls: URLlist = {
  addTourBanner: `${settings}/banners/add`,
  editTourBanner: `${settings}/banners/:bannerId`,
  platform: `${settings}/platform`,
  settings,
  tourBanners: `${settings}/banners`
}

export const privateUrls: URLlist = {
  ...accountUrls,
  ...affiliatesUrls,
  ...clientsUrls,
  dashboard,
  ...devUrls,
  ...emplyeesUrls,
  ...jobsUrls,
  ...mediaAccessUrls,
  ...ordersUrls,
  panel,
  ...photographersUrls,
  privatePage,
  ...servicesUrls,
  ...settingsUrls,
  ...singleOrderMediaUrls,
  support
}

const auth = `${publicPage}/auth`
const authUrls: URLlist = {
  auth,
  login: `${auth}/login`,
  logout: `${auth}/logout`,
  reset:  `${auth}/reset`,
  signup: `${publicPage}/signup`
}

const tour = `${publicPage}/tour/:tourId/l/:layoutId`

const tourUrls: URLlist = {
  tour,
  tourPhotos: `${tour}/photos`,
  tourVideo: `${tour}/video/:id?`
}

export const publicUrls: URLlist = {
  ...authUrls,
  ...tourUrls,
  contact: '#contact',
  facebook: 'https://www.facebook.com/pages/VeewMe/1540422136185736',
  landingPage: `${publicPage}/`,
  pricing: `${publicPage}/pricing`,
  privacyPolicy: `${publicPage}/privacy_policy`,
  publicPage: `${publicPage}/`,
  termsAndConditions: `${publicPage}/terms_and_conditions`,
  tours: `${publicPage}/#example_tours`,
  twitter: 'https://twitter.com/veewme'
}
