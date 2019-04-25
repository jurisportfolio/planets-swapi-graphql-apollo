import React from 'react';
import styled from 'styled-components';
import ListOfPlanetsComponent from './components/ListOfPlanets';
import uuidv4 from "uuid/v4";

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;



function generatePlanets(listOfPlanets, amount, ) {
  if (amount > 0) {

      listOfPlanets.push({id: uuidv4(), name: `Planet number ${amount}`});
      return generatePlanets(listOfPlanets, amount - 1);

  } else { return listOfPlanets }
}
const automaticListOfPlanets = generatePlanets([], 25);




function App() {
  return (
    <StyledApp>
      <ListOfPlanetsComponent listOfPlanets={automaticListOfPlanets} planetsPerPage={10}/>
    </StyledApp>
  );
}

export default App;
