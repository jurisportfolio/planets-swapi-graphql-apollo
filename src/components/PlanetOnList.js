import React from "react";
import styled from "styled-components";

const StyledPlanetOnList = styled.div`
  width: 12%;
  flex-shrink: 1;
  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  margin: 20px;
`;

const PlanetOnListComponent =  ({ aboutPlanet: { name, diameter, population, surfaceWater }}) => {
  return (
    <StyledPlanetOnList>
      {name ? (<div><h6>Name</h6><h4> {name}</h4></div>) : null}
      {diameter ? <h6>Diameter {diameter}</h6> : null}
      {population ? <h6>Population {population}</h6> : null}
      {surfaceWater ? <h6>Water surface {surfaceWater}%</h6> : null}
    </StyledPlanetOnList>
  );
};

export default PlanetOnListComponent;
