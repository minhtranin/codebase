import { Field } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import TextareaField from '../../../common/formikFields/textareaField'
import ImageField from '../../../common/formikFields/uploadImageField'
import Panel from '../../../common/panel'
import styled from '../../../common/styled-components'
import { FormValues } from './form'

const StyledPanel = styled(Panel)`
  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    max-width: 330px;
  }

  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_XXL}) {
    max-width: unset;
  }
`

interface RightColProps {
  values: FormValues
}

const RightCol: React.FunctionComponent<RightColProps> = props => {
  const { values } = props
  const isCategory = values.serviceType === 'Package'

  return (
    <>
      {!isCategory && (
        <StyledPanel id='image' heading='Service Image'>
          <Field
            name={nameof<FormValues>('image')}
            component={ImageField}
          />
        </StyledPanel>
      )}
      <StyledPanel id='note' heading='Dismissable Note'>
        <Field
          name={nameof<FormValues>('note')}
          placeholder='Write here...'
          component={TextareaField}
          label='Will appear when content present if selected on order'
        />
      </StyledPanel>
    </>
  )
}

export default RightCol
