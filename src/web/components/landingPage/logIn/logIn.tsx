import { LogInComponent, MeComponent } from '#veewme/gen/graphqlTypes'
import * as urls from '#veewme/lib/urls'
import Button from '#veewme/web/common/buttons/basicButton'
import { DotSpinnerModal } from '#veewme/web/common/spinners/dotSpinner'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { useToasts } from 'react-toast-notifications'
import LoginForm from './loginForm/loginForm'

const LogIn: React.FunctionComponent<RouteComponentProps> = ({ history }) => {
  const { addToast } = useToasts()
  return (
    <MeComponent onCompleted={() => { history.push(urls.privateUrls.panel) }}>
      {() => (
        <>
          <LogInComponent
            onCompleted={() => { history.push(urls.privateUrls.panel) }}
            onError={error => {
              addToast(error.message, { appearance: 'error', autoDismiss: true, pauseOnHover: true , autoDismissTimeout: 10000 })
            }}
          >
            {(submit, { loading }) => {
              return (
                <>
                  <DotSpinnerModal isOpen={loading} />
                  <LoginForm
                    onSubmit={values => submit({ variables: values })}
                  />
                </>
              )
            }}
          </LogInComponent>
          {/* TODO remove below component later. Leave it for now for quick login*/}
          <LogInComponent
            onCompleted={() => { history.push(urls.privateUrls.panel) }}
          >
            {(submit, { error }) => (
              <div style={{ margin: '20px 10%' }}>
                <div>Temporary quick login test buttons. Will be removed later</div>
                <Button
                  label='Non-existing user'
                  onClick={() => {
                    submit({ variables: {
                      email: 'non-existing',
                      password: 'password'
                    }}).catch()
                  }}
                />
                <Button
                  label='Admin'
                  onClick={() => {
                    submit({ variables: {
                      email: 'admin@2.veewme.com',
                      password: 'password'
                    }}).catch()
                  }}
                />
                <Button
                  label='Developer'
                  onClick={() => {
                    submit({ variables: {
                      email: 'developer@2.veewme.com',
                      password: 'password'
                    }}).catch()
                  }}
                />
                <Button
                  label='Affiliate'
                  onClick={() => {
                    submit({ variables: {
                      email: 'affiliate1@2.veewme.com',
                      password: 'password'
                    }}).catch()
                  }}
                />
                <Button
                  label='Agent'
                  onClick={() => {
                    submit({ variables: {
                      email: 'agent1@2.veewme.com',
                      password: 'password'
                    }}).catch()
                  }}
                />
                <Button
                  label='Photographer'
                  onClick={() => {
                    submit({ variables: {
                      email: 'photographer@2.veewme.com',
                      password: 'password'
                    }}).catch()
                  }}
                />
                <Button
                  label='Processor'
                  onClick={() => {
                    submit({ variables: {
                      email: 'processor@2.veewme.com',
                      password: 'password'
                    }}).catch()
                  }}
                />
                {error &&
                  <div>
                    Bad credentials
                  </div>
                }
              </div>
            )}
          </LogInComponent>
        </>
      )}
    </MeComponent>
  )
}

export default withRouter(LogIn)
