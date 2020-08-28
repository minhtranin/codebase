import Button from '#veewme/web/common/buttons/basicButton'
import Modal from '#veewme/web/common/modal'
import styled from '#veewme/web/common/styled-components'
import * as React from 'react'

const StyledContent = styled.div`
  padding-bottom: 36px;
`

const StyledButtonsWrapper = styled.div `
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  & > * {
    margin-left: 16px;
  }
`

interface SubmitModalProps {
  isOpen: boolean
  invoiceLink: string
  propertiesListLink: string
  onToggle: () => void
}

const SubmitModal: React.FunctionComponent<SubmitModalProps> = props => {
  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.onToggle} title='Thank you for your order!'>
      <StyledContent>
        <p>A confirmation of this order has been sent to your email address.</p>
      </StyledContent>
      <StyledButtonsWrapper>
        <Button full buttonTheme='action' label='Go to your properties list' to={props.propertiesListLink}/>
        <Button buttonTheme='action' label='Show invoice' to={props.invoiceLink}/>
      </StyledButtonsWrapper>
    </Modal>
  )
}

export default SubmitModal
