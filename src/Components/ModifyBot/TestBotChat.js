import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { testBot } from '../../apis/testBot';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 20px;
  box-shadow: 0px 10px 60px 0px #E2ECF980;
  max-width: 610px;
  border-radius: 30px;
  margin: auto;
`;

const Card = styled.div`
  width: 100%;
  max-width: 550px;
  min-height: calc(100vh - 140px);
  border: 1px solid #ccc;
  border-radius: 16px;
  background: white;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background: #3182CE;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
  color: white;
  border-radius: 16px 16px 0 0;
`;


const SwitchContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  display: none;

  &:checked + span {
    background-color: #4caf50;
  }

  &:checked + span:before {
    transform: translateX(18px);
  }
`;

const SwitchSlider = styled.span`
  width: 36px;
  height: 20px;
  background-color: #ccc;
  border-radius: 20px;
  position: relative;
  transition: background-color 0.3s;

  &:before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: transform 0.3s;
  }
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: calc(100vh - 255px);

  /* Hide scrollbar for Webkit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;

  /* Hide scrollbar for Internet Explorer and Edge */
  -ms-overflow-style: none;
`;

const Message = styled.div`
  background: ${(props) => (props.fromUser ? '#d1fae5' : '#e5e7eb')};
  align-self: ${(props) => (props.fromUser ? 'flex-end' : 'flex-start')};
  padding: 12px 16px;
  border-radius: 12px 12px 12px 0;
  max-width: 80%;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 16px;
  color: #3182CE;
  font-weight: 600;
  
  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
`;

const TypingLoader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background: #e5e7eb;
  border-radius: 12px;
  max-width: 80%;
  align-self: flex-start;
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  background-color: #3182CE;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite;
  animation-delay: ${(props) => props.delay};
`;

const InputSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #3182CE;
  border-radius: 8px;
  gap: 10px;
  padding: 0 10px 0 0;
  margin: 0 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: none;
  border-radius: 16px;
  outline: none;
  font-size: 16px;
  color: #3182CE;
  font-weight: 600;
`;

const SendButton = styled.button`
  background: transparent;
  border: none;
  color: #3182CE;
  font-size: 24px;
  cursor: pointer;
`;

const TestBotChat = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi this is your AI assistant! What can I help you with?', fromUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [improvedLayout, setImprovedLayout] = useState(false);

  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = { text: input, fromUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
  
    try {
      const data = await testBot(input, improvedLayout);
  
      if (data?.bot_response) {
        setMessages((prev) => [...prev, { text: data.bot_response, fromUser: false }]);
      } else {
        setMessages((prev) => [...prev, { text: 'Bot did not return a valid response.', fromUser: false }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { text: 'Error reaching bot. Please try again later.', fromUser: false }]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <PageWrapper>
      <Card>
        <ChatHeader>
          <SwitchContainer>
            <span style={{ color: 'white' }}>Improved</span>
            <SwitchInput
              type="checkbox"
              checked={improvedLayout}
              onChange={() => setImprovedLayout((prev) => !prev)}
            />
            <SwitchSlider />
          </SwitchContainer>
        </ChatHeader>

        <ChatBody ref={chatBodyRef}>
          {messages.map((msg, index) => (
            <Message key={index} fromUser={msg.fromUser}>
              {msg.text}
            </Message>
          ))}
          {loading && (
            <TypingLoader>
              <Dot delay="0s" />
              <Dot delay="0.2s" />
              <Dot delay="0.4s" />
            </TypingLoader>
          )}
        </ChatBody>

        <InputSection>
          <Input
            placeholder="Please type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SendButton onClick={handleSend}>➤</SendButton>
        </InputSection>
      </Card>
    </PageWrapper>
  );
};

export default TestBotChat;
