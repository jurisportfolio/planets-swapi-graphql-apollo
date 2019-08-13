import React from "react";
import styled from "styled-components";

import { somePlanetInfo } from "../../utilities/utilities";

const PlanetDetailsViewComponent = ({ planetFullInfo }) => {
  const { name, diameter, population, surfaceWater, gravity, rotationPeriod, orbitalPeriod, climates, terrains, filmConnection, residentConnection } = planetFullInfo;
  return (
    <StyledPlanetOnList>
      <div>
        <h5>Planet</h5>
        <h3>{somePlanetInfo(name)}</h3>
      </div>
      <h5>Diameter: {somePlanetInfo(diameter, "km")}</h5>
      <h5>Population: {somePlanetInfo(population, "persons")}</h5>
      <h5>Water surface: {somePlanetInfo(surfaceWater, "%")}</h5>
      <h5>Gravity: {somePlanetInfo(gravity)}</h5>
      <h5>Rotation Period: {somePlanetInfo(rotationPeriod)}</h5>
      <h5>Orbital Period: {somePlanetInfo(orbitalPeriod)}</h5>
      <h5>Climates: {somePlanetInfo(climates.map((climate) => ` ${climate}`))}</h5>
      <h5>Terrains: {somePlanetInfo(terrains.map((terrain) => ` ${terrain}`))}</h5>
      {filmConnection.films.length > 0 ?
        <div>
          <hr /><h5>Films where you could see this planet:</h5>
          <ul>{filmConnection.films.map((film) => <li key={film.id}><h5>{film.title}</h5></li>)}</ul>
        </div> : null}
      {residentConnection.residents.length > 0 ?
        <div>
          <hr /><h5>Persons which connect to this planet:</h5>
          <ul>{residentConnection.residents.map((resident) => <li key={resident.id}><h5>{resident.name}</h5></li>)}</ul>
        </div> : null}
    </StyledPlanetOnList>
  )
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

export default PlanetDetailsViewComponent;
