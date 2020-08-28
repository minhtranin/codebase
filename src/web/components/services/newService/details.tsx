import { ServiceCategory } from '#veewme/graphql/types'
import { Service } from '#veewme/lib/types'
import { Field } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import InputField from '../../../common/formikFields/inputField'
import RadioField from '../../../common/formikFields/radioInputField'
import SelectField from '../../../common/formikFields/selectField'
import Editor from '../../../common/formikFields/wysiwygEditor'
import Panel from '../../../common/panel'
import styled from '../../../common/styled-components'
import { DuplicateHolder, DurationWrapper, InlineFields, SourceWrapper, TextInlineFields, TextInlineFieldsFull } from '../common/styled'
import { getServiceTypeLabel } from '../common/util'
import { FormValues } from './form'
import PackageServices from './packageServices'

const StyledEditor = styled(Editor)`
  margin-top: 20px;
`

const StyledRadio = styled(RadioField)`
  margin-bottom: 25px;
`

// Mock select options
const DuplicateOptions = [{
  label: 'Photography',
  value: '#photography'
}, {
  label: 'Artist',
  value: '#artist'
}, {
  label: 'Standard',
  value: '#standard'
}]

const CategoryOptions = [{
  label: 'Category 1',
  value: '#cat1'
}, {
  label: 'Category 2',
  value: '#cat2'
}, {
  label: 'Category 3',
  value: '#cat3'
}]

// TODO: validate name length also on backend
export const serviceNameMaxLength = 13

interface DetailsProps {
  values: FormValues
  services: Service[]
}

const Details: React.FunctionComponent<DetailsProps> = props => {
  const { values, services } = props
  const isPackage = values.serviceType === 'Package'

  return (
    <Panel id='details' heading='Details'>
      <SourceWrapper>
        <Field name={nameof<FormValues>('sourceType')} value={'New'} component={RadioField} label='New service' />
        <DuplicateHolder>
          <Field name={nameof<FormValues>('sourceType')} value={'Duplicate'} component={RadioField} label='Duplicate From:' />
          <Field
            name={nameof<FormValues>('duplicateFrom')}
            component={SelectField}
            options={DuplicateOptions}
            isDisabled={values.sourceType === 'New'}
          />
        </DuplicateHolder>
      </SourceWrapper>
      <InlineFields>
        <Field name={nameof<FormValues>('serviceType')} labelPosition='bottom' value={'Primary'} component={RadioField} label={getServiceTypeLabel('Primary')} />
        <Field name={nameof<FormValues>('serviceType')} labelPosition='bottom' value={'Admin'} component={RadioField} label={getServiceTypeLabel('Admin')} />
        <Field name={nameof<FormValues>('serviceType')} labelPosition='bottom' value={'AddOn'} component={RadioField} label={getServiceTypeLabel('AddOn')} />
        <Field name={nameof<FormValues>('serviceType')} labelPosition='bottom' value={'Package'} component={RadioField} label={getServiceTypeLabel('Package')} />
      </InlineFields>
      <TextInlineFieldsFull>
        <Field
          name={`${nameof<FormValues>('category')}.${nameof<ServiceCategory>('id')}`}
          isDisabled={isPackage}
          component={SelectField}
          options={CategoryOptions}
          label='Category'
          placeholder={isPackage ? 'Category' : undefined}
        />
        <Field name={nameof<FormValues>('name')} component={InputField} label='Name' maxLength={serviceNameMaxLength} />
      </TextInlineFieldsFull>
      <Field
        name='description'
        label='Description'
        component={StyledEditor}
      />
      {isPackage && (<PackageServices values={values} services={services} />)}
      <TextInlineFields>
        <Field name={nameof<FormValues>('price')} component={InputField} type='number' label='Price' />
        {!isPackage && <Field name={nameof<FormValues>('defaultCompensation')} component={InputField} type='number' label='Default compensation' />}
      </TextInlineFields>
      <DurationWrapper>
        <Field name={nameof<FormValues>('duration')} component={InputField} type='number' label='Est. Duration' />
        <Field
          name={nameof<FormValues>('durationUnit')}
          value={'Minute'}
          component={StyledRadio}
          label='minutes'
          size='s'
        />
        <Field
          name={nameof<FormValues>('durationUnit')}
          value={'Hour'}
          component={StyledRadio}
          label='hours'
          size='s'
        />
      </DurationWrapper>
      {!isPackage && (
        <TextInlineFieldsFull>
          <Field name={nameof<FormValues>('link')} component={InputField} label='Sample Link' />
        </TextInlineFieldsFull>
      )}
    </Panel>
  )
}

export default Details
