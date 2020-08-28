import { ServiceRegionAdjusted } from '#veewme/graphql/types'
import { Field } from 'formik'
import * as React from 'react'
import { useCallback, useMemo } from 'react'
import { nameof } from '../../../../lib/util'
import Button from '../../../common/buttons/basicButton'
import InputField from '../../../common/formikFields/inputField'
import SwitchField from '../../../common/formikFields/switchField'
import Panel from '../../../common/panel'
import styled from '../../../common/styled-components'
import { FormValues } from './form'

const RegionName = styled.span`
  display: flex;
  font-size: 14px;
  color: ${props => props.theme.colors.FIELD_TEXT};
  font-weight: 500;
`

const Table = styled.table`
  margin-top: 5px;
  table-layout: fixed;
  width: 100%;
`
const Tr = styled.tr`
`
const Th = styled.th`
  width: 180px;
  padding: 15px 0;
  font-size: 13px;
  color: ${props => props.theme.colors.LABEL_TEXT};
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-weight: 400;

  &:first-child {
    width: auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_MD}) {
    width: 155px;
  }

  @media (max-width: ${props => props.theme.breakpoints.BREAKPOINT_SM}) {
    width: 120px;
  }
`

const Td = styled.td`
  padding: 15px 10px 10px 0;
  border-top: 1px solid ${props => props.theme.colors.BORDER};

  &:last-child {
    padding-right: 0;
  }

  input {
    max-width: 100%;
    font-weight: 500;

    &::placeholder {
      opacity: 0.5;
    }

    &[disabled] {
      background: #fff;
      color: ${props => props.theme.colors.LABEL_TEXT};
      cursor: not-allowed;
      font-weight: 400;
      opacity: 0.8;
    }
  }
`

interface RegionsProps {
  values: FormValues
  onToggleAll: (select: boolean) => void
}

const Regions: React.FunctionComponent<RegionsProps> = props => {
  const { values, onToggleAll } = props

  const regions = values.regions
  const allSelected = useMemo(() => regions.every(region => !!region.custom), regions)
  const toggleCallback = useCallback(() => onToggleAll(!allSelected), [allSelected])

  const ToggleAllButton = allSelected ? (
    <Button buttonTheme='alert' full label='Unselect All' type='button' onClick={toggleCallback} />
  ) : <Button buttonTheme='action' full label='Select All' type='button' onClick={toggleCallback} />

  return (
    <Panel id='regions' heading='Regions'>
      {ToggleAllButton}
      <Table>
        <tbody>
          <Tr>
            <Th>Region</Th>
            <Th>Adjusted price</Th>
            <Th>Adjusted compensation</Th>
          </Tr>
          {values.regions.map((region, i) => {
            // produce type safe array field names e.g. regions[1].adjustedPrice
            const regionFieldNamePrefix = `${nameof<FormValues>('regions')}[${i}]`
            const regionAdjustedPriceName = `${regionFieldNamePrefix}.${nameof<ServiceRegionAdjusted>('adjustedPrice')}`
            const regionAdjustedCompensationName = `${regionFieldNamePrefix}.${nameof<ServiceRegionAdjusted>('adjustedCompensation')}`
            const regionCustomName = `${regionFieldNamePrefix}.${nameof<ServiceRegionAdjusted>('custom')}`
            const disabled = !region.custom

            return (
              <Tr key={i}>
                <Td>
                  <RegionName>
                    <Field
                      name={regionCustomName}
                      component={SwitchField}
                      label={region.name}
                    />
                  </RegionName>
                </Td>
                <Td><Field name={regionAdjustedPriceName} disabled={disabled} component={InputField} type='number' /></Td>
                <Td><Field name={regionAdjustedCompensationName} disabled={disabled} component={InputField} type='number' /></Td>
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </Panel>
  )
}

export default Regions
