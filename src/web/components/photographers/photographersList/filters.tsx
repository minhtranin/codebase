import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import InputField from '../../../common/formikFields/inputField'
import SelectField from '../../../common/formikFields/selectField'
import withOnChange, { FormPropsWithOnChange } from '../../../common/formikFields/withOnChange'
import styled from '../../../common/styled-components'

const FiltersDiv = styled.div`
  padding: 25px 0 0 0;
  display: flex;
`

const FieldWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  min-width: 250px;
  margin-right: 25px;
  border-right: 2px solid  ${props => props.theme.colors.BORDER};
  padding-right: 25px;

  input {
    flex: 1 0 auto;
  }

  > div {
    width: 100%;
  }
`

const ResetButton = styled.button`
  padding: 6px 15px;
  border: 2px solid ${props => props.theme.colors.BORDER};
  border-radius: 5px;
  color: ${props => props.theme.colors.FIELD_TEXT};
  background-color: transparent;
  font-weight: 600;
  cursor: pointer;
  transition: border .5s, color .5s;

  &:hover {
    border: 2px solid ${props => props.theme.colors.GREY};
  }
`

export interface FiltersFormValues {
  photographerName: string
  region?: string
}

interface FiltersProps {}

type FiltersFormProps = FiltersProps & FormikProps<FiltersFormValues>

// temporary mock data
const RegionOptions = [{
  label: 'Region 1',
  value: 'Region 1'
}, {
  label: 'Region 2',
  value: 'Region 2'
}, {
  label: 'Region 3',
  value: 'Region 3'
}]

class FiltersForm extends React.Component<FiltersFormProps, {}> {
  render () {
    const {
      dirty,
      handleReset
    } = this.props

    return (
      <Form>
        <FiltersDiv>
          <FieldWrapper>
            <Field
              type='text'
              name={nameof<FiltersFormValues>('photographerName')}
              placeholder='Search for photographer...'
              component={InputField}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Field
              name={nameof<FiltersFormValues>('region')}
              placeholder='Region'
              component={SelectField}
              options={RegionOptions}
            />
          </FieldWrapper>
          <ResetButton
            type='button'
            onClick={handleReset}
            disabled={!dirty}
          >
            Reset
          </ResetButton>
        </FiltersDiv>
      </Form>
    )
  }
}

/*
 Prop `handleSubmit` is required by Formik but not needed if form is not submitted in normal way (on submit btn click)
 Prop handleSubmit injected to form component is not the same function as defined in withFormik config
 so this can't be accessed directly inside form.. so actually is not needed in this case
*/
const FiltersFormEnhanced = withFormik<FormPropsWithOnChange<FiltersProps, FiltersFormValues>, FiltersFormValues>({
  handleSubmit:  () => null, //tslint:disable-line
  mapPropsToValues: () => ({
    photographerName: ''
  })
})(withOnChange(FiltersForm))

export default FiltersFormEnhanced
