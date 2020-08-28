import Button from '#veewme/web/common/buttons/basicButton'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import SelectField from '../../../common/formikFields/selectField'
import withOnChange, { FormPropsWithOnChange } from '../../../common/formikFields/withOnChange'
import styled from '../../../common/styled-components'

const StyledFiltersWrapper = styled.div `
  padding: 15px 0 0 0;
  display: flex;
  flex-direction: column;
  & > p {
    color: ${props => props.theme.colors.LABEL_TEXT};
    margin-bottom: 4px;
  }
`

const StyledFieldsBar = styled.div `
  flex: 1;
  display: flex;
`

const StyledFieldWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  width: 200px;
  margin-right: 15px;
  padding-right: 25px;

  input {
    flex: 1 0 auto;
  }

  > div {
    width: 100%;
  }
`

const StyledButtonWrapper = styled.div `
  border-left: 2px solid  ${props => props.theme.colors.BORDER};
  padding-left: 15px;
`

export interface FiltersFormValues {
  client?: string
  region?: string
}

interface FiltersProps {}

type FiltersFormProps = FiltersProps & FormikProps<FiltersFormValues>

// temporary mock data
const ClientOptions = [
  {
    options: [{
      label: 'Broker 1',
      value: 'Broker 1'
    }, {
      label: 'Broker 2',
      value: 'Broker 2'
    }, {
      label: 'Broker 3',
      value: 'Broker 3'
    }]
  },
  {
    options: [{
      label: 'Agent 1',
      value: 'Agent 1'
    }, {
      label: 'Agent 2',
      value: 'Agent 2'
    }, {
      label: 'Agent 3',
      value: 'Agent 3'
    }]
  }
]

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
        <StyledFiltersWrapper>
          <p>Special price</p>
          <StyledFieldsBar>
            <StyledFieldWrapper>
              <Field
                name={nameof<FiltersFormValues>('client')}
                placeholder='Broker - Agent'
                component={SelectField}
                options={ClientOptions}
              />
            </StyledFieldWrapper>
            <StyledFieldWrapper>
              <Field
                name={nameof<FiltersFormValues>('region')}
                placeholder='Region'
                component={SelectField}
                options={RegionOptions}
              />
            </StyledFieldWrapper>
            <StyledButtonWrapper>
              <Button
                type='button'
                label='Reset'
                onClick={handleReset}
                disabled={!dirty}
              />
            </StyledButtonWrapper>
          </StyledFieldsBar>
        </StyledFiltersWrapper>
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
  handleSubmit:  () => null,
  mapPropsToValues: () => ({
  })
})(withOnChange(FiltersForm))

export default FiltersFormEnhanced
