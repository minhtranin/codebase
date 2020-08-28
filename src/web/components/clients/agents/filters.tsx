import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import BasicButton from '../../../common/buttons/basicButton'
import CheckboxField from '../../../common/formikFields/checkboxField'
import InputField from '../../../common/formikFields/inputField'
import SelectField from '../../../common/formikFields/selectField'
import withOnChange, { FormPropsWithOnChange } from '../../../common/formikFields/withOnChange'
import styled from '../../../common/styled-components'

const AgentsFilters = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  margin-bottom: 30px;
  flex-wrap: wrap;
  & > * {
    margin-top: 15px;
  }
`

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid ${props => props.theme.colors.BORDER};
  margin-right: 15px;
  padding: 2px 0;
`

const Input = styled(InputField)`
  margin-right: 15px;
  width: 180px;
`

const SelectRegion = styled(SelectField)`
  width: 180px;
  min-width: 180px;
  margin-right: 10px;
`

const OfficeCheckbox = styled(CheckboxField)`
  margin-right: 10px;
  font-size: 11px;
`

const SelectPerPage = styled(SelectField)`
  display: flex;
  min-width: 190px;
  align-items: center;
  margin-left: auto;
  & > label:first-child {
    width: auto;
    margin: 10px 10px 10px 0;
  }
  & > *:nth-child(2) {
    width: auto;
  }
`

const Button = styled(props => <BasicButton {...props} />)`
  margin-right: 15px;
`

interface FiltersProps {}

interface AgentFiltersValues {
  agentsPerPage: string
  affiliateFilter?: string
  brokerageFilter?: string
  officeAdmin: boolean
  region?: string
  searchPhrase?: string
}

type FiltersCustomProps = FiltersProps & FormikProps<AgentFiltersValues>

class Filters extends React.PureComponent<FiltersCustomProps> {
  render () {
    return (
      <AgentsFilters>
        <FilterGroup>
          <Field
            name={nameof<AgentFiltersValues>('searchPhrase')}
            component={Input}
            placeholder='Search Agent...'
          />
        </FilterGroup>
        <FilterGroup>
          <Field
            name={nameof<AgentFiltersValues>('brokerageFilter')}
            component={Input}
            placeholder='Filter by brokerage...'
          />
          <Field
            component={SelectRegion}
            name={nameof<AgentFiltersValues>('region')}
            options={[
              { label: 'Northwest', value: 'northwest' },
              { label: 'Northeast', value: 'northeast' },
              { label: 'Pacific', value: 'pacific' }
            ]}
            placeholder='Region...'
          />
        </FilterGroup>
        <FilterGroup>
          <Field
            component={OfficeCheckbox}
            label='Office admin only'
            name={nameof<AgentFiltersValues>('officeAdmin')}
          />
        </FilterGroup>
        <Button label='Reset' onClick={this.props.handleReset} />
        <Field
          component={SelectPerPage}
          label='Agents per page:'
          name={nameof<AgentFiltersValues>('agentsPerPage')}
          compactMode
          options={[
            { label: '20', value: '20' },
            { label: '50', value: '50' },
            { label: '100', value: '100' }
          ]}
        />
      </AgentsFilters>
    )
  }
}

const AgentFilters = withFormik<FormPropsWithOnChange<FiltersProps, AgentFiltersValues>, AgentFiltersValues>({
  handleSubmit:  () => null, //tslint:disable-line
  mapPropsToValues: () => ({
    agentsPerPage: '20',
    officeAdmin: false
  })
})(withOnChange(Filters))

export default AgentFilters
