import { Photographer } from '#veewme/graphql/types'
import styled from '#veewme/web/common/styled-components'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import CheckboxField from '../../../common/formikFields/checkboxField'
import DateRangeSelectField from '../../../common/formikFields/dateFields/dateRangeSelectField'
import InputField from '../../../common/formikFields/inputField'
import SelectField from '../../../common/formikFields/selectField'
import withOnChange, { FormPropsWithOnChange } from '../../../common/formikFields/withOnChange'
import { StyledFiltersWrapper } from '../filtersBarElements'

// Test data - to remove later
const RegionOptions = [{
  label: 'Region 1',
  value: 'Region 1'
}, {
  label: 'Region 2',
  value: 'Region 2'
}, {
  label: 'Region 22',
  value: 'Region 22'
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
  label: 'Client 22',
  value: 'Client 22'
}, {
  label: 'Client 3',
  value: 'Client 3'
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

const VideoOptions = [{
  label: 'Video 1',
  value: 'Video 1'
}, {
  label: 'Video 2',
  value: 'Video 2'
}, {
  label: 'Video 22',
  value: 'Video 22'
}, {
  label: 'Video 3',
  value: 'Video 3'
}]

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

const StyledRegionSelectField = styled(StyledSelectField) `
  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_LG}) {
    min-width: 200px;
    width: 200px;
  }
`

const StyledDateField = styled(DateRangeSelectField) `
  min-width: 205px;
`

const StyledCheckboxField = styled(CheckboxField) `
  margin-bottom: 5px;
`

const StyledMainGrid = styled.div `
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'area1 area2';
`

const StyledArea1 = styled.div `
  grid-area: area1;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
    & > :last-child {
      border-left: unset;
      margin-left: 0;
      padding-left: 0;
      margin-top: 3px;
    }
  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_FHD}) {
    flex-direction: row;
    & > :last-child {
      border-left: 2px solid ${props => props.theme.colors.BUTTON_BORDER};
      margin-left: 12px;
      padding-left: 12px;
      margin-top: 0;
    }
  }
`

const StyledArea2 = styled.div `
  grid-area: area2;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  ${StyledFieldWrapper} {
    margin-left:12px;
  }
  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_FHD}) {
    flex-direction: row;
  }
`

const StyledArea2Segment = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`

const StyledArea2Segment1 = styled(StyledArea2Segment) `
`

const StyledArea2Segment2 = styled(StyledArea2Segment) `
  flex: 1;
  & > :first-child, & > :last-child {
      border-left: unset;
      padding-left: 0;
    }
  @media (min-width: ${props => props.theme.breakpoints.BREAKPOINT_FHD}) {
    & > :first-child, & > :last-child {
      border-left: 2px solid ${props => props.theme.colors.BUTTON_BORDER};
      margin-left: 12px;
      padding-left: 12px;
    }
  }
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
  region?: string
  client?: string
  photographerId?: Photographer['id']
  date?: Date
  videoType?: string
  interactive?: boolean
  panorama?: boolean
  itemsPerPage?: number
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
          <StyledMainGrid>
            <StyledArea1>
              <Field
                type='text'
                name={nameof<FiltersFormValues>('address')}
                placeholder='Search Address/OrderID...'
                component={StyledInputField}
              />
              <StyledFieldWrapper>
                <Field
                  name={nameof<FiltersFormValues>('region')}
                  placeholder='Region'
                  component={StyledRegionSelectField}
                  isClearable
                  options={RegionOptions}
                />
              </StyledFieldWrapper>
            </StyledArea1>
            <StyledArea2>
              <StyledArea2Segment1>
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
                    name={nameof<FiltersFormValues>('photographerId')}
                    placeholder='Photographer'
                    component={StyledSelectField}
                    isClearable
                    options={PhotographersOptions}
                  />
                </StyledFieldWrapper>
                <StyledFieldWrapper>
                  <Field
                    name={nameof<FiltersFormValues>('date')}
                    placeholder='Date'
                    component={StyledDateField}
                  />
                </StyledFieldWrapper>
              </StyledArea2Segment1>
              <StyledArea2Segment2>
                <StyledFieldWrapper>
                  <Field
                    name={nameof<FiltersFormValues>('videoType')}
                    placeholder='Video Type'
                    component={StyledSelectField}
                    isClearable
                    options={VideoOptions}
                  />
                </StyledFieldWrapper>
                <StyledFieldWrapper>
                  <Field
                    name={nameof<FiltersFormValues>('interactive')}
                    label='Interactive'
                    component={StyledCheckboxField}
                  />
                </StyledFieldWrapper>
                <StyledFieldWrapper>
                  <Field
                    name={nameof<FiltersFormValues>('panorama')}
                    label='Panorama'
                    component={StyledCheckboxField}
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
              </StyledArea2Segment2>
            </StyledArea2>
          </StyledMainGrid>
        </StyledFiltersWrapper>
      </Form>
    )
  }
}

const FiltersForm = withFormik<FormPropsWithOnChange<FiltersProps, FiltersFormValues>, FiltersFormValues>({
  handleSubmit:  () => null, //tslint:disable-line
  mapPropsToValues: () => ({
    address: '',
    client: '',
    date: undefined,
    interactive: false,
    itemsPerPage: 20,
    panorama: false,
    photographerId: 0, // TODO make optional for initial data
    region: '',
    video: ''
  })
})(withOnChange(FiltersBar))

export default FiltersForm
