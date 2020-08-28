import { Countries, States } from '#veewme/lib/constants'
import {
  Address,
  Company,
  ContactInfo,
  SurveyFields,
  SurveyValues,
  UserSignup,
  UserSignupValues
} from '#veewme/web/common/formPanels/valuesInterfaces'
import { Field } from 'formik'
import * as React from 'react'
import { nameof } from '../../../../lib/util'
import Input from '../../../common/formikFields/inputField'
import Select from '../../../common/formikFields/selectField'
import Switch from '../../../common/formikFields/switchField'
import Textarea from '../../../common/formikFields/textareaField'
import { FormGroup, FormRightColumn } from './styled'

export const BasicInformation: React.FunctionComponent = () => {
  return (
    <>
      <h6>Basic form</h6>
      <FormGroup>
        <Field
          label='E-mail / User name'
          component={Input}
          name={`${nameof<UserSignupValues>('user')}.${nameof<UserSignup>('email')}`}
          type='email'
        />
        <Field
          label='Password (minimum 6 characters)'
          component={Input}
          name={`${nameof<UserSignupValues>('user')}.${nameof<UserSignup>('password')}`}
          type='password'
        />
        <Field
          label='Confirm password'
          component={Input}
          name={nameof<UserSignupValues>('passwordConfirm')}
          type='password'
        />
      </FormGroup>
    </>
  )
}

export const PersonalInformation: React.FunctionComponent = () => {
  return (
    <>
      <h6>Personal Information</h6>
      <FormGroup>
        <Field
          label='First name'
          component={Input}
          name={`${nameof<UserSignupValues>('user')}.${nameof<UserSignup>('firstName')}`}
        />
        <Field
          label='Last name'
          component={Input}
          name={`${nameof<UserSignupValues>('user')}.${nameof<UserSignup>('lastName')}`}
        />
      </FormGroup>
    </>
  )
}

export const CompanyInformation: React.FunctionComponent = props => {
  return (
    <>
      <h6>Company Information</h6>
      <FormGroup>
        <Field
          label='Company Name'
          component={Input}
          name={nameof<Company>('companyName')}
        />
        <Field
          label='Street Address'
          component={Input}
          name={nameof<Address>('street')}
        />
        <Field
          label='City'
          component={Input}
          name={nameof<Address>('city')}
        />
        <Field
          name={nameof<Address>('state')}
          label='State / Province'
          component={Select}
          options={States}
          isSearchable
        />
        <Field
          label='ZIP / Postal Code'
          component={Input}
          name={nameof<Address>('zip')}
        />
        <Field
          name={nameof<Address>('country')}
          label='Country'
          component={Select}
          options={Countries}
          isSearchable
        />
      </FormGroup>
    </>
  )
}

export const ContactInformation: React.FunctionComponent = () => {
  return (
    <>
      <h6>Contact Information</h6>
      <FormGroup>
        <Field
          label='Website address'
          component={Input}
          name={nameof<ContactInfo>('website')}
        />
        <Field
          label='Phone number'
          component={Input}
          name={nameof<ContactInfo>('phone')}
        />
      </FormGroup>
    </>
  )
}

export const RightFormFields: React.FunctionComponent = () => {
  return (
    <>
      <Field
        label='How did you hear about us?'
        component={Textarea}
        name={`${nameof<SurveyValues>('survey')}.${nameof<SurveyFields>('heardAboutUsFrom')}`}
      />
      <Field
        label='Are you currently using a platform to manage and deliver media content?'
        component={Switch}
        name={`${nameof<SurveyValues>('survey')}.${nameof<SurveyFields>('currentlyUsingManagingApp')}`}
        labelFirst
      />
      <Field
        label='How many tours are you currently shooting yearly?'
        component={Input}
        name={`${nameof<SurveyValues>('survey')}.${nameof<SurveyFields>('toursYearly')}`}
      />
      <Field
        label='What are the most important things for you in a content management and delivery platform?'
        component={Textarea}
        name={`${nameof<SurveyValues>('survey')}.${nameof<SurveyFields>('importantThingsInManagingApp')}`}
      />
      <Field
        label='Other comments:'
        component={Textarea}
        name={`${nameof<SurveyValues>('survey')}.${nameof<SurveyFields>('other')}`}
      />
    </>
  )
}

export const RightColumnContent: React.FunctionComponent = () => {
  return (
    <FormRightColumn>
      <p>
        Thank you for registering to use the VeewMe content management and delivery platform, we appreciate your interest.
      </p>
      <p>
        Before we can approve your registration there is some qualifying criteria. Because of the popularity of our platform we have been forced to be selective whom we accept as an affiliate.
      </p>
      <h6>To be considered, you must:</h6>
      <ul>
        <li>Be an active real estate photographer/filmmaker.</li>
        <li>Be able to verify the legitimacy of your business.</li>
        <li>Have an active functioning photography/video website.</li>
        <li>Submit current and valid location of your business such as city and state.</li>
        <li>Submit valid contact info: phone number and email address.</li>
      </ul>
      <h5>Please answer the following few questions.</h5>
      <p>Please answer the following few questions.</p>
      <RightFormFields />
      <p>
        Once we have been able to verify your submission you will receive further on-boarding information.
      </p>
      <p>
        If you are a new real estate photography business please reach out to us via phone or email.
      </p>
      <p>
        Note! We are currently only accepting affiliates in selected areas. Please contact our business development department to find out which areas are not being considered.
      </p>
      <p>
        Thank you for your consideration <br/>
        The VeewMe Team
      </p>
    </FormRightColumn>
  )
}
