import React from "react";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";

import PageViewComponent from "./PageViewComponent";

class PageQueryComponent extends React.Component {

  state = {
    numberPlanetsOnPage: 10,
    pageQueryVars: {
      firstFromList: 10,
      lastFromList: null,
      cursorAfter: null,
      cursorBefore: null
    }
  }

  render() {
    const { pageQueryVars, numberPlanetsOnPage } = this.state;
    return (
      <Query query={PAGE_OF_PLANETS} variables={pageQueryVars}>

        {({ loading, error, data, fetchMore }) => {

          if (loading) return <h5>LOADING...</h5>;
          if (error) return <h5>NO INFORMATION</h5>;

          const handleFetchMore = (variables) => {
            fetchMore({
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


          const handleOnClickBack = () => {
            const variables = {
              firstFromList: null,
              lastFromList: numberPlanetsOnPage,
              cursorAfter: null,
              cursorBefore: data.allPlanets.pageInfo.startCursor
            };
            handleFetchMore(variables);

          };

          const handleOnClickNext = () => {
            const variables = {
              firstFromList: numberPlanetsOnPage,
              lastFromList: null,
              cursorAfter: data.allPlanets.pageInfo.endCursor,
              cursorBefore: null
            };
            handleFetchMore(variables);
          }
          return <PageViewComponent
            pageData={data.allPlanets.edges}
            handleOnClickBack={handleOnClickBack}
            handleOnClickNext={handleOnClickNext} />
        }
        }
      </Query>
    )
  }
}

const PAGE_OF_PLANETS = gql`
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

export default withApollo(PageQueryComponent);
