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
  isEnabled: {isNextEnabled, isBackEnabled}
}) => {

  return (
    <StyledChangePageComponent>
      <StyledPageChangeButton onClick={handleOnClickBack}
      disabled={!isBackEnabled}>
        Previous Page
      </StyledPageChangeButton>

      <StyledPageChangeButton
        onClick={handleOnClickNext}
        disabled={!isNextEnabled}
      >
        Next Page
      </StyledPageChangeButton>
    </StyledChangePageComponent>
  );
};

export default ChangePageComponent;
