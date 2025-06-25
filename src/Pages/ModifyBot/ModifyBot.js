import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LeadConnector from "../../Components/ModifyBot/LeadConnector";
import MainSection from "../../Components/ModifyBot/MainSection";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  border-bottom: 2px solid #3182CE;
  padding: 10px;
  border-radius: 8px;
`;

const TabsDivider = styled.div`
  width: 2px;
  background: #3182CE;
`;

const Tab = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.active ? "#3182CE" : "#333")};
  cursor: pointer;

  &:hover {
    color: #3182CE;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const ModifyBot = () => {
  const getInitialTab = () => {
    return sessionStorage.getItem("activeTab") || "Integrate";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <Container>
      <Tabs>
        <Tab active={activeTab === "Integrate"} onClick={() => setActiveTab("Integrate")}>
          Integrate
        </Tab>
        <TabsDivider />
        <Tab active={activeTab === "Main"} onClick={() => setActiveTab("Main")}>
          Main
        </Tab>
      </Tabs>

      <CardContainer>
        {activeTab === "Integrate" && <LeadConnector />}
        {activeTab === "Main" && <MainSection />}
      </CardContainer>
    </Container>
  );
};

export default ModifyBot;
