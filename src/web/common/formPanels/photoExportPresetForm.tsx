import { AffiliatePhotoExportPreset } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import Button from '#veewme/web/common/buttons/basicButton'
import InputField from '#veewme/web/common/formikFields/inputField'
import { StyledFieldsGrid } from '#veewme/web/common/formPanels/styles'
import Modal from '#veewme/web/common/modal'
import styled from '#veewme/web/common/styled-components'
import { StyledHeader } from '#veewme/web/components/dashboard/dateChartStatsBox'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'

const StyledWrapper = styled.div `
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const StyledComment = styled.div `
  font-size: 12px;
  font-weight: 400;
  color: ${props => props.theme.colors.ALERT}
`

const StyledFooter = styled.footer `
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`

interface CustomProps {
  preset?: AffiliatePhotoExportPreset
  onSubmit: (preset: AffiliatePhotoExportPreset) => void
}

type PhotoExportPresetViewProps = FormikProps<AffiliatePhotoExportPreset> & CustomProps

const PhotoExportPresetView: React.FunctionComponent<PhotoExportPresetViewProps> = props => (
  <Form>
    <StyledWrapper>
      <StyledHeader>
        <p> photo preset</p>
      </StyledHeader>
      <Field
        name={nameof<AffiliatePhotoExportPreset>('name')}
        label='Name:'
        component={InputField}
      />
      <StyledFieldsGrid>
        <Field
          name={nameof<AffiliatePhotoExportPreset>('width')}
          label='Photo width (pixels):'
          component={InputField}
          type='number'
        />
        <Field
          name={nameof<AffiliatePhotoExportPreset>('height')}
          label='Photo height (pixels):'
          component={InputField}
          type='number'
        />
        <Field
          name={nameof<AffiliatePhotoExportPreset>('resolution')}
          label='Photo quality:'
          component={InputField}
          type='number'
        />
        <StyledComment>
          <p>Note: the higher the quality, the less compression will be applied but the file size will be larger.</p>
          <p>75 is a happy medium used prevalently.</p>
        </StyledComment>
      </StyledFieldsGrid>
      <StyledFooter>
        <Button full buttonTheme='action' type='button' label='Confirm' onClick={props.submitForm} />
      </StyledFooter>
    </StyledWrapper>
  </Form>
)

const defaultValues: AffiliatePhotoExportPreset = {
  height: 600,
  name: '',
  resolution: 75,
  width: 800
}

const PhotoExportPresetForm = withFormik<CustomProps, AffiliatePhotoExportPreset>({
  handleSubmit:  (values, { props }) => {
    props.onSubmit(values)
  },
  mapPropsToValues: props => ({
    ...defaultValues,
    ...props.preset
  })
})(PhotoExportPresetView)

interface ModalPresetProps {
  preset?: AffiliatePhotoExportPreset
  isOpen: boolean
  onRequestClose: () => void
  onSubmit: (preset: AffiliatePhotoExportPreset) => void
}

const ModalPreset: React.FunctionComponent<ModalPresetProps> = props => (
  <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
  >
    <PhotoExportPresetForm
      preset={props.preset}
      onSubmit={(preset: AffiliatePhotoExportPreset) => {
        props.onSubmit(preset)
      }}
    />
  </Modal>
)

export default ModalPreset
