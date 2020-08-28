/* TODO remove this file - Test cards data */
import { ServiceCategory } from '#veewme/graphql/types'
import { PackageCard, ServiceCard } from '#veewme/lib/types'

export const serviceCategories: ServiceCategory[] = [
  {
    color: {
      a: 1,
      b: 255,
      g: 166,
      id: 1,
      r: 61
    },
    icon: 'Photo',
    id: 1,
    label: 'Photography'
  },
  {
    color: {
      a: 1,
      b: 243,
      g: 145,
      id: 2,
      r: 129
    },
    icon: 'FloorPlan',
    id: 2,
    label: 'Floor Plan'
  },
  {
    color: {
      a: 1,
      b: 0,
      g: 156,
      id: 3,
      r: 255
    },
    icon: 'Video',
    id: 3,
    label: 'Video'
  }
]

const packageCards: PackageCard[] = [
  {
    id: 1,
    price: 350,
    services: [
      'Rapid Turnaround',
      'Video Slideshow',
      'Property Website'
    ],
    subtitles: [
      'All Inclusive Photo',
      '& Video Package'
    ],
    title: 'Special'
  },
  {
    id: 1,
    oldPrice: 525,
    price: 450,
    services: [
      'Rapid Turnaround',
      'Video Slideshow',
      'Property Website',
      'Aerial Photography',
      'Property Flyers',
      'Panorama Photo',
      '360 deg. photo',
      'Headshot',
      'Fly-around Satellite Video'
    ],
    subtitles: [
      'All Inclusive Photo',
      '& Video Package'
    ],
    title: 'Best Special'
  },
  {
    id: 2,
    oldPrice: 350,
    price: 325,
    services: [
      'Rapid Turnaround',
      'Video Slideshow',
      'Property Website',
      'Aerial Photography',
      'Property Flyers'
    ],
    subtitles: [
      'All Inclusive Photo',
      '& Video Package'
    ],
    title: 'Okay Special'
  },
  {
    id: 3,
    oldPrice: 300,
    price: 275,
    services: [
      'Property Website',
      'Video Slideshow',
      'Aerial Video',
      'Fly-around Satellite Video'
    ],
    subtitles: [
      'All Inclusive',
      'Video Package'
    ],
    title: 'Video Special'
  },
  {
    id: 4,
    oldPrice: 300,
    price: 275,
    services: [
      'Property Website',
      'Photo Slideshow',
      'Aerial Photo',
      'Panorama Photo'
    ],
    subtitles: [
      'All Inclusive',
      'Photo Package'
    ],
    title: 'Photo Special'
  }
]

const primaryPhotoCards: ServiceCard[] = [
  {
    id: 1,
    image: '/public/static/img/house1.png',
    price: 100,
    serviceCategoryId: 1,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 20 professionally captured stills \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Blue Skies'
  },
  {
    id: 2,
    image: '/public/static/img/house2.png',
    price: 125,
    serviceCategoryId: 1,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  },
  {
    id: 3,
    price: 125,
    serviceCategoryId: 1,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Neighborhood'
  },
  {
    id: 4,
    price: 125,
    serviceCategoryId: 1,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Highlight'
  },
  {
    id: 5,
    image: '/public/static/img/house1.png',
    price: 125,
    serviceCategoryId: 1,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Fly Above'
  },
  {
    id: 6,
    price: 125,
    serviceCategoryId: 1,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  }
]

const videoCards: ServiceCard[] = [
  {
    id: 1,
    price: 100,
    serviceCategoryId: 3,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 10 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 2,
    price: 130,
    serviceCategoryId: 3,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 20 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 3,
    image: '/public/static/img/house1.png',
    price: 125,
    serviceCategoryId: 3,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  },
  {
    id: 4,
    image: '/public/static/img/house2.png',
    price: 140,
    serviceCategoryId: 3,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  },
  {
    id: 5,
    price: 125,
    serviceCategoryId: 3,
    serviceType: 'Primary',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  }
]

const addOnPhotoCards: ServiceCard[] = [
  {
    id: 1,
    image: '/public/static/img/house1.png',
    price: 100,
    serviceCategoryId: 1,
    serviceType: 'AddOn',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 10 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 2,
    price: 130,
    serviceCategoryId: 1,
    serviceType: 'AddOn',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 20 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 3,
    price: 125,
    serviceCategoryId: 1,
    serviceType: 'AddOn',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  }
]

const floorPlanCards: ServiceCard[] = [
  {
    id: 1,
    image: '/public/static/img/house1.png',
    price: 100,
    serviceCategoryId: 2,
    serviceType: 'AddOn',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 10 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 2,
    price: 130,
    serviceCategoryId: 2,
    serviceType: 'AddOn',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 20 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 3,
    image: '/public/static/img/house2.png',
    price: 125,
    serviceCategoryId: 2,
    serviceType: 'AddOn',
    // tslint:disable-next-line:max-line-length
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  }
]

// object with properties named as the id of the service category for the array of cards
const addOnCards = {
  floorPlan: [...floorPlanCards],
  photo: [...addOnPhotoCards]
}

const primaryCards = {
  photo: [...primaryPhotoCards],
  video: [...videoCards]
}

const mockData = {
  addOnCards,
  packageCards,
  primaryCards,
  serviceCategories
}

export default mockData
