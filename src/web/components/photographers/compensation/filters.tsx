import { Photographer } from '#veewme/graphql/types'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import { FieldWrapper, FiltersWrapper, ResetButton } from '../../../common/filters'
import InputField from '../../../common/formikFields/inputField'
import SelectField from '../../../common/formikFields/selectField'
import { FormPropsWithOnChange, useOnChange } from '../../../common/formikFields/withOnChange'
import styled from '../../../common/styled-components'

const FieldHolder = styled(FieldWrapper)`
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_XL}) {
    margin-bottom: 20px;
    width: calc(33% - 25px);
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    margin-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    width: calc(50% - 25px);

    &:nth-child(2n) {
      padding-right: 0;
      margin-right: 0;
      border-right: 0 none;
    }
  }
`

// Temporary mock data - in future it'll be loaded from server
// TODO: remove when component is integrated with backend
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

const PhotographersOptions = [{
  label: 'John Newman',
  value: '#1'
}, {
  label: 'Rod Stewart',
  value: '#2'
}, {
  label: 'Edward Norton',
  value: '#3'
}]

const PriceOptions = [{
  label: 'Cheap',
  value: '#1'
}, {
  label: 'Medum',
  value: '#2'
}, {
  label: 'Expensive',
  value: '#3'
}]
// End of mock data

export interface FiltersFormValues {
  serviceName: string
  region?: string
  photographerId?: Photographer['id']
  priceGroupId?: string
}

interface FiltersProps {
  onChange: (val: FiltersFormValues) => void
}

type FiltersFormProps = FiltersProps & FormikProps<FiltersFormValues>

const FiltersFormView: React.FunctionComponent<FiltersFormProps> = ({
  dirty,
  handleReset,
  onChange,
  values
}) => {
  useOnChange(values, onChange)

  return (
    <Form>
      <FiltersWrapper>
        <FieldHolder>
          <Field
            type='text'
            name={nameof<FiltersFormValues>('serviceName')}
            placeholder='Search for service...'
            component={InputField}
          />
        </FieldHolder>
        <FieldHolder>
          <Field
            name={nameof<FiltersFormValues>('region')}
            placeholder='Region'
            component={SelectField}
            options={RegionOptions}
          />
        </FieldHolder>
        <FieldHolder>
          <Field
            name={nameof<FiltersFormValues>('photographerId')}
            placeholder='Photographer'
            component={SelectField}
            options={PhotographersOptions}
          />
        </FieldHolder>
        <FieldHolder>
          <Field
            name={nameof<FiltersFormValues>('priceGroupId')}
            placeholder='Price Group'
            component={SelectField}
            options={PriceOptions}
          />
        </FieldHolder>
        <div>
          <ResetButton
            type='button'
            onClick={handleReset}
            disabled={!dirty}
          >
            Reset
          </ResetButton>
        </div>
      </FiltersWrapper>
    </Form>
  )
}

/*
 Prop `handleSubmit` is required by Formik but not needed if form is not submitted in normal way (on submit btn click)
 Prop handleSubmit injected to form component is not the same function as defined in withFormik config
 so this can't be accessed directly inside form.. so actually is not needed in this case
*/
const FiltersForm = withFormik<FormPropsWithOnChange<FiltersProps, FiltersFormValues>, FiltersFormValues>({
  handleSubmit:  () => null, //tslint:disable-line
  mapPropsToValues: () => ({
    serviceName: ''
  })
})(FiltersFormView)

export default FiltersForm
