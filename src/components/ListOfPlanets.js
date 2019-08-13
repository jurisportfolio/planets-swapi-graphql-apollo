import React from "react";
import styled from "styled-components";
import PlanetOnListComponent from "./PlanetOnList";
import ChangePageComponent from "./PageChangeButtons";
import gql from "graphql-tag";
import { Query, withApollo } from "react-apollo";

const numberPlanetsOnPage = 10;

const PageViewComponent = ({ pageData, handleOnClickBack, handleOnClickNext }) => {

  return (
    <React.Fragment>
      <StyledListOfPlanets>
        {pageData.map(({ node }) => (
          <PlanetOnListComponent key={node.id} aboutPlanet={node} />
        ))}
      </StyledListOfPlanets>
      <ChangePageComponent
        handleOnClickBack={handleOnClickBack}
        handleOnClickNext={handleOnClickNext}
        isEnabled={{ isBackEnabled: true, isNextEnabled: true }}
      />
    </React.Fragment>)
}

class PageQueryComponent extends React.Component {
  render() {
    const { queryVars, handlePageChange } = this.props;
    return (
      <Query query={PAGE_OF_PLANETS} variables={queryVars}>

        {({ loading, error, data }) => {

          if (loading) return <h5>LOADING...</h5>;
          if (error) return <h5>NO INFORMATION</h5>;
          console.log('data: ', data);

          const handleOnClickBack = () => {
            const variables = {
              firstFromList: null,
              lastFromList: numberPlanetsOnPage,
              cursorAfter: null,
              cursorBefore: data.allPlanets.pageInfo.startCursor
            };
            console.log('variables back: ', variables);
            handlePageChange(variables);

          };

          const handleOnClickNext = () => {
            const variables = {
              firstFromList: numberPlanetsOnPage,
              lastFromList: null,
              cursorAfter: data.allPlanets.pageInfo.endCursor,
              cursorBefore: null
            };
            console.log('variables next: ', variables);
            handlePageChange(variables);
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

class ListOfPlanetsComponent extends React.Component {
  state = {
    pageQueryVars: {
      firstFromList: numberPlanetsOnPage,
      lastFromList: null,
      cursorAfter: null,
      cursorBefore: null
    }
  }

  changePageQueryVarsState = (newVars) => {
    this.setState({ pageQueryVars: newVars });
  }

  render() {
    return (
      <React.Fragment>
        <PageQueryComponent queryVars={this.state.pageQueryVars} handlePageChange={this.changePageQueryVarsState} />
      </React.Fragment>

    )
  }
}

const StyledListOfPlanets = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px,  1fr));
    margin: 10px 5px 10px 5px;
    `;























class _old2_ListOfPlanetsComponent extends React.Component {
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

