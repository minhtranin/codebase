import { Order } from '#veewme/graphql/types'
import Button from '#veewme/web/common/buttons/basicButton'
import DropDownButton from '#veewme/web/common/buttons/dropDownButton'
import IconButton from '#veewme/web/common/buttons/iconButton'
import Tooltipped from '#veewme/web/common/tooltipped'
import * as React from 'react'
import { StyledIcon } from 'styled-icons/types'
import { ActionClickCallback, ActionId } from './common'
import { StyledActionBar, StyledActionBarButtonsContainer } from './styled'

const delayShow = 1500

export interface Action {
  label: string
  id: ActionId
  linkTo?: string
}

export interface TooltippedIconButton {
  icon: React.SVGFactory | StyledIcon
  actionId: ActionId
  linkTo?: string
  tooltip: string
}

interface ActionBarProps {
  order: Order
  buttonActions: Action[]
  dropDownButtonLabel: string
  dropDownActions: Action[]
  tooltippedIconButtons: TooltippedIconButton[]
  onActionClick: ActionClickCallback
}

const ActionBar: React.FunctionComponent<ActionBarProps> = props => (
  <StyledActionBar>
    <StyledActionBarButtonsContainer>
      {props.buttonActions.map((action, idx) => {
        if (action.linkTo) {
          return (
            <Button
              key={idx}
              label={action.label}
              to={action.linkTo}
            />
          )
        } else {
          return (
            <Button
              key={idx}
              label={action.label}
              onClick={() => props.onActionClick(props.order.id, action.id)}
            />
          )
        }
      })}
      <DropDownButton
        label={props.dropDownButtonLabel}
        list={[
          {
            items: props.dropDownActions.map(action => {
              if (action.linkTo) {
                return ({
                  label: action.label,
                  linkTo: action.linkTo
                })
              } else {
                return ({
                  label: action.label,
                  onClick: () => props.onActionClick(props.order.id, action.id)
                })
              }
            }),
            itemSize: 's'
          }
        ]}
      />
    </StyledActionBarButtonsContainer>
    <StyledActionBarButtonsContainer>
      {props.tooltippedIconButtons.map((button, idx) => {
        if (button.linkTo) {
          return (
            <Tooltipped
              key={idx}
              tooltip={button.tooltip}
              delayShow={delayShow}
            >
              <IconButton
                castAs='link'
                size='big'
                Icon={button.icon}
                to={button.linkTo}
              />
            </Tooltipped>
          )
        } else {
          return (
            <Tooltipped
              key={idx}
              tooltip={button.tooltip}
              delayShow={delayShow}
            >
              <IconButton
                type='button'
                castAs='button'
                size='big'
                Icon={button.icon}
                onClick={() => props.onActionClick(props.order.id, button.actionId)}
              />
            </Tooltipped>
          )
        }
      })}
      </StyledActionBarButtonsContainer>
  </StyledActionBar>
)

export default ActionBar
