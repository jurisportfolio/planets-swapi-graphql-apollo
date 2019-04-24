import React from 'react';
import styled from 'styled-components';

const StyledPlanetOnList = styled.div `
  width: 10%;
  ${'' /* max- */}
  flex-shrink: 1;
  border: solid 1px black;
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
`;

const PlanetOnListComponent = ({name}) => {
  return(
    <StyledPlanetOnList>
      <h2>{name}</h2>
    </StyledPlanetOnList>
  );
};

export default PlanetOnListComponent;