import { Role } from '#veewme/gen/graphqlTypes'
import { nameof } from '#veewme/lib/util'
import InputField from '#veewme/web/common/formikFields/inputField'
import SwitchField from '#veewme/web/common/formikFields/switchField'
import UploadImageField from '#veewme/web/common/formikFields/uploadImageField'
import Editor from '#veewme/web/common/formikFields/wysiwygEditor'
import InlineHelp from '#veewme/web/common/inlineHelp'
import Panel from '#veewme/web/common/panel'
import styled from '#veewme/web/common/styled-components'
import { Field } from 'formik'
import * as React from 'react'
import { AgentValues, User, UserValues } from './valuesInterfaces'

const FieldSpanAll = styled(Field)``

const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 250px;
  column-gap: 30px;
  & > * {
    grid-column: 1
    & > * {width: 100%}
  }
  & > *:nth-child(7) {
    grid-column: 2;
    grid-row-start: 1;
    grid-row-end: 6;
    margin-top: 35px;
  }
  & > *:last-child, & > *:nth-last-child(2) {grid-column: 1/-1}
`

const BioLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  & > *:last-child {
    margin-left: 10px;
  }
`

const OfficeAdminWrapper = styled.div`
  display: flex;
  align-items: center;
  & > *:first-child {
    margin-right: 10px;
  }
`

const OfficeAdmin: React.FunctionComponent = () => {
  return (
    <OfficeAdminWrapper>
      <InlineHelp
        text={
          'Designate client as an Office Admin. This will provide the Admin\n'
          + 'with access to all office orders and media for each order.\n'
          + 'You can also select to receive Order Confirmation\n'
          + 'and Order Completion email for all orders.'
        }
      />
      <Field
        component={SwitchField}
        label='Office Admin'
        name={nameof<AgentValues>('officeAdmin')}
        labelFirst
      />
    </OfficeAdminWrapper>
  )
}

interface AccountInformationProps {
  role: Role
}

class AccountInformation extends React.PureComponent<AccountInformationProps> {
  render () {
    const showOfficeAdminOption = this.props.role === 'AFFILIATE'
    return (
      <Panel
        headingPlacedComponent={showOfficeAdminOption ? <OfficeAdmin /> : undefined}
        heading='Account Information'
        id='account'
        toggleable
      >
        <AccountGrid>
          <Field component={InputField} name={`${nameof<UserValues>('user')}.${nameof<User>('firstName')}`} label='First Name' />
          <Field label='Last Name:' component={InputField} name={`${nameof<UserValues>('user')}.${nameof<User>('lastName')}`}/>
          <Field label='Title:' component={InputField} name={nameof<AgentValues>('title')}/>
          <Field label='Agent ID:' component={InputField} name={nameof<AgentValues>('agentMLSid')}/>
          <Field label='Designations:' component={InputField} name={nameof<AgentValues>('designations')}/>
          <Field label='Others (CalBRE, etc.):' component={InputField} name={nameof<AgentValues>('others')}/>
          <Field
            component={UploadImageField}
            name={nameof<AgentValues>('profilePicture')}
            label={<>
              Uploaded picture will be cropped/resized to a square.
              To achieve best results, upload a square or almost square picture.
            </>}
          />
          <FieldSpanAll label='Agent Bio:' component={Editor} name={nameof<AgentValues>('bio')} />
          <FieldSpanAll
            label={
              <BioLabelWrapper>
                <span>Agent bio/profile video URL:</span>
                <InlineHelp
                  text={
                    'A link (url) to agent bio / video. If enetered here\n'
                    + 'it will display on your property site / tour headshot\n'
                    + 'as video play icon. We recommend you use direct link\n'
                    + 'to a link vs. a web page.'
                  }
                />
              </BioLabelWrapper>
            }
            type='url'
            component={InputField}
            name={nameof<AgentValues>('profileUrl')}
          />
        </AccountGrid>
      </Panel>
    )
  }
}

export default AccountInformation
