import React from 'react';
import styled from 'styled-components';
import ListOfPlanetsComponent from './components/ListOfPlanets';
// import uuidv4 from "uuid/v4";
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const httpLink = createHttpLink({
  uri: 'https://swapi.apis.guru/'
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const ALL_PLANETS = gql `
{
  allPlanets(first: 10, after: "") {
    totalCount
    edges {
      node {
        id
        name
      }
      cursor
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
  }
}`;

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

class App extends React.Component {
  state

  render(){
    return (
      <ApolloProvider client={client}>
        <Query query={ALL_PLANETS}>
          {({ loading, error, data }) => {
            if (loading) return <h1>LOADING...</h1>;
            if (error) return( console.log('ERROR: ', error) );
            
            const listOfPlanetsFormServer = data.allPlanets.edges;

            const totalCountOfPlanet = data.allPlanets.totalCount;

            const firstPlanetOnPage = data.allPlanets.pageInfo.startCursor;

            const lastPlanetOnPage = data.allPlanets.pageInfo.endCursor;



            return(
              <StyledApp>
                <ListOfPlanetsComponent listOfPlanets={listOfPlanetsFormServer} 
                                        planetsPerPage={10}
                                        totalCountOfPlanet={totalCountOfPlanet} />
              </StyledApp>
          )}}
        </Query>  
      </ApolloProvider>
    );
  }  
}

export default App;
