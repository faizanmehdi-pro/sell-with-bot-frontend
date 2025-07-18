import React from "react";
import styled from "styled-components";
import MainSection from "../../Components/ModifyBot/MainSection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 30px;
  
  @media (max-width: 990px) {
    padding: 0;
  }
`;

const Main = () => {

  return (
    <Container>
      <CardContainer>
        <MainSection />
      </CardContainer>
    </Container>
  );
};

export default Main;
