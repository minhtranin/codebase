
import { Amenity } from '#veewme/lib/types'
import { nameof } from '#veewme/lib/util'
import PlusSvg from '#veewme/web/assets/svg/plus.svg'
import Button from '#veewme/web/common/buttons/basicButton'
import Chips, { Chip } from '#veewme/web/common/chips'
import InputField from '#veewme/web/common/formikFields/inputField'
import Modal from '#veewme/web/common/modal'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field, FieldArray } from 'formik'
import * as React from 'react'
import { FormValues } from '../newOrderForm'
import AddAmenitiesForm from './addAmenitiesForm'

const StyledAddAmenitiesWrapper = styled.div `
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding-bottom: 30px;
  & > :nth-child(2) {
    margin: 0 30px;
  }
`

const StyledInputWrapper = styled.div `
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  & > div {
    flex: 1;
    margin: 0 10px 0 0;
    & > div {
      margin: 0;
    }
  }
  input {width: 100%;}
`

const StyledAmenityField = styled(Field) `
  margin: 0;
`

const StyledAmenitiesListLabel = styled.p `
  font-size: 13px;
  color: ${props => props.theme.colors.LABEL_TEXT};
`

interface AmenitiesPanelProps {
  values: FormValues
  defaultAmenities: Amenity[]
}

interface AmenitiesPanelState {
  modalOpen: boolean
}

class AmenitiesPanel extends React.PureComponent<AmenitiesPanelProps, AmenitiesPanelState> {
  state: AmenitiesPanelState = {
    modalOpen: false
  }

  sortAmenities = (amenities: Amenity[]) => (
    amenities.sort((a, b) => a.label.localeCompare(b.label))
  )

  toggleModal = () => {
    this.setState(prev => ({
      modalOpen: !prev.modalOpen
    }))
  }

  render () {
    const { values } = this.props

    return (
      <Panel
        heading='Amenities'
        toggleable
        collapsed
      >
        <FieldArray
          name={nameof<FormValues>('amenities')}
          render={ ({ form, remove }) => (
            <>
              <StyledAddAmenitiesWrapper>
                <StyledInputWrapper>
                  <StyledAmenityField
                    name={nameof<FormValues>('amenityToAdd')}
                    component={InputField}
                    placeholder='Write and add own amenities...'
                  />
                  <Button
                    type='button'
                    full
                    buttonTheme='action'
                    icon={PlusSvg}
                    onClick={() => {
                      if (values.amenityToAdd.length > 0) {
                        const newAmenity = {
                          id: values.amenities.length, // TODO make optional for initial data
                          label: values.amenityToAdd
                        }
                        form.setFieldValue(nameof<FormValues>('amenities'), this.sortAmenities([...values.amenities, newAmenity]))
                        form.setFieldValue(nameof<FormValues>('amenityToAdd'), '')
                      }
                    }}
                  />
                </StyledInputWrapper>
                <p>or</p>
                <Button label='Add from list' onClick={this.toggleModal}/>
              </StyledAddAmenitiesWrapper>
              <Modal isOpen={this.state.modalOpen} onRequestClose={this.toggleModal} title='Amenities'>
                <AddAmenitiesForm
                  amenities={this.props.defaultAmenities}
                  selectedAmenities={values.amenities}
                  onSubmit={(addAmenities: Amenity[]) => {
                    const filteredAmenities = [
                      ...values.amenities.filter(amenity => !this.props.defaultAmenities.some(da => amenity.id === da.id)),
                      ...addAmenities
                    ]
                    form.setFieldValue('amenities', this.sortAmenities(filteredAmenities))
                    this.toggleModal()
                  }}
                />
              </Modal>
              <StyledAmenitiesListLabel>Amenities List:</StyledAmenitiesListLabel>
              <Chips
                chips={values.amenities}
                onChipDelete={(id: Chip['id']) => {
                  const chipIdx = values.amenities.findIndex(c => c.id === id)
                  if (chipIdx > -1) {
                    remove(chipIdx)
                  }
                }}
              />
            </>
          )}
        />
      </Panel>
    )
  }
}

export default AmenitiesPanel
