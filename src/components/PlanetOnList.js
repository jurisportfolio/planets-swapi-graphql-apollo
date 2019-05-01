import React from "react";
import styled from "styled-components";

const StyledPlanetOnList = styled.div`

  justify-self: stretch;

  display: flex;
  flex-direction: column;

  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  margin: 20px;

  h6 {
    margin: 5px;
  };
  h4 {
    margin-top: 5px;
    text-align: center;
  }
`;

const PlanetOnListComponent =  ({ aboutPlanet: { name, diameter, population, surfaceWater }}) => {
  return (
    <StyledPlanetOnList>
      {name ? <div><h6>Name</h6><h4> {name}</h4></div> : null}
      {<h6>Diameter: {diameter ? `${diameter} km` : "No information"}</h6>}
      {<h6>Diameter: {population ? `${population} persons` : "No information"}</h6>}
      {<h6>Water surface: {surfaceWater ? `${surfaceWater}%` : "No information"}</h6>}
    </StyledPlanetOnList>
  );
};

export default PlanetOnListComponent;
