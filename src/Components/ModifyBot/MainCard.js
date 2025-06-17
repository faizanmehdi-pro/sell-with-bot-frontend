import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateBot } from "../../apis/WebHook/updateBot";
import { getBotDetails } from "../../apis/WebHook/getBotDetailPrompt";
import { toast } from "react-toastify";

// Styled Components...
const Container = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 30px 50px;
  border-radius: 30px;
  box-shadow: 0px 10px 60px 0px #E2ECF980;
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
  color: #3182CE;
  margin-right: 8px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  color: #3182CE;
  font-size: 15px;
  font-weight: 600;
  margin: 5px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  color: #3182CE;
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
  color: #3182CE;
`;

const SaveButton = styled.button`
  background: ${(props) => (props.disabled ? "#ccc" : "#3182CE")};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: 100%;
  margin-top: 10px;

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ListLoader = styled.div`
  border: 4px solid #3182CE;
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  display: inline-block;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const RangeInput = styled.input.attrs({ type: "range" })`
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 5px;
  outline: none;
  margin: 5px 0 15px 0;
  cursor: pointer;
  transition: background 0.3s ease;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3182CE;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    transition: background 0.3s ease;
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #3182CE;
    border: none;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    transition: background 0.3s ease;
  }

  &:hover {
    background: #d1d5db;
  }

  &:focus::-webkit-slider-thumb {
    background: #1d4ed8;
  }
`;

const RangeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3182CE;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 5px;

  span {
    font-size: 14px;
    color: #9ca3af;
    margin-left: 5px;
  }
`;

const MainCard = () => {
  const [improvedLayout, setImprovedLayout] = useState(false);
  const [botName, setBotName] = useState("");
  const [whyText, setWhyText] = useState("");
  const [businessInfo, setBusinessInfo] = useState("");
  const [responseText, setResponseText] = useState("");
  const [generalPrompt, setGeneralPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(100);
  const [role, setRole] = useState("");
  const [goal, setGoal] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["botDetails", improvedLayout],
    queryFn: () => getBotDetails(improvedLayout),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (data?.bot_data?.bot) {
      const bot = data.bot_data.bot;
      setBotName(bot.name || "");
      setWhyText(bot.prompt || "");
      setBusinessInfo(bot.business_rules || "");
      setResponseText(bot.response_text || "");
      setGeneralPrompt(bot.role_prompt || "");
      setTemperature(bot.temperature || bot.improved_temperature || 0.5);
      setMaxTokens(bot.max_token || bot.improved_max_token || 100);
      setImprovedLayout(bot.improved_layout ?? false);
      setRole(bot.role || "");
      setGoal(bot.goal || "");
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateBot,
    onSuccess: () => {
      toast.success("Bot updated successfully!");
    },
    onError: () => toast.error("Failed to Update Bot!"),
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
      role,
      goal,
    });
  };

  if (isLoading)
    return (
      <Container>
        <ListLoader />
      </Container>
    );

  return (
    <Container>
      <ToggleContainer>
        <ToggleLabel>Use Improved Layout</ToggleLabel>
        {improvedLayout ? (
          <FaToggleOn
            size={24}
            color="#3182CE"
            onClick={() => setImprovedLayout(false)}
          />
        ) : (
          <FaToggleOff
            size={24}
            color="#6b7280"
            onClick={() => setImprovedLayout(true)}
          />
        )}
      </ToggleContainer>

      {improvedLayout ? (
        <>
          <Section>
            <Title>Bot Name</Title>
            <InputField
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              placeholder="Please type Your Bot Name Here"
            />
            <Title>Role</Title>
            <InputField
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Please type Your Bot Role Here"
            />

            <Title>Goal</Title>
            <TextArea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Please type Your Bot Goal Here"
            />
            <CharacterCount>
              {goal.length} / {maxTokens} CHARACTERS
            </CharacterCount>
            <Title>Conversation Flow</Title>
            <TextArea
              value={whyText}
              onChange={(e) => setWhyText(e.target.value)}
              placeholder="Please type Your Bot Conversation Flow Here"
            />
            <CharacterCount>
              {whyText.length} / {maxTokens} CHARACTERS
            </CharacterCount>
          </Section>

          <Section>
            <Title>Rules</Title>
            <TextArea
              value={businessInfo}
              onChange={(e) => setBusinessInfo(e.target.value)}
              placeholder="Please type Your Bot Rules Here"
            />
            <CharacterCount>
              {businessInfo.length} / {maxTokens} CHARACTERS
            </CharacterCount>
          </Section>

          <Section>
            <Title>Frequently Ask Question</Title>
            <TextArea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Please type Your Bot FAQs Here"
            />
            <CharacterCount>
              {responseText.length} / {maxTokens} CHARACTERS
            </CharacterCount>
          </Section>
        </>
      ) : (
        <Section>
          <Title>Bot Name</Title>
          <InputField
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Please type Your Bot Name Here"
          />
          <Title>General Prompt</Title>
          <TextArea
            value={generalPrompt}
            onChange={(e) => setGeneralPrompt(e.target.value)}
            placeholder="Please type Your Bot General Prompt Here"
          />
          <CharacterCount>
            {generalPrompt.length} / {maxTokens} CHARACTERS
          </CharacterCount>
        </Section>
      )}

      <RangeHeader>
        <Title>
          Temperature
          <span>
            (0.0 = focused | 0.3 = balanced | 0.7 = creative | 1.0 = freestyle
            mode)
          </span>
        </Title>
        <Title>{temperature.toFixed(1)}</Title>
      </RangeHeader>
      <RangeInput
        min="0"
        max="1"
        step="0.1"
        value={temperature}
        onChange={(e) => setTemperature(parseFloat(e.target.value))}
      />

      <RangeHeader>
        <Title>
          Max Tokens
          <span>
            (1 token ≈ 4 characters)
          </span>
        </Title>
        <Title>{maxTokens}</Title>
      </RangeHeader>
      <RangeInput
        type="range"
        min="1"
        max="200"
        step="1"
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
