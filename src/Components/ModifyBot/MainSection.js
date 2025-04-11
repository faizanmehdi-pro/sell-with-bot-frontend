import React from 'react'
import styled from "styled-components";
import MainCard from './MainCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
`;

const MainSection = () => {
  return (
    <Container>
      {/* <BotVoice /> */}
      <MainCard />
    </Container>
  )
}

export default MainSection
