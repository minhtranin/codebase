import { Field, Form, FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import InputField from '../../../common/formikFields/inputField'
import RadioField from '../../../common/formikFields/radioInputField'
import { Label } from '../../../common/formikFields/styled'
import TextareaField from '../../../common/formikFields/textareaField'
import * as Grid from '../../../common/grid'
import { NavHashLink } from '../../../common/hashLink'
import InlineHelp from '../../../common/inlineHelp'
import Panel from '../../../common/panel'
import SecondaryNavigation from '../../../common/secondaryNavigation'
import styled from '../../../common/styled-components'
import { AppearanceHolder } from '../styled'
import { Appearance, OrderInteractiveDetails } from '../types'

const Hint = styled.div`
  padding: 10px 0 20px 0;
  font-size: 13px;
  color: ${props => props.theme.colors.LABEL_TEXT}
`

const InputInlineHelp = styled(InlineHelp)`
  padding: 4px 6px;
`

const InfoWrapper = styled.span`
  color: ${props => props.theme.colors.GREEN}
`

interface CustomProps {
  onSubmit: (values: OrderInteractiveDetails) => void
  data?: OrderInteractiveDetails
}

export type FormValues = OrderInteractiveDetails

type InteractiveFormViewProps = FormikProps<FormValues> & CustomProps

class InteractiveFormView extends React.Component<InteractiveFormViewProps, {}> {
  render () {
    return (
      <>
        <Grid.Wrapper as={Form} >
          <Grid.Heading>
           <h1>{this.props.data ? 'Edit Interactive' : 'Add New Interactive'}</h1>
          </Grid.Heading>
          <Grid.LeftDesktopAside>
            <SecondaryNavigation>
              <li><NavHashLink to='#details'>Interactive Details</NavHashLink></li>
            </SecondaryNavigation>
          </Grid.LeftDesktopAside>
          <Grid.MainColumn>
            <Panel id='details' heading='Interactive Details'>
              <Field name={nameof<FormValues>('label')} component={InputField} label='Label' />
              <Hint><InfoWrapper>Note!</InfoWrapper> If you add multiple interactives then Navigation will reset to Interactive and a sub-menu will show with set labels.</Hint>
              <AppearanceHolder>
                <Label>Appearance on tours</Label>
                <Field
                  name={nameof<FormValues>('appearance')}
                  value={Appearance.Always}
                  component={RadioField}
                  label='Show Always'
                  size='s'
                />
                <Field
                  name={nameof<FormValues>('appearance')}
                  value={Appearance.Branded}
                  component={RadioField}
                  label='Only Branded'
                  size='s'
                />
                <Field
                  name={nameof<FormValues>('appearance')}
                  value={Appearance.Unbranded}
                  component={RadioField}
                  label='Only Unbranded'
                  size='s'
                />
                <Field
                  name={nameof<FormValues>('appearance')}
                  value={Appearance.Hide}
                  component={RadioField}
                  label='Hide'
                  size='s'
                />
              </AppearanceHolder>
              <Field name={nameof<FormValues>('embeddedCode')} component={TextareaField} label='Embedded code (For Display On Tour)' />
              <Field
                name={nameof<FormValues>('url')}
                component={InputField}
                label='Direct Link (URL)'
                rightComponent={<InputInlineHelp text='Lorem ipsum'/>}
              />
            </Panel>
          </Grid.MainColumn>
          <Grid.Footer />
        </Grid.Wrapper>
      </>
    )
  }
}

const initialData: OrderInteractiveDetails = {
  appearance: Appearance.Always,
  embeddedCode: '',
  label: '',
  url: ''
}

const InteractiveForm = withFormik<CustomProps, FormValues>({
  handleSubmit:  (values, { setSubmitting, props }) => {
    props.onSubmit(values)
    setSubmitting(false)
  },
  mapPropsToValues: props => ({
    ...initialData,
    ...props.data
  })
})(InteractiveFormView)

export default InteractiveForm
