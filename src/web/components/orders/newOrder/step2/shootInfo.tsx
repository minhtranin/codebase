import { Occupancy, ShootInfo } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import CheckboxField from '#veewme/web/common/formikFields/checkboxField'
import DateField from '#veewme/web/common/formikFields/dateFields/dateSelectField'
import SelectField from '#veewme/web/common/formikFields/selectField'
import TextareaField from '#veewme/web/common/formikFields/textareaField'
import { Field } from 'formik'
import * as React from 'react'
import Panel from '../../../../common/panel'
import styled from '../../../../common/styled-components'
import { FormValues } from '../newOrderForm'
import { StyledBold, StyledGreenBold } from '../styled'

const StyledGrid = styled.div`
  margin: 30px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
  align-items: end;
`

const StyledDateTimeWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  margin-bottom: 20px;
  & > :first-child {
    width: 200px;
    margin-right: 30px;
  }
`

const StyledNoteWrapper = styled.div `
  margin-bottom: 30px;
  font-size: 14px;
`

const ShootInfoPanel: React.FunctionComponent<{}> = () => {
  const getTimeOptions = (step: number, startHour: number, startMinute: number, endHour: number, endMinute: number) => {
    const start = new Date(1970, 0, 1, startHour, startMinute, 0, 0)
    const end = new Date(1970, 0, 1, endHour, endMinute, 0, 0)
    const times: Array<{label: string, value: string}> = []
    let time: string = ''
    while (start <= end) {
      time = ('0' + start.getHours()).slice(-2) + ':' + ('0' + start.getMinutes()).slice(-2)
      start.setMinutes(start.getMinutes() + step)
      times.push({
        label: time,
        value: time
      })
    }
    return times
  }

  const getOccupancyOptions = () => (
    Object.keys(Occupancy).map(key => ({
      label: key,
      value: key
    }))
  )

  return (
    <Panel heading='Shoot Information'>
      <StyledDateTimeWrapper>
        <Field
          name={`${nameof<FormValues>('shootInfo')}.${nameof<ShootInfo>('date')}`}
          component={DateField}
          label='Preferred shoot date:'
        />
        <Field
          name={`${nameof<FormValues>('shootInfo')}.${nameof<ShootInfo>('time')}`}
          component={SelectField}
          label='Preferred shoot time:'
          options={getTimeOptions(30, 8, 0, 20, 0)}
        />
      </StyledDateTimeWrapper>
      <StyledNoteWrapper>
        <p><StyledGreenBold>Note!</StyledGreenBold> Preferred <StyledBold>date/time to be confirmed</StyledBold> upon scheduling.</p>
      </StyledNoteWrapper>
      <Field
        name={`${nameof<FormValues>('shootInfo')}.${nameof<ShootInfo>('note')}`}
        placeholder='Some notes here...'
        component={TextareaField}
        label='Notes for photographer:'
      />
      <StyledNoteWrapper>
        <p><StyledGreenBold>Note!</StyledGreenBold> Include special considerations and/or capture suggestions.</p>
      </StyledNoteWrapper>
      <StyledGrid>
        <Field
          name={`${nameof<FormValues>('shootInfo')}.${nameof<ShootInfo>('occupancy')}`}
          component={SelectField}
          label='Occupancy:'
          placeholder='Occupancy...'
          options={getOccupancyOptions()}
        />
        <Field
          name={`${nameof<FormValues>('shootInfo')}.${nameof<ShootInfo>('lockBox')}`}
          label='Lock-box'
          component={CheckboxField}
          compactMode={false}
        />
      </StyledGrid>
    </Panel>
  )
}

export default ShootInfoPanel
