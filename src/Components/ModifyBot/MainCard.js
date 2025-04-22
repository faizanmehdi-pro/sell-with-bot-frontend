import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useMutation, useQuery } from '@tanstack/react-query';
import { updateBot } from "../../apis/WebHook/updateBot";
import { getBotDetails } from "../../apis/WebHook/getBotDetailPrompt";
import { toast } from "react-toastify";

// Styled Components...
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
  color: #4b5563;
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

const ListLoader = styled.div`
  border: 4px solid #0056b3;
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  display: inline-block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const MainCard = () => {
  const [improvedLayout, setImprovedLayout] = useState(false);
  const [botName, setBotName] = useState("");
  const [whyText, setWhyText] = useState("");
  const [businessInfo, setBusinessInfo] = useState("");
  const [responseText, setResponseText] = useState("");
  const [generalPrompt, setGeneralPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(500);
  const [botID, setBotID] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["botDetails", improvedLayout, botID],
    queryFn: () => {
      if (!botID) return Promise.resolve(null); // Prevent API call if botID is invalid
      return getBotDetails(improvedLayout, botID);
    },
    enabled: !!botID, // Only enable the query if botID is truthy
  });

  useEffect(() => {
    if (!data) return;
    const bot = data.bot || {};
    console.log("botData", data, bot);
    setBotName(bot.name || "");
    setWhyText(bot.prompt || "");
    setBusinessInfo(bot.business_rules || "");
    setResponseText(bot.response_text || "");
    setGeneralPrompt(bot.role_prompt || "");
    setTemperature(bot.temperature ?? 0.7);
    setMaxTokens(bot.max_token ?? 500);
    setBotID(bot.bot_id || "");  // Set botID from the fetched data
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateBot,
    onSuccess: (data) => {
      setBotID(data?.bot_id);
      toast.success('Bot updated successfully!');
    },
    onError: () => toast.error('Failed to Update Bot!'),
  });

  const handleSave = () => {
    mutation.mutate({
      botName,
      whyText,
      businessInfo,
      responseText,
      temperature,
      maxTokens,
      improvedLayout,
      generalPrompt,
      botID, // Include botID in the request payload
    });
  };

  if (isLoading) return <Container><ListLoader /></Container>;

  return (
    <Container>
      <ToggleContainer>
        <ToggleLabel>Use Improved Layout</ToggleLabel>
        {improvedLayout ? (
          <FaToggleOn
            size={24}
            color="#2563eb"
            onClick={() => setImprovedLayout(false)}
          />
        ) : (
          <FaToggleOff
            size={24}
            color="#6b7280"
            onClick={() => setImprovedLayout(true)} />
        )}
      </ToggleContainer>

      {improvedLayout ? (
        
        <>
          <Section>
            <Title>Bot Name</Title>
            <InputField
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              placeholder="Enter Bot Name"
            />
            <Title>Why We’re Having This Talk</Title>
            <TextArea
              value={whyText}
              onChange={(e) => setWhyText(e.target.value)}
              placeholder="Please Enter Why We’re Having This Talk"
            />
            <CharacterCount>{whyText.length} / {maxTokens} CHARACTERS</CharacterCount>
          </Section>

          <Section>
            <Title>Important Business Information</Title>
            <TextArea
              value={businessInfo}
              onChange={(e) => setBusinessInfo(e.target.value)}
              placeholder="Please Enter Important Business Information"
            />
            <CharacterCount>{businessInfo.length} / {maxTokens} CHARACTERS</CharacterCount>
          </Section>

          <Section>
            <Title>How to Respond</Title>
            <TextArea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Please Enter How to Respond"
            />
            <CharacterCount>{responseText.length} / {maxTokens} CHARACTERS</CharacterCount>
          </Section>
        </>
      ) : (
        <Section>
          <Title>Bot Name</Title>
          <InputField
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Enter Bot Name"
          />
          <Title>General Prompt</Title>
          <TextArea
            value={generalPrompt}
            onChange={(e) => setGeneralPrompt(e.target.value)}
            placeholder="Please Enter General Prompt"
          />
          <CharacterCount>{generalPrompt.length} / {maxTokens} CHARACTERS</CharacterCount>
        </Section>
      )}

      <Title>Temperature</Title>
      <InputField
        type="number"
        step="0.1"
        min="0"
        max="1"
        value={temperature}
        onChange={(e) => setTemperature(parseFloat(e.target.value))}
      />

      <Title>Max Tokens</Title>
      <InputField
        type="number"
        min="1"
        max="500"
        value={maxTokens}
        onChange={(e) => setMaxTokens(parseInt(e.target.value))}
      />

      <SaveButton onClick={handleSave} disabled={mutation.isPending}>
        {mutation.isPending ? <Loader /> : "Save"}
      </SaveButton>
    </Container>
  );
};

export default MainCard;
