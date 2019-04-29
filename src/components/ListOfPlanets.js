import React from "react";
import styled from "styled-components";
import PlanetOnListComponent from "./PlanetOnList";
import ChangePageComponent from "./PageChangeButtons";
// import { client } from '../App';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const StyledListOfPlanets = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: flex-start;
  flex-wrap: wrap;
  align-items: stretch;
  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  margin: 50px 50px 10px 50px;
`;

// class ListOfPlanetsComponent extends React.Component {

//   handleOnClickBack = event => {
//     console.log("page: ", event.target);
//   };

//   handleOnClickNext = event => {
//     console.log("page: ", event.target);
//   };

//   render() {

//     return (
//       <React.Fragment>
//         <StyledListOfPlanets>
//           {listOfPlanetsFormServer.map(({ node }) => (
//             <PlanetOnListComponent key={node.id} name={node.name} />
//           ))}
//         </StyledListOfPlanets>
//         <ChangePageComponent
//           handleOnClickBack={this.handleOnClickBack}
//           handleOnClickNext={this.handleOnClickNext}
//         />
//       </React.Fragment>
//     );
//   }
// }

const ALL_PLANETS = gql`
  query Planets($cursor: String) {
    allPlanets(first: 3, after: $cursor) {
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
  }
`;

class ListOfPlanetsComponent extends React.Component {
  handleOnClickBack = event => {
    console.log("page: ", event.target);
  };

  handleOnClickNext = event => {
    console.log("page: ", event.target);
  };

  render() {
    return (
      <Query query={ALL_PLANETS}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <h1>LOADING...</h1>;
          if (error) return console.log("ERROR: ", error);
          const listOfPlanetsFormServer = data.allPlanets.edges;

          {
            /* const onLoad = () =>
            fetchMore({
              variables: {
                cursor: data.allPlanets.pageInfo.endCursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.allPlanets.edges;
                console.log("newEdges: ", newEdges);
                const pageInfo = fetchMoreResult.allPlanets.pageInfo;
                console.log("pageInfo: ", pageInfo);

                return newEdges.length
                  ? {
                      allPlanets: {
                        __typename: previousResult.allPlanets.__typename,
                        edges: [
                          ...previousResult.allPlanets.edges,
                          ...newEdges
                        ],
                        pageInfo
                      }
                    }
                  : previousResult;
              }
            }); */
          }

          return (
            <React.Fragment>
              <StyledListOfPlanets>
                {listOfPlanetsFormServer.map(({ node }) => (
                  <PlanetOnListComponent key={node.id} name={node.name} />
                ))}
              </StyledListOfPlanets>
              <ChangePageComponent
                handleOnClickBack={this.handleOnClickBack}
                handleOnClickNext={this.handleOnClickNext}
              />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default ListOfPlanetsComponent;
