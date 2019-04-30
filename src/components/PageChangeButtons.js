import React from "react";
import styled from "styled-components";

const StyledChangePageComponent = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const StyledPageChangeButton = styled.button`
  &:active {
    background-color: green;
  }
`;

const ChangePageComponent = ({
  handleOnClickNext,
  handleOnClickBack,
  isEnabled
}) => {
  console.log("isNextEnabled: ", isEnabled.isNextEnabled);
  return (
    <StyledChangePageComponent>
      <StyledPageChangeButton onClick={handleOnClickBack}>
        Previous Page
      </StyledPageChangeButton>

      <StyledPageChangeButton
        onClick={handleOnClickNext}
        disabled={!isEnabled.isNextEnabled}
      >
        Next Page
      </StyledPageChangeButton>
    </StyledChangePageComponent>
  );
};

export default ChangePageComponent;
