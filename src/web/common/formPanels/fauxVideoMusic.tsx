import { nameof } from '#veewme/lib/util'
import AudioField from '#veewme/web/common/formikFields/audioSelectField'
import Panel from '#veewme/web/common/panel'
// TODO remove mock data
import { AudioFilesMock } from '#veewme/web/components/dev/demoMedia'
import { Field } from 'formik'
import * as React from 'react'
import { FauxVideoMusicValues } from '../../components/affiliates/editAffiliate/types'

const FauxVideoMusic: React.FunctionComponent<{}> = () => {
  return (
    <Panel heading='Default Faux Video Music' toggleable>
      <Field
        name={nameof<FauxVideoMusicValues>('defaultFauxVideoMusic')}
        label='Select Music:'
        component={AudioField}
        audios={AudioFilesMock}
      />
    </Panel>
  )
}

export default FauxVideoMusic
