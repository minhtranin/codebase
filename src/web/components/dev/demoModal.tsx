import * as log from '#veewme/web/common/log'
import * as React from 'react'
import { useState } from 'react'
import Button from '../../common/buttons/basicButton'
import Modal from '../../common/modal'
import styled from '../../common/styled-components'

const StyledWrapperDiv = styled.div`
  padding: 25px;
`

const StyledP = styled.div`
  padding-bottom: 35px;
`

export const ModalExample: React.FunctionComponent<{}> = () => {
  const [isOpen, toggleModal] = useState<boolean>(false)

  return (
    <StyledWrapperDiv>
      <Modal isOpen={isOpen} onRequestClose={() => toggleModal(prev => !prev)} title='Modal title'>
        <StyledP>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </StyledP>
        <Button buttonTheme='action' label='Test' onClick={() => log.debug('modal 1 content clicked')}/>
      </Modal>
      <Button buttonTheme='action' label='Open modal' onClick={() => toggleModal(prev => !prev)}/>
    </StyledWrapperDiv>
  )
}

export const ModalExample2: React.FunctionComponent<{}> = () => {
  const [isOpen, toggleModal] = useState<boolean>(false)

  return (
    <StyledWrapperDiv>
      <Modal centerVertically={true} isOpen={isOpen} onRequestClose={() => toggleModal(prev => !prev)} title='Some title'>
        <StyledP>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </StyledP>
        <Button buttonTheme='action' label='Test' onClick={() => log.debug('modal 2 content clicked')}/>
      </Modal>
      <Button buttonTheme='action' label='Open modal (vertically centered)' onClick={() => toggleModal(prev => !prev)}/>
    </StyledWrapperDiv>
  )
}

const ModalExamples: React.FunctionComponent<{}> = () => (
  <>
    <ModalExample />
    <ModalExample2 />
  </>
)

export default ModalExamples
