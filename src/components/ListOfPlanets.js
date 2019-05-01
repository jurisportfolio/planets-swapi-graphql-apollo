import React from "react";
import styled from "styled-components";
import PlanetOnListComponent from "./PlanetOnList";
import ChangePageComponent from "./PageChangeButtons";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const numberPlanetsOnPage = 10;

const StyledListOfPlanets = styled.div`

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px,  1fr));
  ${'' /* grid-template-row: repeat(auto-fit, minmax(800px,  4fr)); */}
  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  margin: 50px 20px 10px 20px;
`;

class ListOfPlanetsComponent extends React.Component {

  handleFetchMore = (variables) => {
    this.props.data.fetchMore({
      variables: variables,
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
  }

  handleOnClickBack = () => {
    const variables = {
      firstFromList: null,
      lastFromList: numberPlanetsOnPage,
      cursorAfter: null,
      cursorBefore: this.props.data.allPlanets.pageInfo.startCursor
    };
    this.handleFetchMore(variables);
  }

  handleOnClickNext = () => {
    const variables = {
      firstFromList: numberPlanetsOnPage,
      lastFromList: null,
      cursorAfter: this.props.data.allPlanets.pageInfo.endCursor,
      cursorBefore: null
    };
    this.handleFetchMore(variables);
  }

  render() {
    let { loading, error } = this.props.data;
    const { allPlanets } = this.props.data;
    if (loading) return <h1>LOADING...</h1>;
    if (error) return console.log("ERROR: ", this.props.data.error);
    const listOfPlanetsFormServer = allPlanets.edges;
    // const isPreviousPage = allPlanets.pageInfo.hasPreviousPage;
    // const isNextPage = allPlanets.pageInfo.hasNextPage;
    return (
      <React.Fragment>
        <StyledListOfPlanets>
          {listOfPlanetsFormServer.map(({ node }) => (
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
      firstFromList: numberPlanetsOnPage,
      lastFromList: null,
      cursorAfter: null,
      cursorBefore: null
    }
  })
})(ListOfPlanetsComponent);
