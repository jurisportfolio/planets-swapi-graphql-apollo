import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { withApollo, Query } from 'react-apollo';

const StyledPlanetOnList = styled.div`

  justify-self: stretch;

  @media (min-width: 461px) {
    grid-column: span ${(props) => props.isPlanetFullInfoOpen ? 2 : 1};
  }
  grid-row: span ${(props) => props.isPlanetFullInfoOpen ? 2 : 1};

  display: flex;
  flex-direction: column;

  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  margin: 5px;
  cursor: default;

  h5 {
    margin: 5px;
    font-weight: normal;
  };
  h3 {
    margin-top: 5px;
    text-align: center;
  }
`;

class PlanetOnListComponent extends React.Component {
  state = {
    isPlanetFullInfoOpen: false
  }

  displayLineOfPlanetInfo = () => {
    return (
      <h5></h5>
    )
  }

  handleOnClick = () => {
    this.setState({ isPlanetFullInfoOpen: !this.state.isPlanetFullInfoOpen });
  }

  render() {
    const { id, name, diameter, population, surfaceWater } = this.props.aboutPlanet;
    return (
      <StyledPlanetOnList onClick={this.handleOnClick} isPlanetFullInfoOpen={this.state.isPlanetFullInfoOpen}>
        {name ? <div><h5>Planet</h5><h3> {name}</h3></div> : null}
        {<h5>Diameter: {diameter ? `${diameter} km` : "No information"}</h5>}
        {<h5>Population: {population ? `${population} persons` : "No information"}</h5>}
        {<h5>Water surface: {surfaceWater ? `${surfaceWater}%` : "No information"}</h5>}
        {this.state.isPlanetFullInfoOpen ?
          <Query query={PLANET_ALL_INFO} variables={{ planetID: id }}>
            {
              ({ loading, error, data }) => {
                if (loading) return <h5>LOADING...</h5>;
                if (error) return <h5>NO INFORMATION</h5>;
                const { gravity, rotationPeriod, orbitalPeriod, climates, terrains, filmConnection, residentConnection } = data.planet;
                return (
                  <div>
                    {<h5>Gravity: {gravity ? `${gravity}` : "No information"}</h5>}
                    {<h5>Rotation Period: {rotationPeriod ? `${rotationPeriod}` : "No information"}</h5>}
                    {<h5>Orbital Period: {orbitalPeriod ? `${orbitalPeriod}` : "No information"}</h5>}
                    {<h5>Climates: {climates ? `${climates.map((climate) => ` ${climate}`)}` : "No information"}</h5>}
                    {<h5>Terrains: {terrains ? `${terrains.map((terrain) => ` ${terrain}`)}` : "No information"}</h5>}
                    {filmConnection.films.length > 0 ?
                      <div>
                        <hr /><h5>Films where you could see this planet:</h5>
                        <ul>{filmConnection.films.map((film) => <li key={film.id}><h5>{film.title}</h5></li>)}</ul>
                      </div> : null}
                    {residentConnection.residents.length > 0 ? <div>
                      <hr /><h5>Persons which connect to this planet:</h5>
                      <ul>{residentConnection.residents.map((resident) => <li key={resident.id}><h5>{resident.name}</h5></li>)}</ul>
                    </div> : null}
                  </div>
                )
              }
            }
          </Query>

          : null}
      </StyledPlanetOnList>
    );
  }
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
export default withApollo(PlanetOnListComponent);
