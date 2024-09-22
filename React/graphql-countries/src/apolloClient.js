import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/', // Public GraphQL API for countries
  cache: new InMemoryCache(),
});

export default client;
