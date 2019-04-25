import React from 'react';
import styled from 'styled-components';
import PlanetOnListComponent from './PlanetOnList';

const StyledListOfPlanets = styled.div `
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

const StyledPaginationPageNumbersComponent = styled.div `
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const PageNumberComponent = styled.button `
`;

const PaginationPageNumbersComponent = ({ changePage, pageNumbers }) => {
  return(

  <StyledPaginationPageNumbersComponent>
    {pageNumbers.map((number) => 
      <PageNumberComponent onClick={changePage} value={number} key={number} pageNumber={number}>
        {number}
      </PageNumberComponent>)}
  </StyledPaginationPageNumbersComponent>

  )
};

class ListOfPlanetsComponent extends React.Component {
  state = {
    currentPage: 1
  }

  handelChangePage = (event) => {   
    console.log('page: ', event.target.value);
    
    this.setState({ currentPage: event.target.value});
  }

  render(){
    const fullListOfPlanets = this.props.listOfPlanets;
    const planetsPerPage = this.props.planetsPerPage;

    const rangeOfPages = Math.ceil(fullListOfPlanets.length / planetsPerPage);
    const lastPlanetOnPage = this.state.currentPage * planetsPerPage;
    console.log('lastPlanetOnPage: ', lastPlanetOnPage);
    const firstPlanetOnPage = lastPlanetOnPage - planetsPerPage;
    console.log('firstPlanetOnPage: ', firstPlanetOnPage);

    const listOfPlanetsOnCurrentPage = fullListOfPlanets.slice(firstPlanetOnPage, lastPlanetOnPage);
    
    return(
      <>
        <StyledListOfPlanets>
          {listOfPlanetsOnCurrentPage.map((planet) => 
            <PlanetOnListComponent key={planet.id} name={planet.name} />)
          }
          
        </StyledListOfPlanets>
        <PaginationPageNumbersComponent changePage={this.handelChangePage} pageNumbers={[1, 2, 3]}/>
        
      </>
    );
  }
};

export default ListOfPlanetsComponent;