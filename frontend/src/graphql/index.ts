import Vue from 'vue';
import ApolloClient from 'apollo-client';
import VueApollo from 'vue-apollo';
import { typeDefs } from "./resolvers";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { BatchHttpLink } from "apollo-link-batch-http";
import { ApolloLink } from 'apollo-link'

const cache = new InMemoryCache();
// cache.writeData({
//   data: {
//     users: [
//       {
//         __typename: 'User',
//         id: 1,
//         login: 'admin',
//       },
//     ],
//   },
// });
Vue.use(VueApollo);
const httpOptions = {
  uri: process.env.BASE_URL
}
const httpLink = ApolloLink.split(
  operation => operation.getContext().hasUpload,
  createUploadLink(httpOptions),
  new BatchHttpLink(httpOptions)
)
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    // ...
    httpLink
  ]),
  typeDefs,
  // resolvers: {},
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  }
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
