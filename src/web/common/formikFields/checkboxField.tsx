import Checkmark from '#veewme/web/assets/svg/checkmark.svg'
import { FieldProps, getIn } from 'formik'
import * as React from 'react'
import styled from '../styled-components'
import { ValidationError } from './styled'

const StyledInput = styled.input`
  display: none;
`

const LabelText = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.FIELD_TEXT};
`

const StyledCheckmark = styled(Checkmark) `
  width: 14px;
  height: 13px;
  fill: ${props => props.theme.colors.GREEN};
`

const Faker = styled.span<{ error?: boolean }>`
  position: relative;
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  border: 2px solid ${props => props.error ? props.theme.colors.ALERT : props.theme.colors.BORDER};
  cursor: pointer;

  ${StyledCheckmark} {
    display: none;
    position: absolute;
    left: 1px;
    top: 1px;
  }
`

const Label = styled.label<{ labelFirst: boolean }>`
    display: flex;
    flex: 1 0 auto;
    align-items: center;
    color: ${props => props.theme.colors.FIELD_TEXT};
    cursor: pointer;

    ${LabelText} {
      order: ${({ labelFirst }) => labelFirst ? 0 : 1};
      margin: ${({ labelFirst }) => labelFirst ? '0 8px 0 0' : '0 0 0 8px'};
    }
`

export const FieldWrapper = styled.div<{ compactMode?: boolean }>`
  position: relative;
  padding: 10px 0;
  font-size: 13px;
  color: ${props => props.theme.colors.LABEL_TEXT};
  ${props => !props.compactMode && 'margin-bottom: 12px;'}

  ${ValidationError} {
    bottom: -7px;
  }

  ${StyledInput} {
    &:checked + ${LabelText} {
      & + ${Faker} {
        & > ${StyledCheckmark} {
          display: block;
        }
      }
    }
  }
`

interface CustomProps {
  // label in some cases may require custom styling and html structure so it can't be just string
  label: JSX.Element
  labelFirst: boolean
  // allows wrapping component in styled-component to override styles if needed
  className?: string
  inline?: boolean
  compactMode?: boolean
}

type FormikCheckboxProps = FieldProps & CustomProps
const FormikCheckbox: React.FunctionComponent<FormikCheckboxProps> = ({
  compactMode = true,
  field, // { name, value, onChange, onBlur }
  form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  const error = getIn(form.errors, field.name)
  const touched = getIn(form.touched, field.name)
  const showError = error && (touched || form.submitCount)

  return (
    <FieldWrapper className={props.className} compactMode={compactMode}>
      <Label labelFirst={props.labelFirst}>
        <StyledInput
          {...field}
          {...props}
          type='checkbox'
          checked={field.value}
          onChange={e => {
            form.handleChange(e)
            form.setFieldTouched(field.name)
          }}
        />
        <LabelText>{props.label}</LabelText>
        <Faker error={showError}>
          <StyledCheckmark/>
        </Faker>
      </Label>
      <ValidationError show={showError && !compactMode}>{error}</ValidationError>
    </FieldWrapper>
  )
}

FormikCheckbox.defaultProps = {
  labelFirst: false
}

export default FormikCheckbox
