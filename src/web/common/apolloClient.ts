import introspectionQueryResultData from '#veewme/gen/graphqlTypes'
import { publicUrls } from '#veewme/lib/urls'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink, NextLink, Operation } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { createUploadLink } from 'apollo-upload-client'
import history from './history'

// TODO: remove when feature added
// https://github.com/apollographql/apollo-feature-requests/issues/6
function stripTypenames (obj: any, propToDelete: string) {
  for (const property in obj) {
    if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
      delete obj.property
      const newData = stripTypenames(obj[property], propToDelete)
      obj[property] = newData
    } else {
      if (property === propToDelete) {
        delete obj[property]
      }
    }
  }
  return obj
}

const removeTypenameMiddleware = new ApolloLink((operation: Operation, forward: NextLink) => {
  if (operation.variables) {
    operation.variables = stripTypenames(operation.variables, '__typename')
  }
  return forward ? forward(operation) : null
})

const logoutLink = onError(({ networkError }) => {
  // TODO: add handling other errors
  // server TODO: auth handling (e.g. responses should return 401 when needed)

  // https://github.com/apollographql/apollo-link/issues/300
  if (
    networkError
    && ('statusCode' in networkError)
    && networkError.statusCode === 401
  ) {
    history.push(publicUrls.login)
  }
})

const uploadLink = createUploadLink({
  credentials: 'include',
  uri: process.env.GRAPHQL_ENDPOINT
})

const link = ApolloLink.from([
  logoutLink,
  removeTypenameMiddleware,
  uploadLink
])

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({ fragmentMatcher }),
  connectToDevTools: process.env.APOLLO_CONNECT_TO_DEV_TOOLS === 'true',
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    },
    watchQuery: {
      fetchPolicy: 'no-cache'
    }
  },
  link
})

export default apolloClient
