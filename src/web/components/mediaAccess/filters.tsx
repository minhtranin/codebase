import { nameof } from '#veewme/lib/util'
import CheckboxField from '#veewme/web/common/formikFields/checkboxField'
import InputField from '#veewme/web/common/formikFields/inputField'
import SelectField from '#veewme/web/common/formikFields/selectField'
import withOnChange, { FormPropsWithOnChange } from '#veewme/web/common/formikFields/withOnChange'
import styled from '#veewme/web/common/styled-components'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'

const FiltersDiv = styled.div`
  padding: 25px 0 10px 0;
  display: flex;
  flex-wrap: wrap;
`

const FieldWrapper = styled.div<{ shrinked?: boolean }>`
  display: flex;
  flex: 0 0 auto;
  ${props => !props.shrinked && 'min-width: 250px;'}
  margin-right: 25px;
  margin-bottom: 15px;
  border-right: 2px solid  ${props => props.theme.colors.BORDER};
  padding-right: 25px;
  align-items: center;
  height: 32px;


  input {
    flex: 1 0 auto;
  }

  > div {
    width: 100%;
  }
`

const StyledSelectWrapper = styled(FieldWrapper)`
  & > div {
    &:first-child {
      margin-right: 15px;
    }
    min-width: 150px;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    flex: 1 0 auto;
  }

`

const RightHolder = styled.div`
  display: flex;
  flex: 0 0 auto;
  height: 32px;

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
  height: 100%;

  &:hover {
    border: 2px solid ${props => props.theme.colors.GREY};
  }
`

export interface FiltersFormValues {
  query: string
  region?: string
  client?: string
  mediaOnly?: boolean
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

const ClientOptions = [{
  label: 'Client 1',
  value: 'Client 1'
}, {
  label: 'Client 2',
  value: 'Client 2'
}, {
  label: 'Client 3',
  value: 'Client 3'
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
              name={nameof<FiltersFormValues>('query')}
              placeholder='Search Address / Order ID...'
              component={InputField}
            />
          </FieldWrapper>
          <StyledSelectWrapper>
            <Field
              name={nameof<FiltersFormValues>('region')}
              placeholder='Region'
              component={SelectField}
              options={RegionOptions}
            />
            <Field
              name={nameof<FiltersFormValues>('client')}
              placeholder='Client'
              component={SelectField}
              options={ClientOptions}
            />
          </StyledSelectWrapper>
          <RightHolder>
            <FieldWrapper shrinked>
              <Field
                name={nameof<FiltersFormValues>('mediaOnly')}
                label='Media only'
                component={CheckboxField}
                options={ClientOptions}
              />
            </FieldWrapper>
            <ResetButton
              type='button'
              onClick={handleReset}
              disabled={!dirty}
            >
              Reset
            </ResetButton>
          </RightHolder>
        </FiltersDiv>
      </Form>
    )
  }
}

const FiltersFormEnhanced = withFormik<FormPropsWithOnChange<FiltersProps, FiltersFormValues>, FiltersFormValues>({
  handleSubmit:  () => null, //tslint:disable-line
  mapPropsToValues: () => ({
    mediaOnly: false,
    query: ''
  })
})(withOnChange(FiltersForm))

export default FiltersFormEnhanced
