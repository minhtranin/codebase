import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Layout2 from './layouts/layout2'
import MainLayout from './layouts/main'
import { Tour } from './types'

const mockData: Tour = {
  address: '7197 Lake Shore Dr Chelsea, MI 48118',
  agentPhone: '123 456 789',
  bannerPhotos: [{
    fullUrl: 'https://picsum.photos/1680/750?image=1081',
    id: '1'
  }, {
    fullUrl: 'https://picsum.photos/1680/750?image=1040',
    id: '2'
  }, {
    fullUrl: 'https://picsum.photos/1680/750?image=1078',
    id: '3'
  }, {
    fullUrl: 'https://picsum.photos/1680/750?image=1031',
    id: '4'
  }, {
    fullUrl: 'https://picsum.photos/1680/750?image=946',
    id: '5'
  }, {
    fullUrl: 'https://picsum.photos/1680/750?image=859',
    id: '6'
  }, {
    fullUrl: 'https://picsum.photos/1680/750?image=249',
    id: '7'
  }],
  brochureUrl: 'http://www.africau.edu/images/default/sample.pdf',
  contactPerson: {
    company: 'Company ABC',
    facebookUrl: '#',
    faxNumber: '+123456789',
    linkedinUrl: '#',
    mobile: '+123456789',
    name: 'John Doe',
    officeNumber: '+123456789',
    title: 'Senior Agent',
    websiteUrl: '#'
  },
  // TODO add preset values
  customBanner: {
    background: {
      a: 0.68,
      b: 16,
      g: 69,
      r: 236
    },
    text: 'Sold'
  },
  descriptionItems: [{
    name: 'BEDS',
    value: '2'
  }, {
    name: 'BATHS/HALF',
    value: '2/1'
  }, {
    name: 'GARAGES',
    value: '3'
  }, {
    name: 'INTERIOR',
    value: '9500'
  }, {
    name: 'YEAR',
    value: '1923'
  }, {
    name: 'LOT',
    value: '0.2'
  }],
  descriptionText: `English Manor home with exceptional lake views!
    First floor master suite with his and her dressing rooms and baths! New gourmet kitchen! Guest/Nanny suite! 2nd and 1st floor laundries! Attached heated garage! Wine cellar! Heated in-ground pool! Beautiful grounds!
    Too many amenities to list!
    First floor master suite with his and her dressing rooms and baths! Too many amenities to list!`,
  headerLogoUrl: 'https://s3.amazonaws.com/test-veewme.static/img/veewme-tour-hosting-platform.svg',
  headerRightComponent: 'Price',
  mainColor: {
    a: 0.9,
    b: 61,
    g: 204,
    r: 158
  },
  photos: [{
    fullUrl: 'https://picsum.photos/1000/650?image=1081',
    id: '1',
    thumbUrl: 'https://picsum.photos/480/300?image=1081'
  }, {
    fullUrl: 'https://picsum.photos/1000/650?image=1040',
    id: '2',
    thumbUrl: 'https://picsum.photos/480/300?image=1040'
  }, {
    fullUrl: 'https://picsum.photos/1000/650?image=1078',
    id: '3',
    thumbUrl: 'https://picsum.photos/480/300?image=1078'
  }, {
    fullUrl: 'https://picsum.photos/1000/650?image=1031',
    id: '4',
    thumbUrl: 'https://picsum.photos/480/300?image=1031'
  }, {
    fullUrl: 'https://picsum.photos/1000/650?image=946',
    id: '5',
    thumbUrl: 'https://picsum.photos/480/300?image=946'
  }, {
    fullUrl: 'https://picsum.photos/1000/650?image=859',
    id: '6',
    thumbUrl: 'https://picsum.photos/480/300?image=859'
  }, {
    fullUrl: 'https://picsum.photos/1000/650?image=249',
    id: '7',
    thumbUrl: 'https://picsum.photos/480/300?image=249'
  }],
  price: '2,675,000', // TODO use some lib to format number as string
  slideshowAudioSrc: '/public/static/audio/african-party.mp3',
  title: 'Lorem Ipsum Residential House!',
  videos: [{
    id: 1,
    pictureUrl: 'https://picsum.photos/480/300?image=249',
    url: '/public/static/promp.mp4'
  }, {
    id: 2,
    pictureUrl: 'https://picsum.photos/480/300?image=946',
    url: '/public/static/promp.mp4'
  }],
  visibleTabs: ['OVERVIEW', 'PHOTOS', 'VIDEO']
}

interface LayoutComponentProps {
  tour: Tour
}

interface LayoutsMap {
  [id: string]: React.ComponentType<LayoutComponentProps>
}
const layoutComponents: LayoutsMap = {
  l1: MainLayout,
  l2: Layout2
}

interface RouteParams {
  layoutId: string
  tourId: string
}

interface TourContainerProps extends RouteComponentProps<RouteParams> {
}

const TourContainer: React.FunctionComponent<TourContainerProps> = props => {
  const { layoutId, tourId } = props.match.params
  const LayoutComponent = layoutComponents[layoutId]

  React.useEffect(() => {
    document.title = mockData.address
  }, [])

  // TODO just temp hack for demo purpose
  if (tourId === '1') {
    mockData.headerRightComponent = 'Price'
    mockData.mainColor = {
      a: 0.9,
      b: 61,
      g: 204,
      r: 158
    }
    mockData.bannerType = 'SIMPLE'
  }

  if (tourId === '2') {
    mockData.bannerType = 'KENBURNS'
    mockData.headerRightComponent = 'Call'
    mockData.mainColor = {
      a: 0.9,
      b: 224,
      g: 134,
      r: 121
    }
    mockData.videos = mockData.videos.slice(0, 1)
  }

  if (tourId === '3') {
    mockData.headerRightComponent = 'Logo'
    mockData.mainColor = {
      a: 0.9,
      b: 224,
      g: 134,
      r: 200
    }
  }
  // End of demo code

  log.debug(layoutId, LayoutComponent)
  return (
    <>
      <LayoutComponent tour={mockData} />
    </>
  )
}
export default TourContainer
