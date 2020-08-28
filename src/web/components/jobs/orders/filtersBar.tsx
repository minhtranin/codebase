import styled from '#veewme/web/common/styled-components'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import DateRangeSelectField from '../../../common/formikFields/dateFields/dateRangeSelectField'
import InputField from '../../../common/formikFields/inputField'
import SelectField from '../../../common/formikFields/selectField'
import withOnChange, { FormPropsWithOnChange } from '../../../common/formikFields/withOnChange'

// Test data - to remove later
const ClientOptions = [{
  label: 'Client 1',
  value: 'Client 1'
}, {
  label: 'Client 2',
  value: 'Client 2'
}, {
  label: 'Client 22',
  value: 'Client 22'
}, {
  label: 'Client 3',
  value: 'Client 3'
}]

export const StyledFiltersWrapper = styled.div `
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 8px 0;
  width: 100%;
  & > div {
    margin-right: 12px;
  }
  & > :last-child {
    margin-right: 0;
  }
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    margin-top: 10px;
  }
`

const StyledFieldWrapper = styled.div `
`

const StyledInputField = styled(InputField) `
  width: 200px;
`

const StyledSelectField = styled(SelectField) `
  min-width: 200px;
  width: 200px;
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    min-width: 150px;
    width: 150px;
  }
`

const StyledDateField = styled(DateRangeSelectField) `
  min-width: 210px;
`

export const ResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  border: 2px solid ${props => props.theme.colors.BORDER};
  border-radius: 5px;
  color: ${props => props.theme.colors.FIELD_TEXT};
  background-color: transparent;
  font-weight: 600;
  cursor: pointer;
  transition: border .5s, color .5s;
  margin-bottom: 5px;

  &:hover {
    border: 2px solid ${props => props.theme.colors.GREY};
  }
`

export interface FiltersFormValues {
  address?: string
  client?: string
  date?: Date
}

interface FiltersProps {}

type FiltersFormProps = FiltersProps & FormikProps<FiltersFormValues>

class FiltersBar extends React.PureComponent<FiltersFormProps, {}> {
  render () {
    const {
      dirty,
      handleReset
    } = this.props

    return (
      <Form>
        <StyledFiltersWrapper>
          <StyledFieldWrapper>
            <Field
              type='text'
              name={nameof<FiltersFormValues>('address')}
              placeholder='Search Address/OrderID...'
              component={StyledInputField}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper>
            <Field
              name={nameof<FiltersFormValues>('client')}
              placeholder='Client'
              component={StyledSelectField}
              isClearable
              options={ClientOptions}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper>
            <Field
              name={nameof<FiltersFormValues>('date')}
              placeholder='Date'
              component={StyledDateField}
            />
          </StyledFieldWrapper>
          <StyledFieldWrapper>
            <ResetButton
              type='button'
              onClick={handleReset}
              disabled={!dirty}
            >
              Reset
            </ResetButton>
          </StyledFieldWrapper>
        </StyledFiltersWrapper>
      </Form>
    )
  }
}

const FiltersForm = withFormik<FormPropsWithOnChange<FiltersProps, FiltersFormValues>, FiltersFormValues>({
  handleSubmit:  () => null, //tslint:disable-line
  mapPropsToValues: () => ({
    address: '',
    client: ''
  })
})(withOnChange(FiltersBar))

export default FiltersForm
