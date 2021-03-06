import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://platform-api-beta.opentargets.io/api/v4/graphql',
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});

const betaClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://platform-api-beta.opentargets.io/api/v4/graphql',
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});

export { betaClient };
export default client;
