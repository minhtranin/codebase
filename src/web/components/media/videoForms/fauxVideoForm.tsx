import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import AudioField from '../../../common/formikFields/audioSelectField'
import RadioField from '../../../common/formikFields/radioInputField'
import { Label } from '../../../common/formikFields/styled'
import InlineHelp from '../../../common/inlineHelp'
import Gallery from '../photosGallery'
import ThumbsCarousel from '../thumbsCarousel'
import { Appearance, FauxVideo, GenerateOption } from '../types'
import Footer from './formFooter'
import VideoBasicDetails from './videoBasicDetails'

// mock data
import { mockOrderPhotos } from '../mockPhotosData'

const AudioFilesMock = [{
  id: 'ap1',
  name: 'African Party',
  src: '/public/static/audio/african-party.mp3'
}, {
  id: 'cb2',
  name: 'Cannonballs',
  src: '/public/static/audio/cannonballs.mp3'
}, {
  id: 'so3',
  name: 'Startover',
  src: '/public/static/audio/startover.mp3'
}, {
  id: 'sb4',
  name: 'Summer beat',
  src: '/public/static/audio/summer-beat.mp3'
}, {
  id: 'md5',
  name: 'Magic dreams',
  src: '/public/static/audio/magic-dreams.mp3'
}]

const StyledPanel = styled(Panel)`
  margin-bottom: 20px;

  header {
    justify-content: flex-start;

    h2 {
      margin-right: 10px;
    }
  }
`

const TwoColSection = styled.section`
  display: flex;

  & > div {
    &:first-child {
      flex: 1 0 50%;
      max-width: 360px;
    }
  }
`

const SlideshowRightCol = styled.div`
  margin-top: -40px;
  padding-left: 25px;
  color: ${props => props.theme.colors.LABEL_TEXT};

  h4 {
    font-weight: 400;
  }

  p {
    margin: 5px 0;
    font-size: 13px;
  }

  ul {
    margin-left: 40px;
    list-style-type: disc;
    font-size: 13px;
  }
`
// TODO add 'extra small' option to Radio field
const SlideshowsFieldsWrapper = styled.div`
  padding: 0 5px 10px 0;
`

const ThumbsWrapper = styled.div`
  width: 300px;
  margin: 10px auto 10px;
  padding-left: 0
  flex: 0 0 auto;
`

const StyledRadioLabel = styled.span`
    span {
      font-style: italic;
    }
`

const SlideshowTip: React.FunctionComponent = () => <InlineHelp text='Lorem ipsum' />

interface CustomProps {
  onSubmit: (values: FauxVideo) => void
  onSubmitSuccess: () => void
}

export type FormValues = FauxVideo

type FauxVideoViewProps = FormikProps<FormValues> & CustomProps

class FauxVideoView extends React.Component<FauxVideoViewProps, {}> {
  render () {
    return (
      <Form>
        <StyledPanel heading='Faux Video'>
          <VideoBasicDetails />
        </StyledPanel>
        <StyledPanel
          heading='Generate new video slideshow'
          headingPlacedComponent={<SlideshowTip />}
        >
          <TwoColSection>
            <div>
              <SlideshowsFieldsWrapper>
                <Label>Select</Label>
                <Field
                  name={nameof<FormValues>('generateOption')}
                  value={GenerateOption.Branded}
                  component={RadioField}
                  label={<StyledRadioLabel>Branded (<span>$4.00</span>)</StyledRadioLabel>}
                  size='xs'
                />
                <Field
                  name={nameof<FormValues>('generateOption')}
                  value={GenerateOption.Unbranded}
                  component={RadioField}
                  label={<StyledRadioLabel>Unbranded (<span>$4.00</span>)</StyledRadioLabel>}
                  size='xs'
                />
                <Field
                  name={nameof<FormValues>('generateOption')}
                  value={GenerateOption.Package}
                  component={RadioField}
                  label={<StyledRadioLabel>Package (Branded + Unbranded) (<span>$6.00</span>)</StyledRadioLabel>}
                  size='xs'
                />
              </SlideshowsFieldsWrapper>
              <SlideshowsFieldsWrapper>
                <Field
                  name={nameof<FormValues>('audio')}
                  component={AudioField}
                  audios={AudioFilesMock}
                  label='Select'
                />
              </SlideshowsFieldsWrapper>
            </div>
            <SlideshowRightCol>
              <h4>Note</h4>
              <p>
                You can tag up to 50 photos to include in the video by selecting the camera icon on each respective photo thumbnail.
                These photos will then appear in the order shown as thumbnails.
                If you do not tag any photos and continue to proceed with generating a video, up to the first 30 photos will be used.
              </p>
              <p>
                Before generating this video please make sure your property tour contains the following (correct) information:
              </p>
              <ul>
                <li>
                  Address, City, Zip/Postal Code
                </li>
                <li>
                  Attention grabbing headline!
                </li>
                <li>
                  Property details - Bedrooms, full & half baths, square footage
                </li>
                <li>
                  Your contact information is correct and up to date.
                </li>
              </ul>
              <p>
                You can generate a branded and/or unbranded video.
              </p>
              <p>
                The cost is 4.00 for each.
                If you choose to generate both, the cost is 6.00 for the pair.
                Should you make a mistake or need to change something you can re-generate two videos at no cost.<br/>
                If you need to make additional changes you can generate a new video.
              </p>
            </SlideshowRightCol>
          </TwoColSection>
        </StyledPanel>
        <StyledPanel heading='Video thumbnail image'>
          <ThumbsWrapper>
            <ThumbsCarousel
              initSlideId={this.props.values.thumbId}
              onSlideChange={id => this.props.setFieldValue(nameof<FormValues>('thumbId'), id)}
              photos={mockOrderPhotos}
            />
          </ThumbsWrapper>
        </StyledPanel>
        <Gallery
          photos={mockOrderPhotos}
          title='Select photos to include in video'
          maxCount={50}
          onChange={value => this.props.setFieldValue(nameof<FormValues>('photos'), value)}
        />
        <Footer />
      </Form>
    )
  }
}

const initialData: FauxVideo = {
  appearance: Appearance.Always,
  audio: '',
  generateOption: GenerateOption.Branded,
  label: '',
  photos: [],
  theaterMode: false,
  thumbId: '1' // can also be ommitted (defaults to first thumb in array)
}

const FauxVideoForm = withFormik<CustomProps, FormValues>({
  handleSubmit:  (values, { setSubmitting, props }) => {
    props.onSubmit(values)
    setSubmitting(false)
    props.onSubmitSuccess()
  },
  mapPropsToValues: () => ({
    ...initialData
  })
})(FauxVideoView)

export default FauxVideoForm
