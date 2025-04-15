import React, { useState } from "react";
import styled from "styled-components";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import { updateBot } from "../../apis/updateBot";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 20px;
  margin: 10px 0 30px 0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ToggleLabel = styled.span`
  font-size: 14px;
  color: #4b5563;
  margin-right: 8px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  color: #2563eb;
  font-size: 15px;
  font-weight: 600;
  margin: 5px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.5;
  background: #fff;
  padding: 15px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  resize: vertical;
  outline: none;
`;

const CharacterCount = styled.div`
  font-size: 12px;
  color: #6b7280;
  text-align: right;
  margin-bottom: 15px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
`;

const SaveButton = styled.button`
  background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: 100%;
  margin-top: 10px;


  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const Loader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
  display: inline-block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const MainCard = () => { 
  const [improvedLayout, setImprovedLayout] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);

  const [whyText, setWhyText] = useState("");

  const [businessInfo, setBusinessInfo] = useState("");

  const [responseText, setResponseText] = useState("");

  const [generalPrompt, setGeneralPrompt] = useState("");

  // const [whyText, setWhyText] = useState(
  //   "You are AI, a friendly, wise and empathetic AI assistant with a background in digital marketing, freelancing and GoHighLevel CRM who works at Automations Guru Company.\nYour main objective is to effectively qualify leads.\nOnce a lead is qualified, you should offer them the opportunity to purchase gohighlevel masterclass course."
  // );

  // const [businessInfo, setBusinessInfo] = useState(
  //   'Offer Help:\n"It sounds like you’re serious about making freelancing work!\nWould you be interested in some resources to help you get started?"\n\nIntroduce Resources:\nFree "I have a free ebook that could help:\nhttps://www.haidersafdar.com/ebook\nand a freelancing training you might find useful:\nhttps://www.haidersafdar.com/free-training"\n\nPaid, if they ask for more:\nWe also have a GoHighLevel Masterclass that dives deeper into freelancing success:\nhttps://gohighlevelmasterclass.com/urdu'
  // );

  // const [responseText, setResponseText] = useState(
  //   "Always address customers by their name, contact.first_name.\nIf you do not know the answer to a question, do not invent one.\nIf Prospect asks about our paid course tell them about our GHL Masterclass.\nIf they ask about a free course or resource send them ebook:\nhttps://www.haidersafdar.com/ebook\nas free resource and freelancing training as free course/masterclass:\nhttps://www.haidersafdar.com/free-training\nFor paid, give them GoHighLevel masterclass:\nhttps://gohighlevelmasterclass.com/urdu"
  // );

  // const [generalPrompt, setGeneralPrompt] = useState(
  //   "#Overview\nHey you, you're a fun receptionist named @rep_name who works for a company that cleans houses.\nThis company is super local and well trusted in the community, so @lead_name doesn't have to worry about a thing.\n@lead_name responded to one of your online advertisements saying they want to get their house deep cleaned for $75!\n\n#About your Business\nThe company name is Clean Freaks and you take pride on your pricing.\nEven with the low price you use high quality products and are SPEEDY!\n\n#Crafting a Response\nIf @lead_name asks you a personal question, come up with a sincere response.\nDo not tell @lead_name you are a bot.\nOne cool thing your cleaning company does that others don't is wood treatment on all wood furniture 😎\nYou should not sound like an assistant, especially not some boring minimum wage earning assistant.\nThat means not using @lead_name's name in your responses.\nThis conversation should be a great time and engaging."
  // ); 

  const mutation = useMutation({
    mutationFn: updateBot,
    onSuccess: (data) => {
      toast.success('Bot updated successfully!');
      console.log(data);
    },
    onError: (error) => {
      toast.error('Failed to Update Bot!', error);
    },
  });

  const handleSave = () => {
    mutation.mutate({
      whyText,
      businessInfo,
      responseText,
      temperature,
      maxTokens,
      improvedLayout,
      generalPrompt
    });
  };
  

  return (
    <Container>
      <ToggleContainer>
        <ToggleLabel>Use Improved Layout</ToggleLabel>
        {improvedLayout ? (
          <FaToggleOn 
            size={24} 
            color="#2563eb" 
            onClick={() => {
              setImprovedLayout(false);
              setMaxTokens(2000);
            }}
          />
        ) : (
          <FaToggleOff 
            size={24} 
            color="#6b7280" 
            onClick={() => {
              setImprovedLayout(true);
              setMaxTokens(500);
            }}
          />
        )}
      </ToggleContainer>

      {improvedLayout ? (
        <>
          <Section>
            <Title>Why We’re Having This Talk</Title>
            <TextArea
              value={whyText}
              onChange={(e) => setWhyText(e.target.value)}
              placeholder="Please Enter Why We’re Having This Talk"
            />
            <CharacterCount>{whyText.length} / 500 CHARACTERS</CharacterCount>
          </Section>

          <Section>
            <Title>Important Business Information</Title>
            <TextArea
              value={businessInfo}
              onChange={(e) => setBusinessInfo(e.target.value)}
              placeholder="Please Enter Important Business Information"
            />
            <CharacterCount>{businessInfo.length} / 500 CHARACTERS</CharacterCount>
          </Section>

          <Section>
            <Title>How to Respond</Title>
            <TextArea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Please Enter How to Respond"
            />
            <CharacterCount>{responseText.length} / 500 CHARACTERS</CharacterCount>
          </Section>
        </>
      ) : (
        <Section>
          <Title>General Prompt</Title>
          <TextArea
            value={generalPrompt}
            onChange={(e) => setGeneralPrompt(e.target.value)}
            placeholder="Please Enter General Prompt"
          />
          <CharacterCount>{generalPrompt.length} / 2000 CHARACTERS</CharacterCount>
        </Section>
      )}

      <label>Temperature</label>
      <InputField
        type="number"
        step="0.1"
        min="0"
        max="1"
        value={temperature}
        onChange={(e) => setTemperature(parseFloat(e.target.value))}
      />

      <label>Max Tokens</label>
      <InputField
        type="number"
        min="1"
        max="2000"
        value={maxTokens}
        onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
      />

      <SaveButton onClick={handleSave} disabled={mutation.isPending}>{mutation.isPending ? <Loader /> : "Sign In"}</SaveButton>
    </Container>
  );
};

export default MainCard;
