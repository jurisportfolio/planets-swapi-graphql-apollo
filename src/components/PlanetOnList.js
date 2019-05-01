import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const StyledPlanetOnList = styled.div`

  justify-self: stretch;

  display: flex;
  flex-direction: column;

  
  ${'' /* grid-column: span 1; */}
  grid-column: span ${(props) => props.boolVar ? 2 : 1};
  grid-row: span ${(props) => props.boolVar ? 2 : 1};

  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  margin: 20px;
  cursor: default;

  h6 {
    margin: 5px;
  };
  h4 {
    margin-top: 5px;
    text-align: center;
  }
`;

class PlanetOnListComponent extends React.Component {
  state = {
    boolVar: false
  }

  handleOnClick = () => {
    console.log("CLICK!!!");
    this.setState({boolVar: !this.state.boolVar});
  }

  render() {
    const { name, diameter, population, surfaceWater } = this.props.aboutPlanet;
    return (
      <StyledPlanetOnList onClick={this.handleOnClick} boolVar={this.state.boolVar}>
        {name ? <div><h6>Name</h6><h4> {name}</h4></div> : null}
        {<h6>Diameter: {diameter ? `${diameter} km` : "No information"}</h6>}
        {<h6>Diameter: {population ? `${population} persons` : "No information"}</h6>}
        {<h6>Water surface: {surfaceWater ? `${surfaceWater}%` : "No information"}</h6>}
      </StyledPlanetOnList>
    );
  }
}

const PLANET_ALL_INFO = gql`
query Planet(
  $planetID: String
) {
  planet(id: $planetID) {
    id
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
        title
      }
    }
    residentConnection {
      residents {
        name
      }
    }
  }
}
`;
export default PlanetOnListComponent;
