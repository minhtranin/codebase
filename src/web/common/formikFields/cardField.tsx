import { Card as CardType } from '#veewme/lib/types'
import { FieldProps } from 'formik'
import * as React from 'react'
import Card, { CardProps } from '../card'
import CheckMarkStamp from '../checkMarkStamp'
import styled from '../styled-components'

export const StyledCheckMarkStamp = styled(CheckMarkStamp) `
  display: none;
  position: absolute;
  top: 3px;
  left: 3px;
  width: 36px;
  height: 36px;
  z-index: 10;
  background-color: black;
`

const StyledCard = styled(Card) `
`

const StyledCardWrapper = styled.div<{checked?: boolean}> `
  position: relative;
  & > ${StyledCard} {
    box-shadow: ${props => props.checked ? '0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' : 'none'};
  }
  & > ${StyledCheckMarkStamp} {
    display: ${props => props.checked ? 'flex' : 'none'}
  }
`

export type FormikCardProps = FieldProps & CardProps & CardType

class FormikCard extends React.Component<FormikCardProps> {
  handleClick = () => {
    const value = this.props.field.value === this.props.id ? '' : this.props.id
    this.props.form.setFieldValue(this.props.field.name, value)
  }

  render () {
    const { field, form, ...props } = this.props
    return (
      <StyledCardWrapper
        className={props.className}
        onClick={this.handleClick}
        checked={field.value === props.id}
      >
        <StyledCheckMarkStamp/>
        <StyledCard {...props}>
          {props.children}
        </StyledCard>
      </StyledCardWrapper>
    )
  }
}

export default FormikCard
