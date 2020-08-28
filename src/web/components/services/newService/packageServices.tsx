import { Service } from '#veewme/lib/types'
import { FieldArray } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import CheckMarkSvg from '../../../assets/svg/checkmark.svg'
import Button from '../../../common/buttons/basicButton'
import { Label } from '../../../common/formikFields/styled'
import Modal from '../../../common/modal'
import styled from '../../../common/styled-components'
import { CounterTextDiv } from '../common/styled'
import AddServiceForm, { maxPackageServicesCount } from './addPackageServiceForm'
import { FormValues } from './form'

const Wrapper = styled.div`
  margin-bottom: 15px;
  padding: 25px 0;
  border-bottom: 1px solid ${props => props.theme.colors.BORDER};
`
const PackageHeading = styled.div`
  display: flex;

  ${Label} {
    flex: 1 1 0;
    font-weight: 500;
  }
`

const List = styled.ul`
  display: block;

  li {
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin: 15px 0;
    border: 1px solid ${props => props.theme.colors.BORDER};
    border-radius: 5px;
    font-size: 13px;
    font-weight: 500;

    & > div {
      display: flex;
      align-items: center;

      & > span {
        padding: 8px 0;
      }
    }
  }
`

const StyledCheckmark = styled(CheckMarkSvg)`
  width: 15px;
  height: 15px;
  margin: 0 15px;
  fill: ${props => props.theme.colors.GREEN}
`

const RemoveBtn = styled.button.attrs({
  type: 'button'
})`
  margin-left: 10px;
  padding: 0 10px;
  background: transparent;
  border: 0 none;
  outline: 0 none;
  border-left: 1px solid ${props => props.theme.colors.BORDER};
  color: ${props => props.theme.colors.ALERT};
  font-size: 30px;
  text-align: center;
  cursor: pointer;
`

const Total = styled.div`
  padding: 5px 0;
  font-weight: 500;
  font-size: 14px;
  text-align: right;

  span {
    font-weight: 600;
  }
`

interface PackageServicesProps {
  values: FormValues
  services: Service[]
}

interface PackageServicesState {
  modalOpen: boolean
  totalPrice: number
}

class PackageServices extends React.PureComponent<PackageServicesProps, PackageServicesState> {
  state = {
    modalOpen: false,
    totalPrice: 0
  }

  componentDidMount () {
    this.getPackageServicesTotalPrice()
  }

  componentDidUpdate (prevProps: PackageServicesProps) {
    const { values: { packageServices: prevPackageServices } } = prevProps
    const { values: { packageServices } } = this.props
    if (prevPackageServices !== packageServices) {
      this.getPackageServicesTotalPrice()
    }
  }
  getPackageServicesTotalPrice () {
    const { values: { packageServices = [] }, services } = this.props
    let totalPrice = 0

    // TODO remove cast
    totalPrice = services
      .filter(service => !!packageServices.find(ps => ps.id === service.id))
      .reduce((acc, service) => acc + service.price, 0)

    this.setState({
      totalPrice
    })
  }

  toggleModal = () => {
    this.setState(prev => ({
      modalOpen: !prev.modalOpen
    }))
  }

  render () {
    const { services } = this.props
    const packageServices = this.props.values.packageServices
    const packageServicesLength = packageServices.length

    return (
      <Wrapper>
        <PackageHeading>
          <Label>Package Services</Label>
          <Button buttonTheme='action' label='Add service' onClick={this.toggleModal} type='button' disabled={packageServicesLength === maxPackageServicesCount} />
        </PackageHeading>
        <CounterTextDiv alignRight={true}>
          {`${packageServicesLength} selected out of ${maxPackageServicesCount}`}
        </CounterTextDiv>
        <List>
        <FieldArray
          name={nameof<FormValues>('packageServices')}
          render={fieldArrayHelpers => (
            <>
              {
                services
                  .filter(service => !!packageServices.find(ps => ps.id === service.id))
                  .map((service: Service, index: number) => (
                    <li key={service.id}>
                      <div>
                        <StyledCheckmark />
                        <span>{service.name}</span>
                      </div>
                      <div>
                        <span>${service.price}</span>
                        <RemoveBtn onClick={() => fieldArrayHelpers.remove(index)}>&times;</RemoveBtn>
                      </div>
                    </li>
                  ))
                }
                <Modal isOpen={this.state.modalOpen} onRequestClose={this.toggleModal} title='Package Services'>
                  <AddServiceForm
                    services={services}
                    packageServices={packageServices}
                    onSubmit={(values: Service[]) => {
                      fieldArrayHelpers.form.setFieldValue('packageServices', values)
                      this.toggleModal()
                    }}
                  />
                </Modal>
            </>
          )}
        />
        </List>
        <Total> Total: <span>{this.state.totalPrice}$</span></Total>
      </Wrapper>
    )
  }
}

export default PackageServices
