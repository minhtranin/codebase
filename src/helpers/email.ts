// Please configure sender authentication here: https://app.sendgrid.com/settings/sender_auth
// Otherwise all emails will be thrown into Spambox.
// Don't forget to review dynamic templates: https://mc.sendgrid.com/dynamic-templates/new
import sendGrid from '@sendgrid/mail'

interface SendGridPayload {
  name: string
  targetEmail: string
  activationToken: string
}

sendGrid.setApiKey(process.env.SENDGRID_KEY || '')

const SENDGRID_TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID

export const sendBasicEmail = (targetEmail: string): Promise<{}> => {
  if (!targetEmail) return Promise.reject()
  const msg = {
    from: process.env.SENDGRID_FROM || '',
    html: '<strong>Welcome to VeewMe</strong>',
    subject: 'Welcome to VeewMe',
    templateId: SENDGRID_TEMPLATE_ID,
    to: targetEmail
  }

  return sendGrid.send(msg)
}

export const sendWelcomeEmail = (targetEmail: string, name: string): Promise<{}> => {
  const msg = {
    dynamic_template_data: {
      name
    },
    from: process.env.SENDGRID_FROM || '',
    html: '<strong>Welcome to VeewMe</strong>',
    subject: 'Welcome to VeewMe',
    templateId: SENDGRID_TEMPLATE_ID,
    to: targetEmail
  }

  return sendGrid.send(msg)
}

export const sendActivationLink = ({ targetEmail, name, activationToken }: SendGridPayload) => {
  const msg = {
    dynamic_template_data: {
      activationToken,
      name
    },
    from: process.env.SENDGRID_FROM || '',
    html: '<strong>Welcome to VeewMe. Please click the link to activate your account.</strong>',
    subject: 'Welcome to VeewMe',
    templateId: SENDGRID_TEMPLATE_ID,
    to: targetEmail
  }

  return sendGrid.send(msg)
}
