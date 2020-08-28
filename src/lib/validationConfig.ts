import { setLocale } from 'yup'

setLocale({
  mixed: {
    oneOf: params => {
      if (typeof params.value === 'boolean') {
        return 'Field must be checked'
      }
      return `Field must be of following values: ${params.values}`
    },
    required: 'This field is required'
  },
  string: {
    email: ' Incorrect email address'
  }
})
