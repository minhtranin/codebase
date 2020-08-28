import { nameof } from '#veewme/lib/util'
import Button from '#veewme/web/common/buttons/basicButton'
import CheckMarkStamp from '#veewme/web/common/checkMarkStamp'
import InputField from '#veewme/web/common/formikFields/inputField'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field } from 'formik'
import * as React from 'react'
import { NewOrderValues } from '../common'
import { FormValues } from '../newOrderForm'
import { StyledInlineWrapper, StyledOldPrice, StyledPanelContentWrapper, StyledPrice } from './styled'

const StyledTotalWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledTotalLabel = styled.h4`
  font-size: 26px;
  font-weight: 400;
  color: ${props => props.theme.colors.LABEL_TEXT};
`

const StyledButtonWrapper = styled.div `
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-bottom: 6px;
`

const StyledCheckMarkWrapper = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-right: 5px;
`

const StyledCheckMarkStamp = styled(CheckMarkStamp)`
  width: 20px;
  height: 20px;
  background-color: ${props => props.theme.colors.GREEN};
`

interface CostSummaryPanelProps {
  values: NewOrderValues
  currency?: string
  discount: number
  validPromoCode: boolean
  onApplyPromoCode: () => void
}

// TODO Show that a code is invalid?
const CostSummaryPanel: React.FunctionComponent<CostSummaryPanelProps> = ({ currency = '$', ...props }) => {
  let newPrice = props.values.orderTotal
  if (props.discount) {
    newPrice -= props.discount
  }

  return (
    <Panel heading='Cost Summary'>
      <StyledPanelContentWrapper>
        <StyledInlineWrapper>
          <Field
            name={nameof<FormValues>('promoCodeToCheck')}
            component={InputField}
            label='Enter Promo Code:'
            compactMode
            rightComponent={ props.validPromoCode &&
              <StyledCheckMarkWrapper>
                <StyledCheckMarkStamp/>
              </StyledCheckMarkWrapper>
            }
          />
          <StyledButtonWrapper>
            <Button
              type='button'
              buttonTheme='action'
              full
              label='Apply'
              onClick={props.onApplyPromoCode}
            />
          </StyledButtonWrapper>
        </StyledInlineWrapper>
        <StyledTotalWrapper>
          <StyledTotalLabel>
            Total:
          </StyledTotalLabel>
          <StyledPrice>
            {currency}{newPrice.toFixed(2)}
          </StyledPrice>
          {newPrice !== props.values.orderTotal &&
            <StyledOldPrice>
              {currency}{props.values.orderTotal.toFixed(2)}
            </StyledOldPrice>
          }
        </StyledTotalWrapper>
      </StyledPanelContentWrapper>
    </Panel>
  )
}

export default CostSummaryPanel
