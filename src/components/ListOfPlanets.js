import React from "react";
import styled from "styled-components";
import PlanetOnListComponent from "./PlanetOnList";
import ChangePageComponent from "./PageChangeButtons";
import gql from "graphql-tag";
import { graphql, Query, withApollo } from "react-apollo";

const numberPlanetsOnPage = 10;

const StyledListOfPlanets = styled.div`

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px,  1fr));
  ${'' /* grid-template-row: repeat(auto-fit, minmax(800px,  4fr)); */}
  ${'' /* border: solid 1px black; */}
  ${'' /* border-radius: 5px; */}
  ${'' /* padding: 10px; */}
  margin: 10px 5px 10px 5px;
`;

const PageViewComponent = ({ listOfPlanets }) => {
  console.log('listOfPlanets: ', listOfPlanets);
  const listOfPlanetsFromServer = listOfPlanets.allPlanets.edges;

  // console.log('listOfPlanetsFormServer: ', listOfPlanetsFormServer);
  return (
    // <React.Fragment>
    <StyledListOfPlanets>
      {listOfPlanetsFromServer.map(({ node }) => (
        <PlanetOnListComponent
          key={node.id}
          aboutPlanet={node}

        />
      ))}
    </StyledListOfPlanets>


    // </React.Fragment>

  )

}

const PageQueryComponent = ({ queryVars }) =>


  <Query query={PAGE_OF_PLANETS} variables={queryVars}>
    {({ loading, error, data }) => {

      if (loading) return <h5>LOADING...</h5>;
      if (error) return <h5>NO INFORMATION</h5>;
      return <PageViewComponent listOfPlanets={data} />

    }
    }
  </Query>
// return null;


class ListOfPlanetsComponent extends React.Component {
  state = {
    queryVars: {
      firstFromList: 10,
      lastFromList: null,
      cursorAfter: null,
      cursorBefore: null
    }
  }

  handleFetchMore = (queryVars) => {
    console.log('queryVars: ', queryVars);
    // this.setState(queryVars);
  }

  handleOnClickBack = () => {
    const variables = {
      firstFromList: null,
      lastFromList: numberPlanetsOnPage,
      cursorAfter: null,
      cursorBefore: this.props.data.allPlanets.pageInfo.startCursor
    };
    console.log('variables back: ', variables);
    this.handleFetchMore(variables);

  }

  handleOnClickNext = () => {
    const variables = {
      firstFromList: numberPlanetsOnPage,
      lastFromList: null,
      cursorAfter: this.props.data.allPlanets.pageInfo.endCursor,
      cursorBefore: null
    };
    console.log('variables next: ', variables);
    this.handleFetchMore(variables);
  }

  // getNew

  // ListView (query => cursors)
  // DeleteButton 

  render() {
    return (
      <React.Fragment>
        <PageQueryComponent queryVars={this.state.queryVars} />
        <ChangePageComponent
          handleOnClickBack={this.handleOnClickBack}
          handleOnClickNext={this.handleOnClickNext}
          isEnabled={{ isBackEnabled: true, isNextEnabled: true }}
        />
      </React.Fragment>

    )
  }


}



class _oldListOfPlanetsComponent extends React.Component {

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
    // console.log('allPlanets: ', allPlanets);
    // console.log('this.props.data: ', this.props.data);
    if (loading) return <h1 className="loading">LOADING PLANETS...</h1>;
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

export default withApollo(ListOfPlanetsComponent)

// export default graphql(ALL_PLANETS, {
//   options: () => ({
//     variables: {
//       firstFromList: numberPlanetsOnPage,
//       lastFromList: null,
//       cursorAfter: null,
//       cursorBefore: null
//     }
//   })
// })(ListOfPlanetsComponent);

