/* Test cards data - TO REMOVE */
import { Agent, Amenity, Country, Currency, ListingTypesCategory, PackageCard, PromoCode, PromoCodeValidity, State } from '#veewme/lib/types'
import { ServiceCard } from './common'

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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    text: 'Up to 20 professionally captured stills \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home.\n Up to 20 professionally captured stills \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home.\n Up to 20 professionally captured stills \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Blue Skies'
  },
  {
    id: 2,
    price: 125,
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  },
  {
    id: 3,
    image: '/public/static/img/house2.png',
    price: 125,
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Neighborhood'
  },
  {
    id: 4,
    price: 125,
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Artistic view'
  },
  {
    id: 5,
    price: 125,
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Interior'
  }
]

const videoCards: ServiceCard[] = [
  {
    id: 1,
    price: 100,
    text: 'Up to 10 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 2,
    image: '/public/static/img/house1.png',
    price: 130,
    text: 'Up to 20 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 3,
    price: 125,
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  },
  {
    id: 4,
    price: 125,
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  },
  {
    id: 5,
    price: 125,
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  }
]

const addOnPhotoCards: ServiceCard[] = [
  {
    id: 1,
    price: 100,
    text: 'Up to 10 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 2,
    image: '/public/static/img/house2.png',
    price: 130,
    text: 'Up to 20 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 3,
    image: '/public/static/img/house1.png',
    price: 125,
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  }
]

const floorPlanCards: ServiceCard[] = [
  {
    id: 1,
    image: '/public/static/img/house1.png',
    price: 100,
    text: 'Up to 10 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 2,
    price: 130,
    text: 'Up to 20 minutes professional video \n+ Interactive Property Site \n+ Air images \n+ Panorama.\n Best option for an average to larger size home',
    title: 'Move around'
  },
  {
    id: 3,
    price: 125,
    text: 'Up to 30 professionally captured stills + Interactive Property Site.\n Best option for an average to larger size home',
    title: 'Community Highlight'
  }
]

const agents: Agent[] = [
  {
    email: 'clark@gmail.com',
    firstName: 'Arthur C.',
    id: 1,
    lastName: 'Clark',
    pin: false
  },
  {
    email: 'harris@gmail.com',
    firstName: 'Robert',
    id: 2,
    lastName: 'Harris',
    pin: false
  },
  {
    email: 'brown@gmail.com',
    firstName: 'Dan',
    id: 3,
    lastName: 'Brown',
    pin: false
  }
]

const countries: Country[] = [
  {
    id: 'US',
    name: 'United States'
  },
  {
    id: 'CA',
    name: 'Canada'
  },
  {
    id: 'MX',
    name: 'Mexico'
  },
  {
    id: 'GB',
    name: 'Great Britain'
  }
]

const states: State[] = [
  {
    id: 'US-AL',
    name: 'Alabama'
  },
  {
    id: 'US-AK',
    name: 'Alaska'
  },
  {
    id: 'US-CA',
    name: 'California'
  },
  {
    id: 'US-FL',
    name: 'Florida'
  }
]

const amenities: Amenity[] = [
  { id: 1, label: 'Air Conditioning' },
  { id: 2, label: 'Washer and Dryer' },
  { id: 3, label: 'Washer and Dryer Hookups' },
  { id: 4, label: 'Furniture' },
  { id: 5, label: 'Patio' },
  { id: 6, label: 'Fireplace' },
  { id: 7, label: 'Wi-Fi' }
]

const currencies: Currency[] = [
  {
    id: 'USD',
    name: 'United States dollar'
  },
  {
    id: 'CAD',
    name: 'Canadian dollar'
  },
  {
    id: 'MXP',
    name: 'Mexican peso'
  },
  {
    id: 'GBP',
    name: 'Pound sterling'
  }
]

const listingTypesCategories: ListingTypesCategory[] = [
  {
    listingTypes: [
      'Single Family Home',
      'Townhouse',
      'Cooperative',
      'Rental/Lease',
      'Lot/Land'
    ],
    name: 'Primary'
  },
  {
    listingTypes: [
      'Commercial',
      'Cottage',
      'Industrial',
      'Residential Home'
    ],
    name: 'Additional'
  }
]

export const promoCodes: PromoCode[] = [
  {
    affiliateId: 1,
    code: 'a123',
    description: 'Promo Code description',
    discount: 100,
    discountType: 'amount',
    expireDate: new Date(2019, 10, 4),
    id: 1,
    serviceId: 1,
    usageCount: 3,
    validity: PromoCodeValidity.Unlimited
  },
  {
    affiliateId: 2,
    code: 'promo111',
    description: 'Promo Code description with very long text to check ellipsis. Nostrud irure exercitation nulla Lorem deserunt magna ipsum qui dolore culpa. Ut velit eu Lorem laboris consequat sint adipisicing ea est enim. Consectetur tempor nulla laboris ex ex consequat labore tempor cillum consequat consequat ut laborum. Est amet ut et adipisicing quis sunt proident nostrud dolor sint labore. Id cupidatat laborum occaecat sunt eu est eu cillum ea dolore. Et esse enim sit sit est commodo anim proident ipsum est commodo.',
    discount: 60,
    discountType: 'amount',
    expireDate: 'unlimited',
    id: 2,
    usageCount: 3,
    validity: PromoCodeValidity.OncePerAgent
  },
  {
    affiliateId: 1,
    code: 'code11',
    description: 'Promo Code description',
    discount: 50,
    discountType: 'percent',
    expireDate: new Date(2019, 11, 14),
    id: 3,
    serviceId: 2,
    usageCount: 10,
    validity: PromoCodeValidity.MultipleTimes
  }
]

const mockData = {
  addOnPhotoCards,
  agents,
  amenities,
  countries,
  currencies,
  floorPlanCards,
  listingTypesCategories,
  packageCards,
  primaryPhotoCards,
  promoCodes,
  states,
  videoCards
}

export default mockData
