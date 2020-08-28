import { nameof } from '#veewme/lib/util'
import Button from '#veewme/web/common/buttons/basicButton'
import { OptionValue } from '#veewme/web/common/formikFields/selectField'
import SelectField from '#veewme/web/common/formikFields/selectField'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field, FieldArray } from 'formik'
import * as React from 'react'
import { Clear } from 'styled-icons/material'
import { EditAffiliateValues, Region, RegionsValues } from '../../components/affiliates/editAffiliate/types'

const StyledFieldWrapper = styled.div `
  display: flex;
  align-items: flex-end;
  margin: 4px 0;
  & > :first-child {
    flex: 1;
    margin-right: 8px;
  }
  & > :last-child {
    margin-bottom: 15px;
  }
`

const StyledButtonWrapper = styled.div `
  margin-top: 16px;
`

interface RegionsProps {
  regions: Region[]
  values: RegionsValues
}

const Regions: React.FunctionComponent<RegionsProps> = props => {
  const options = props.regions.map<OptionValue<Region['id']>>(region => ({ label: region.label, value: region.id }))
  const { regionIds } = props.values
  return (
    <Panel heading='Regions' toggleable>
      <FieldArray
        name={`${nameof<EditAffiliateValues>('regionIds')}`}
        render={({ push, remove }) => {
          return (
            <>
              {regionIds && regionIds.map((regionId, idx) => (
                <StyledFieldWrapper
                  key={idx}
                >
                  <Field
                    name={`${nameof<EditAffiliateValues>('regionIds')}[${idx}]`}
                    label={idx === 0 ? 'Default Region:' : `Region ${idx + 1}`}
                    component={SelectField}
                    options={options.filter(option => !(regionIds.filter((_, i) => i !== idx).includes(option.value)))}
                  />
                  { idx > 0 &&
                    <Button
                      buttonTheme='alert'
                      inverseTextColor
                      icon={Clear}
                      onClick={() => {
                        remove(idx)
                      }}
                    />
                  }
                </StyledFieldWrapper>
              ))}
              {options.length !== regionIds.length &&
                <StyledButtonWrapper>
                  <Button
                    type='button'
                    buttonTheme='action'
                    label='Add another region'
                    onClick={() => push('')}
                  />
                </StyledButtonWrapper>
              }
            </>
          )
        }}
      />
    </Panel>
  )
}

export default Regions
