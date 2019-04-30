import React from "react";
import styled from "styled-components";
import PlanetOnListComponent from "./PlanetOnList";
import ChangePageComponent from "./PageChangeButtons";
// import { client } from '../App';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

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

class ListOfPlanetsComponent extends React.Component {
  handleOnClickBack = event => {
    console.log("page: ", event.target);
    // this.props.data.fetchMore({
    //   variables: {
    //     afterCursor: "",
    //     beforeCursor: this.props.data.allPlanets.pageInfo.startCursor
    //   },
    //   updateQuery: (previousResult, { fetchMoreResult }) => {
    //     const newEdges = fetchMoreResult.allPlanets.edges;
    //     console.log("newEdges: ", newEdges);
    //     const pageInfo = fetchMoreResult.allPlanets.pageInfo;
    //     console.log("pageInfo: ", pageInfo);
    //     console.log("newEdges.length: ", newEdges.length);
    //     return newEdges.length
    //       ? {
    //           allPlanets: {
    //             __typename: previousResult.allPlanets.__typename,
    //             edges: [...newEdges],
    //             pageInfo
    //           }
    //         }
    //       : previousResult;
    //   }
    // });
  };

  handleOnClickNext = event => {
    this.props.data.fetchMore({
      variables: {
        cursor: this.props.data.allPlanets.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.allPlanets.edges;
        const pageInfo = fetchMoreResult.allPlanets.pageInfo;
        if (fetchMoreResult.loading)
          return console.log(
            "fetchMoreResult.loading: ",
            fetchMoreResult.loading
          );

        return newEdges.length
          ? {
              allPlanets: {
                __typename: previousResult.allPlanets.__typename,
                edges: [...newEdges],
                pageInfo
              }
            }
          : previousResult;
      }
    });
  };

  render() {
    let { loading, error } = this.props.data;
    const { allPlanets } = this.props.data;
    if (loading) return <h1>LOADING...</h1>;
    if (error) return console.log("ERROR: ", this.props.data.error);
    const listOfPlanetsFormServer = allPlanets.edges;
    const isNextPage = allPlanets.pageInfo.hasNextPage;
    console.log("isNextPage: ", isNextPage);
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
          isEnabled={{ isBackEnabled: null, isNextEnabled: isNextPage }}
        />
      </React.Fragment>
    );
  }
}

const ALL_PLANETS = gql`
  query Planets($cursor: String) {
    allPlanets(first: 9, after: $cursor) {
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
        hasPreviousPage
      }
    }
  }
`;

export default graphql(ALL_PLANETS)(ListOfPlanetsComponent);
