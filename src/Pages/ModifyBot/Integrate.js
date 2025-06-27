import React from "react";
import styled from "styled-components";
import LeadConnector from "../../Components/ModifyBot/LeadConnector";

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
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Integrate = () => {

  return (
    <Container>
      <CardContainer>
        <LeadConnector />
      </CardContainer>
    </Container>
  );
};

export default Integrate;
