import * as React from 'react'
import Button from './buttons/basicButton'
import Modal from './modal'
import styled from './styled-components'

const ModalContent = styled.div`
  p {
    font-size: 15px;
    color: ${props => props.theme.colors.LABEL_TEXT};
    margin-bottom: 20px;
  }

  strong {
    font-weight: 500;
  }

  div {
    display: flex;
    justify-content: flex-end;

    button {
      margin-left: 8px;
    }
  }
`

type ToggleModal = () => void
interface DeleteConfirmationProps {
  message: JSX.Element | string
  onConfirm: () => void
  children: (toggleConfirmationModal: ToggleModal) => React.ReactNode // render prop pattern
}

interface DeleteConfirmationState {
  showDeleteConfirmation: boolean
}

class DeleteConfirmation extends React.Component<DeleteConfirmationProps, DeleteConfirmationState> {
  state: DeleteConfirmationState = {
    showDeleteConfirmation: false
  }

  toggleDeleteConfirmation = () => {
    this.setState(prev => ({
      showDeleteConfirmation: !prev.showDeleteConfirmation
    }))
  }

  handleDelete = () => {
    this.toggleDeleteConfirmation()
    this.props.onConfirm()
  }

  render () {
    return (
      <>
        {/* render prop pattern */}
        {this.props.children(this.toggleDeleteConfirmation)}
        <Modal
          isOpen={this.state.showDeleteConfirmation}
          onRequestClose={this.toggleDeleteConfirmation}
          title='Delete confirmation'
          centerVertically={true}
        >
          <ModalContent>
            <p>
              {this.props.message}
            </p>
            <div>
              <Button
                buttonTheme='action'
                label='Cancel'
                onClick={this.toggleDeleteConfirmation}
              />
              <Button
                buttonTheme='alert'
                label='Delete'
                onClick={() => this.handleDelete()}
              />
            </div>
          </ModalContent>
        </Modal>
      </>
    )
  }
}

export default DeleteConfirmation
