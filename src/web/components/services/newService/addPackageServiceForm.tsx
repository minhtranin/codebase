import { Service } from '#veewme/lib/types'
import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { nameof } from '../../../../lib/util'
import Button from '../../../common/buttons/basicButton'
import CheckboxField from '../../../common/formikFields/checkboxField'
import styled from '../../../common/styled-components'
import { CounterTextDiv } from '../common/styled'

const ServiceItem = styled.li<{disabled: boolean}>`
  opacity: ${props => props.disabled ? '0.4' : '1'};

  & > div {
    padding: 6px 0;
  }
`

const CustomScroll = styled(Scrollbars)`
  margin: 15px 0 30px;
`

const ServiceList = styled.ul`
`

export const maxPackageServicesCount = 9

interface CustomProps {
  onSubmit: (values: Service[]) => void
  services: Service[] // list of all services
  packageServices: Service['packageServices'] // ids of services already included in package
}

interface SelectableService extends Service {
  checked: boolean
}

interface FormValues {
  services: SelectableService[]
}

type PackageServicesFormViewProps = FormikProps<FormValues> & CustomProps

class PackageServicesFormView extends React.Component<PackageServicesFormViewProps, {}> {
  render () {
    const { values: { services }, submitForm } = this.props
    const selectedServicesCount = services.filter(service => service.checked).length

    return (
      <Form>
        <CounterTextDiv>
          {`${selectedServicesCount} selected out of ${maxPackageServicesCount}`}
        </CounterTextDiv>
        <CustomScroll autoHeight={true} autoHeightMax={200}>
          <ServiceList>
            {
              services.map((service, i) => {
                const disabled = selectedServicesCount >= maxPackageServicesCount && !service.checked
                return (
                  <ServiceItem
                    key={service.id}
                    disabled={disabled}
                    title={disabled ? 'Package includes max number of services' : ''}
                  >
                    <Field
                      name={`${nameof<FormValues>('services')}[${i}].checked`}
                      component={CheckboxField}
                      label={service.name}
                      disabled={disabled}
                    />
                  </ServiceItem>
                )
              })
            }
          </ServiceList>
        </CustomScroll>
        <Button full buttonTheme='action' type='button' label='Add Services' onClick={submitForm} />
      </Form>
    )
  }
}

const PackageServicesForm = withFormik<CustomProps, FormValues>({
  handleSubmit:  (values, { props }) => {
    const services = values.services.filter(service => service.checked)
    props.onSubmit(services)
  },
  mapPropsToValues: props => ({
    // 'check' services that are already included in package
    services: props.services.map(service => ({
      ...service,
      checked: !!(props.packageServices || []).find(ps => ps.id === service.id)
    }))
  })
})(PackageServicesFormView)

export default PackageServicesForm
