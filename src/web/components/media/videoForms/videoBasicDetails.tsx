import { Field } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import CheckboxField from '../../../common/formikFields/checkboxField'
import InputField from '../../../common/formikFields/inputField'
import RadioField from '../../../common/formikFields/radioInputField'
import { Label } from '../../../common/formikFields/styled'
import { AppearanceHolder } from '../styled'
import { Appearance, VideoBasicDetails } from '../types'
import { Hint, InfoWrapper } from './styled'

const VideoBasicDetails: React.FunctionComponent = () => (
  <>
    <Field name={nameof<VideoBasicDetails>('label')} component={InputField} label='Label' />
    <Hint><InfoWrapper>Note!</InfoWrapper> If you use multiple videos per tour it will be visible inside tour video section's navigation.</Hint>
    <AppearanceHolder>
      <Label>Appearance on tours</Label>
      <Field
        name={nameof<VideoBasicDetails>('appearance')}
        value={Appearance.Always}
        component={RadioField}
        label='Show Always'
        size='s'
      />
      <Field
        name={nameof<VideoBasicDetails>('appearance')}
        value={Appearance.Branded}
        component={RadioField}
        label='Only Branded'
        size='s'
      />
      <Field
        name={nameof<VideoBasicDetails>('appearance')}
        value={Appearance.Unbranded}
        component={RadioField}
        label='Only Unbranded'
        size='s'
      />
      <Field
        name={nameof<VideoBasicDetails>('appearance')}
        value={Appearance.Hide}
        component={RadioField}
        label='Hide'
        size='s'
      />
    </AppearanceHolder>
    <Field name={nameof<VideoBasicDetails>('theaterMode')} component={CheckboxField} label='Display Video in theater mode (large player)' />
  </>
)

export default VideoBasicDetails
