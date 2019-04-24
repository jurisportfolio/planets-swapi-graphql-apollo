import React from 'react';
import styled from 'styled-components';
import PlanetOnListComponent from './PlanetOnList';

import uuidv4 from "uuid/v4";

// function generatePlanets(listOfPlanets, amount, ) {
//   if (amount > 0) {

//       listOfPlanets.push({id: uuidv4(), name: `Planet number ${amount}`});
//       return generatePlanets(listOfPlanets, amount - 1);

//   } else { return listOfPlanets }
// }
// const automaticListOfPlanets = generatePlanets([], 5);
// console.log('automaticListOfPlanets: ', automaticListOfPlanets);

const StyledListOfPlanets = styled.div `
  display: flex;
  justify-content: space-around;
  align-content: flex-start;
  flex-wrap: wrap;
  align-items: stretch;
  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  margin: 50px;

`;

class ListOfPlanetsComponent extends React.Component {
  
  render(){
    return(
      <StyledListOfPlanets>
        {this.props.listOfPlanets.map((planet) => 
          <PlanetOnListComponent key={planet.id} name={planet.name} />)
        }
      </StyledListOfPlanets>
    );
  }
};

export default ListOfPlanetsComponent;