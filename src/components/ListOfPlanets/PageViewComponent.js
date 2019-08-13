import React from "react";
import styled from "styled-components";
import PlanetOnListComponent from "../PlanetOnList/PlanetOnList";
import ChangePageComponent from "./PageChangeButtons";

const PageViewComponent = ({ pageData, handleOnClickBack, handleOnClickNext }) => {

  return (
    <React.Fragment>
      <StyledListOfPlanets>
        {pageData.map(({ node }) => (
          <PlanetOnListComponent key={node.id} planetBasicInfo={node} />
        ))}
      </StyledListOfPlanets>
      <ChangePageComponent
        handleOnClickBack={handleOnClickBack}
        handleOnClickNext={handleOnClickNext}
        isEnabled={{ isBackEnabled: true, isNextEnabled: true }}
      />
    </React.Fragment>)
}

const StyledListOfPlanets = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px,  1fr));
    margin: 10px 5px 10px 5px;
    `;

export default PageViewComponent;
