import React from "react";
import gql from "graphql-tag";
import { Query } from 'react-apollo';

const PlanetDetailsViewComponent = ({ planetDetails }) => {
  const { gravity, rotationPeriod, orbitalPeriod, climates, terrains, filmConnection, residentConnection } = planetDetails;
  return (
    <div>
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
    </div>
  )
}

const BottomPartOfPlanetOnListComponent = ({ id }) =>

  <Query query={PLANET_ALL_INFO} variables={{ planetID: id }}>
    {({ loading, error, data }) => {
      if (loading) return <h5>LOADING...</h5>;
      if (error) return <h5>NO INFORMATION</h5>;
      return <PlanetDetailsViewComponent planetDetails={data.planet} />
    }
    }
  </Query>

const TopPartOfPlanetOnListComponent = ({ aboutPlanet }) => {
  const { name, diameter, population, surfaceWater } = aboutPlanet;
  return (
    <React.Fragment>
      <div>
        <h5>Planet</h5>
        <h3>{somePlanetInfo(name)}</h3>
      </div>
      <h5>Diameter: {somePlanetInfo(diameter, "km")}</h5>
      <h5>Population: {somePlanetInfo(population, "persons")}</h5>
      <h5>Water surface: {somePlanetInfo(surfaceWater, "%")}</h5>
    </React.Fragment>)
}

const PlanetFullComponent = (props) => {
  return (
    <React.Fragment>
      <TopPartOfPlanetOnListComponent aboutPlanet={props.aboutPlanet} />
      <BottomPartOfPlanetOnListComponent id={props.aboutPlanet.id} />
    </React.Fragment>)
}

const somePlanetInfo = (info = " No information", unit = "") => {
  return ` ${info} ${unit}`.trim()
}

const PLANET_ALL_INFO = gql`
query Planet(
  $planetID: ID
) {
  planet(id: $planetID) {
    id
    name
    diameter
    rotationPeriod
    orbitalPeriod
    gravity
    population
    climates
    terrains
    surfaceWater
    filmConnection {
      films {
        id
        title
      }
    }
    residentConnection {
      residents {
        id
        name
      }
    }
  }
}
`;

export default PlanetFullComponent;
