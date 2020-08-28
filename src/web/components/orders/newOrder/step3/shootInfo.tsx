import { defaultDateFormat } from '#veewme/web/common/consts'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { format } from 'date-fns'
import * as React from 'react'
import { NewOrderValues } from '../common'
import { StyledDetail, StyledDetailContent, StyledDetailLabel, StyledPanelContentWrapper } from './styled'

const StyledOccupancy = styled(StyledDetailContent)`
  text-transform: capitalize;
`

interface CustomProps {
  values: NewOrderValues
  dateFormat?: string
}

type ShootInfoPanelProps = CustomProps

const ShootInfoPanel: React.FunctionComponent<ShootInfoPanelProps> = ({ dateFormat = defaultDateFormat, ...props }) => {
  const { shootInfo } = props.values
  return (
    <Panel heading='Shoot Information'>
      <StyledPanelContentWrapper>
        <StyledDetail>
          <StyledDetailLabel>Preferred Shoot Date & Time:</StyledDetailLabel>
          <StyledDetailContent>{shootInfo.date && format(shootInfo.date, dateFormat)} {shootInfo.time}</StyledDetailContent>
        </StyledDetail>
        <StyledDetail>
          <StyledDetailLabel>Notes for photographer:</StyledDetailLabel>
          <StyledDetailContent>{shootInfo.note}</StyledDetailContent>
        </StyledDetail>
        <StyledDetail>
          <StyledDetailLabel>Occupancy:</StyledDetailLabel>
          <StyledOccupancy>{shootInfo.occupancy}</StyledOccupancy>
        </StyledDetail>
      </StyledPanelContentWrapper>
    </Panel>
  )
}

export default ShootInfoPanel
