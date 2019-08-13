import React from "react";
import styled from "styled-components";

import { withApollo } from 'react-apollo';
import PlanetFullComponent from "./PlanetFullComponent";
import PlanetBasicComponent from "./PlanetBasicComponent";

class PlanetOnListComponent extends React.Component {
  state = {
    isPlanetFullInfoOpen: false
  }

  render() {
    const aboutPlanet = this.props.aboutPlanet;

    return (
      <StyledPlanetOnList onClick={this.handleOnClick} isPlanetFullInfoOpen={this.state.isPlanetFullInfoOpen}>
        {this.state.isPlanetFullInfoOpen ?
          <PlanetFullComponent aboutPlanet={aboutPlanet} /> :
          <PlanetBasicComponent aboutPlanet={aboutPlanet} />}
      </StyledPlanetOnList>
    );
  }

  handleOnClick = () => {
    this.setState((prevState) => {
      return (
        { isPlanetFullInfoOpen: !prevState.isPlanetFullInfoOpen })
    });
  }

}

const StyledPlanetOnList = styled.div`

  justify-self: stretch;

  @media (min-width: 461px) {
    grid-column: span ${(props) => props.isPlanetFullInfoOpen ? 2 : 1};
  }
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

export default withApollo(PlanetOnListComponent);
