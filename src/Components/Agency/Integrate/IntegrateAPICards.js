// src/components/IntegrateAPICards.js
import React from "react";
import styled from "styled-components";
import OpenAIIcon from "../../../assets/SuperAdmin/integrate/openAI.png";
import DeepseekIcon from "../../../assets/SuperAdmin/integrate/deepseek.png";
import GrokIcon from "../../../assets/SuperAdmin/integrate/grok.png";

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 20px;
  padding: 120px 40px 40px 40px;
  
  @media (max-width: 1620px) {
    padding: 60px 40px;
  }
  
  @media (max-width: 990px) {
    padding: 20px;
  }
  
  @media (max-width: 768px) {
    padding: 0;
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: #FFFFFF;
  box-shadow: 0px 10px 60px 0px #E2ECF980;
  border-radius: 30px;
  padding: 30px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.color || "#000000"};
`;

const Description = styled.p`
  font-size: 15;
  color: #B5B7C0;
  font-weight: 700;
  min-width: 332px;
  max-width: 332px;
  text-align: center;
  margin-top: 20px;
  
  @media (max-width: 420px) {
    width: 100%;
    min-width: 100%;
    font-size: 14px;
  }
`;

const InputButton = styled.div`
  width: 332px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #B5B7C0;
  font-size: 15px;
  font-weight: 700;
  color: #B5B7C0;
  
  @media (max-width: 420px) {
    width: 100%;
  }
`;

const Button = styled.button`
  background-color: #3182CE;
  font-size: 16px;
  font-weight: 700;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 107px;
  height: 44px;

  &:hover {
    background-color: #145edc;
  }
`;

const IntegrateAPICards = () => {
  const cards = [
    {
      title: "OpenAI",
      logo: OpenAIIcon,
      color: "#000000",
    },
    {
      title: "DeepSeek",
      logo: DeepseekIcon,
      color: "#536EFB",
    },
    {
      title: "Grok",
      logo: GrokIcon,
      color: "#000000",
    },
  ];

  return (
    <CardWrapper>
      {cards.map(({ title, logo, color  }, idx) => (
        <Card key={idx}>
            <Logo>
          <img src={logo} alt={`${title} logo`} />
          <Title color={color}>{title}</Title>
          </Logo>
          <Description>
            Connect Your {title} Api Key To Activate Your Agency Sub-Accounts Bots
          </Description>
          <InputButton>hgj1234**********************jhgu12</InputButton>
          <Button>Connect</Button>
        </Card>
      ))}
    </CardWrapper>
  );
};

export default IntegrateAPICards;
