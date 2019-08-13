import React from "react";



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

const PlanetBasicComponent = (props) => {
  return (
    <TopPartOfPlanetOnListComponent aboutPlanet={props.aboutPlanet} />
  )
}

const somePlanetInfo = (info = " No information", unit = "") => {
  return ` ${info} ${unit}`.trim()
}

export default PlanetBasicComponent;
