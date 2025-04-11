import React from "react";
import styled from "styled-components";

const StatCardContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatValue = styled.h2`
  color: #e63946;
  font-size: 24px;
  margin: 0;
`;

const StatCard = ({ title, value, icon }) => (
  <StatCardContainer>
    <div>
      <p>{title}</p>
      <StatValue>{value}</StatValue>
    </div>
    {icon}
  </StatCardContainer>
);

export default StatCard;
