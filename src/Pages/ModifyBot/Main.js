import React from "react";
import styled from "styled-components";
import MainSection from "../../Components/ModifyBot/MainSection";

// Styled Components
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
