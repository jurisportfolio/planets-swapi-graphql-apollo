import React from "react";
import styled from "styled-components";
import ListOfPlanetsComponent from "./components/ListOfPlanets";
// import uuidv4 from "uuid/v4";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
// import gql from "graphql-tag";
// import { Query } from "react-apollo";

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

// const ALL_PLANETS = gql`
//   query Planets($cursor: String) {
//     allPlanets(first: 1, after: $cursor) {
//       totalCount
//       edges {
//         node {
//           id
//           name
//         }
//         cursor
//       }
//       pageInfo {
//         startCursor
//         endCursor
//         hasNextPage
//       }
//     }
//   }
// `;

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <StyledApp>
          <ListOfPlanetsComponent />
        </StyledApp>
      </ApolloProvider>
    );
  }
}

export default App;
