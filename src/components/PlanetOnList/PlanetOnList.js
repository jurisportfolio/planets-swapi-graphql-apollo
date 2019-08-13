import React from "react";
import styled from "styled-components";
import PlanetFullComponent from "./PlanetFullComponent";
import PlanetBasicComponent from "./PlanetBasicComponent";

class PlanetOnListComponent extends React.Component {
  state = {
    isPlanetFullInfoOpen: false
  }

  render() {
    const aboutPlanet = this.props.aboutPlanet;

    return (
      <StyledPlanetContainer onClick={this.handleOnClick} isPlanetFullInfoOpen={this.state.isPlanetFullInfoOpen}>
        {this.state.isPlanetFullInfoOpen ?
          <PlanetFullComponent aboutPlanet={aboutPlanet} /> :
          <PlanetBasicComponent aboutPlanet={aboutPlanet} />}
      </StyledPlanetContainer>
    );
  }

  handleOnClick = () => {
    this.setState((prevState) => {
      return (
        { isPlanetFullInfoOpen: !prevState.isPlanetFullInfoOpen })
    });
  }

}

const StyledPlanetContainer = styled.div`

  justify-self: stretch;

  @media (min-width: 461px) {
    grid-column: span ${(props) => props.isPlanetFullInfoOpen ? 2 : 1};
  }
  display: flex;
  flex-direction: column;

  cursor: default;
`

export default PlanetOnListComponent;
