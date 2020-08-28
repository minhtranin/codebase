import Button from '#veewme/web/common/buttons/basicButton'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { LAST_STEP } from './newOrderForm'
import { StyledFooter, StyledFooterSpan, StyledFooterText } from './styled'

interface StepFooterProps {
  step: number
  enableNext?: boolean
  orderTotal?: number
}

const StepFooter: React.FunctionComponent<StepFooterProps & RouteComponentProps> = props => (
  <StyledFooter>
    {props.step === 0 &&
      <StyledFooterText>Your current order total: <StyledFooterSpan>${props.orderTotal}</StyledFooterSpan></StyledFooterText>
    }
    {props.step > 0 &&
      <Button to={String(props.step - 1)} buttonTheme='action' label='Previous Step'/>
    }
    {props.step < LAST_STEP - 1 &&
      <Button to={props.enableNext ? String(props.step + 1) : '#'} disabled={!props.enableNext} buttonTheme='action' full label='Next Step' />
    }
    {props.step === LAST_STEP - 1 &&
      <Button to={props.enableNext ? String(props.step + 1) : '#'} disabled={!props.enableNext} buttonTheme='action' full label='Continue to payment' />
    }
    {props.step === LAST_STEP &&
      <Button type='submit' buttonTheme='action' full label='Submit'/>
    }
  </StyledFooter>
)

StepFooter.defaultProps = {
  enableNext: true,
  orderTotal: 0,
  step: 0
}

export default withRouter(StepFooter)
