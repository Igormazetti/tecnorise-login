import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import store from "./redux/store";

const httpLink = createHttpLink({
  uri: "http://dev.gear-tecnorise.com:4000/api",
});

const authLink = setContext((_, { headers }) => {
  const token = store.getState().user.token;
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
