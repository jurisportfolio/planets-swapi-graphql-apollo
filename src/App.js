import React from "react";
import styled from "styled-components";
import PageQueryComponent from "./components/ListOfPlanets/PageQueryComponent";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const httpLink = createHttpLink({
  uri: "https://swapi.apis.guru/"
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <StyledApp>
          <PageQueryComponent />
        </StyledApp>
      </ApolloProvider>
    );
  }
}

export default App;
