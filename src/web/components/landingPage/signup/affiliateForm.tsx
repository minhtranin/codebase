import { CreateAffiliateComponent, CreateAffiliateMutationVariables } from '#veewme/gen/graphqlTypes'
import { AffiliateSignupValues } from '#veewme/web/common/formPanels/valuesInterfaces'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import { FormikProps, withFormik } from 'formik'
import * as React from 'react'
import { useToasts } from 'react-toast-notifications'
import Button from '../../../common/buttons/basicButton'
import {
  BasicInformation,
  CompanyInformation,
  ContactInformation,
  PersonalInformation,
  RightColumnContent
} from './formElements'
import { AccountForm, FormLeftColumn } from './styled'

interface AffiliateFormCustomProps {
  onSubmit: (values: CreateAffiliateMutationVariables) => void
}

type AffiliateFormProps = FormikProps<AffiliateSignupValues> & AffiliateFormCustomProps

const AffiliateForm: React.FunctionComponent<AffiliateFormProps> = props => {
  return (
    <AccountForm>
      <FormLeftColumn>
        <BasicInformation />
        <PersonalInformation />
        <CompanyInformation />
        <ContactInformation />
        <Button type='submit' label='Sign Up' buttonTheme='info' full size='big' />
      </FormLeftColumn>
      <RightColumnContent />
    </AccountForm>
  )
}

const AffiliateFormEnhanced = withFormik<AffiliateFormCustomProps, AffiliateSignupValues>({
  handleSubmit: (values, { props, setSubmitting }) => {
    const { passwordConfirm, survey, ...createAffiliateValues } = values
    props.onSubmit(createAffiliateValues)
    setSubmitting(false)
  },
  mapPropsToValues: () => ({
    city: '',
    companyName: '',
    country: 'US',
    passwordConfirm: '',
    phone: '',
    state: 'AL',
    street: '',
    user: {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    },
    zip: ''
  })
})(AffiliateForm)

const AffiliateFormContainer: React.FunctionComponent = props => {
  const { addToast } = useToasts()
  return (
    <CreateAffiliateComponent
      onCompleted={data => {
        addToast(
          `Account creation form for affiliate ${data.createAffiliate.companyName} and user name ${data.createAffiliate.user.email} was sent successfully.`,
          { appearance: 'success', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 }
        )
      }}
      onError={error => {
        addToast(error.message, { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 })
      }}
    >
      {(submit, { loading }) => {
        return (
          <>
            <DotSpinnerModal isOpen={loading} />
            <AffiliateFormEnhanced
              onSubmit={(values: CreateAffiliateMutationVariables) => submit({ variables: values })}
            />
          </>
        )
      }}
    </CreateAffiliateComponent>
  )
}

export default AffiliateFormContainer
