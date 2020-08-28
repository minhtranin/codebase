import { Amenity } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import Button from '#veewme/web/common/buttons/basicButton'
import CheckboxField from '#veewme/web/common/formikFields/checkboxField'
import styled from '#veewme/web/common/styled-components'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'

const AmenityItem = styled.li `
  & > div {
    padding: 6px 0;
  }
`

const StyledAmenityList = styled.ul`
  margin: 15px 0 30px;
  max-height: 370px;
  overflow-y: auto;
`

interface CustomProps {
  onSubmit: (values: Amenity[]) => void
  amenities: Amenity[]
  selectedAmenities: Amenity[]
}

export interface SelectableAmenity extends Amenity {
  checked: boolean
}

interface FormValues {
  selectableAmenities: SelectableAmenity[]
}

type AddAmenitiesFormViewProps = FormikProps<FormValues> & CustomProps

class AddAmenitiesFormView extends React.Component<AddAmenitiesFormViewProps, {}> {
  render () {
    const { values: { selectableAmenities }, submitForm } = this.props

    return (
      <Form>
        <StyledAmenityList>
          {selectableAmenities.map((sa, i) => (
              <AmenityItem
                key={sa.id}
              >
                <Field
                  name={`${nameof<FormValues>('selectableAmenities')}[${i}].checked`}
                  component={CheckboxField}
                  value={`${nameof<FormValues>('selectableAmenities')}[${i}].checked`}
                  label={sa.label}
                />
              </AmenityItem>
            ))
          }
        </StyledAmenityList>
        <Button full buttonTheme='action' type='button' label='Add Amenities' onClick={submitForm} />
      </Form>
    )
  }
}

const AddAmenitiesForm = withFormik<CustomProps, FormValues>({
  handleSubmit:  (values, { props }) => {
    const amenities = values.selectableAmenities.filter(sa => sa.checked).map<Amenity>(sa => ({ id: sa.id, label: sa.label }))
    props.onSubmit(amenities)
  },
  mapPropsToValues: props => ({
    selectableAmenities: props.amenities.map(amenity => ({
      ...amenity,
      checked: props.selectedAmenities.some(sa => sa.id === amenity.id)
    }))
  })
})(AddAmenitiesFormView)

export default AddAmenitiesForm
