import React from "react";
import styled from "styled-components";

const StyledChangePageComponent = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const StyledPageChangeButton = styled.button``;

const ChangePageComponent = ({ handleOnClickNext, handleOnClickBack }) => {
  return (
    <StyledChangePageComponent>
      <StyledPageChangeButton onClick={handleOnClickBack}>
        Previous Page
      </StyledPageChangeButton>
      <StyledPageChangeButton onClick={handleOnClickNext}>
        Next Page
      </StyledPageChangeButton>
    </StyledChangePageComponent>
  );
};

export default ChangePageComponent;
