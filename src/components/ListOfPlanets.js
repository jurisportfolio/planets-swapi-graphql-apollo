import React from "react";
import styled from "styled-components";
import PlanetOnListComponent from "./PlanetOnList";
import ChangePageComponent from "./PageChangeButtons";
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






  handleOnClickBack = () => {
    this.props.data.fetchMore({
      variables: {
        firstFromList: null,
        lastFromList: 10,
        cursorAfter: null,
        cursorBefore: this.props.data.allPlanets.pageInfo.startCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.allPlanets.edges;
        const pageInfo = fetchMoreResult.allPlanets.pageInfo;
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

  handleOnClickNext = () => {
    this.props.data.fetchMore({
      variables: {
        firstFromList: 10,
        lastFromList: null,

        cursorAfter: this.props.data.allPlanets.pageInfo.endCursor,
        cursorBefore: null
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.allPlanets.edges;
        const pageInfo = fetchMoreResult.allPlanets.pageInfo;
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
    console.log('allPlanets.edges: ', allPlanets.edges[0]);
    const isPreviousPage = allPlanets.pageInfo.hasPreviousPage;
    console.log('isPreviousPage: ', isPreviousPage);
    const isNextPage = allPlanets.pageInfo.hasNextPage;
    console.log("isNextPage: ", isNextPage);
    return (
      <React.Fragment>
        <StyledListOfPlanets>
          {listOfPlanetsFormServer.map(({ node }) => (
            console.log('node: ', node),
            <PlanetOnListComponent
              key={node.id}
              aboutPlanet={node}
              
            />
          ))}
        </StyledListOfPlanets>

        <ChangePageComponent
          handleOnClickBack={this.handleOnClickBack}
          handleOnClickNext={this.handleOnClickNext}
          isEnabled={{ isBackEnabled: true, isNextEnabled: true }}
        />
      </React.Fragment>
    );
  }
}

const ALL_PLANETS = gql`
  query Planets(
    $firstFromList: Int,
    $lastFromList: Int,
    $cursorAfter: String,
    $cursorBefore: String,
  ) {
    allPlanets(
      first: $firstFromList,
      last: $lastFromList,
      after: $cursorAfter,
      before: $cursorBefore,
    ) {
      edges {
        node {
          id
          name
          diameter
          population
          surfaceWater
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

export default graphql(ALL_PLANETS, {
  options: () => ({
    variables: {
      firstFromList: 10,
      lastFromList: null,
      cursorAfter: null,
      cursorBefore: null
    }
  })
})(ListOfPlanetsComponent);
