import { FieldProps } from 'formik'
import * as React from 'react'
import { DateRange } from '../../../../lib/types'
import { Label } from '../styled'
import { StyledDateFieldWrapper } from './common/styled'
import DateRangeSelect, { DateRangeSelectProps } from './dateRangeSelect/dateRangeSelect'

interface CustomProps {
  label?: string
}

type FormikInputProps = CustomProps & FieldProps & DateRangeSelectProps

class FormikDateSelect extends React.Component<FormikInputProps> {
  render () {
    const { field, form, ...props } = this.props
    return (
      <StyledDateFieldWrapper>
        {props.label && <Label htmlFor={field.name}>{props.label}</Label>}
        <DateRangeSelect
          dateRange={field.value}
          className={props.className}
          placeholder={props.placeholder}
          onChange={(dateRange?: DateRange) => form.setFieldValue(field.name, dateRange)}
        />
      </StyledDateFieldWrapper>
    )
  }
}

export default FormikDateSelect
