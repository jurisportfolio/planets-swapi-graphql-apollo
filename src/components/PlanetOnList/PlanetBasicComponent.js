import React from "react";
import styled from "styled-components";

import { somePlanetInfo } from "../../utilities/utilities";

const PlanetBasicComponent = ({ aboutPlanet }) => {
  const { name, diameter, population, surfaceWater } = aboutPlanet;
  return (
    <StyledPlanetOnList>
      <div>
        <h5>Planet</h5>
        <h3>{somePlanetInfo(name)}</h3>
      </div>
      <h5>Diameter: {somePlanetInfo(diameter, "km")}</h5>
      <h5>Population: {somePlanetInfo(population, "persons")}</h5>
      <h5>Water surface: {somePlanetInfo(surfaceWater, "%")}</h5>
    </StyledPlanetOnList>)
}

const StyledPlanetOnList = styled.div`

  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;

  h5 {
    margin: 5px;
    font-weight: normal;
  };
  h3 {
    margin-top: 5px;
    text-align: center;
  }
`;

export default PlanetBasicComponent;
