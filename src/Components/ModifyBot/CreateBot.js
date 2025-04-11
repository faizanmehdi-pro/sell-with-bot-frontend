import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  width: 80%;
  margin-top: 50px;
`;

const CombinedFields = styled.div`
  display: flex;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  min-width: 250px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  transition: border 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  font-size: 14px;
  transition: border 0.3s;
  height: 100px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const FormButton = styled.button`
  width: 200px;
  padding: 12px;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s;
  align-self: flex-end;
  margin-top: 20px;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#0056b3")};
  }
`;

const CreateBot = ({ setActiveTab }) => {
  const [botData, setBotData] = useState({
    name: "",
    role: "",
    prompt: "",
    negative_prompt: "",
    max_tokens: "",
    temperature: "",
  });

  const mutation = useMutation({
    mutationFn: async (newBot) => {
      const response = await axios.post(
        "http://api.sellwithbot.com/api/bots/",
        newBot
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Bot Created Successfully!");
      setActiveTab("Bots List");
    },
    onError: (error) => {
      console.error("Error creating bot:", error);
      toast.error("Failed to create bot. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const handleChange = (e) => {
    setBotData({ ...botData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(botData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CombinedFields>
        <FormField>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter bot name"
            value={botData.name}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label>Role</Label>
          <Input
            type="text"
            name="role"
            placeholder="Enter bot role"
            value={botData.role}
            onChange={handleChange}
          />
        </FormField>
      </CombinedFields>
      <CombinedFields>
        <FormField>
          <Label>Max Tokens</Label>
          <Input
            type="number"
            name="max_tokens"
            placeholder="Enter max tokens"
            value={botData.max_tokens}
            onChange={handleChange}
            min="1"
          />
        </FormField>
        <FormField>
          <Label>Temperature</Label>
          <Input
            type="number"
            name="temperature"
            placeholder="Enter temperature (0-1)"
            value={botData.temperature}
            onChange={handleChange}
            min="0"
            max="1"
            step="0.1"
          />
        </FormField>
      </CombinedFields>
      <CombinedFields>
        <FormField>
          <Label>Prompt</Label>
          <TextArea
            name="prompt"
            placeholder="Provide a prompt for the bot"
            value={botData.prompt}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <Label>Negative Prompt</Label>
          <TextArea
            name="negative_prompt"
            placeholder="Specify what the bot should avoid"
            value={botData.negative_prompt}
            onChange={handleChange}
          />
        </FormField>
      </CombinedFields>
      <FormButton type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Creating..." : "Create Bot"}
      </FormButton>
    </FormContainer>
  );
};

export default CreateBot;
