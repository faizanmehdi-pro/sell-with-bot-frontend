import React from "react";
import styled from "styled-components";

const StatCardContainer = styled.div`
  background: #ffffff;
  padding: 20px 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-shadow: 0px 10px 60px 0px #e2ecf980;
  
  @media (max-width: 1700px) {
    padding: 20px 25px;
  }
`;

const CardTitle = styled.h1`
  color: #000000;
  font-size: 32px;
  font-weight: 600;
  font-family: "Poppins";
  
  @media (max-width: 1700px) {
    font-size: 20px;
  }
`;

const StatValue = styled.h2`
  color: #da3a42;
  font-size: 36px;
  font-weight: 600;
  font-family: "Poppins";
  
  @media (max-width: 1700px) {
    font-size: 24px;
  }
`;

const IconContainer = styled.div`
  background: #cce6ff;
  width: 84px;
  height: 84px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;

  img{
    width: 50px;
    height: 50px;
  }

  
  @media (max-width: 1700px) {
    width: 64px;
    height: 64px;

  img{
    width: 34px;
    height: 34px;
  }
  }
`;

const StatCard = ({ title, value, icon }) => (
  <StatCardContainer>
    <div>
      <CardTitle>{title}</CardTitle>
      <StatValue>{value}</StatValue>
    </div>
    <IconContainer>
      <img src={icon} alt="icon" />
    </IconContainer>
  </StatCardContainer>
);

export default StatCard;
