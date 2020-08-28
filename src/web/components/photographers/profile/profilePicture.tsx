import { nameof } from '#veewme/lib/util'
import UploadImageField from '#veewme/web/common/formikFields/uploadImageField'
import { Field } from 'formik'
import * as React from 'react'
import Panel from '../../../common/panel'
import { Photographer } from '../common/types'

const ProfilePicture: React.FunctionComponent<{}> = () => {
  return (
    <Panel id='profilePicture' heading='Profile Picture' toggleable>
      <Field
        component={UploadImageField}
        name={nameof<Photographer>('thumb')}
        fieldOrientation='landscape'
        imageFullDimensions={{ height: 160, width: 200 }}
        label={<>
          Uploaded picture will be cropped/resized to a square.
          To achieve best results, upload a square or almost square picture.
        </>}
      />
    </Panel>
  )
}

export default ProfilePicture
