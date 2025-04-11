import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const FormContainer = styled.form`
 position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

export const FormTopbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CombinedFields = styled.div`
  display: flex;
  gap: 20px;
`;

const FormField = styled.div`
  display: flex;
  justify-content: center;
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

const fetchBot = async (id) => {
  const response = await axios.get(`http://api.sellwithbot.com/api/bots/${id}/`);
  return response.data;
};

const UpdateBot = ({ setOpenEditModal, botId, setActiveTab }) => {
  const queryClient = useQueryClient();

  const { data: botData } = useQuery({
    queryKey: ["bot", botId],
    queryFn: () => fetchBot(botId),
    enabled: !!botId,
  });

  const mutation = useMutation({
    mutationFn: async (updatedBot) => {
      const response = await axios.put(
        `http://api.sellwithbot.com/api/bots/${botId}/`,
        updatedBot
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bot", botId]); // Refresh bot data
      setActiveTab("Bots List");
      setOpenEditModal(false);
      toast.success("Bot Updated Successfully!");
    },
    onError: (error) => {
      console.error("Error updating bot:", error);
      alert("Failed to update bot. Please try again.");
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    prompt: "",
    negative_prompt: ""
  });

  useEffect(() => {
    if (botData) {
      setFormData({
        name: botData.name || "",
        role: botData.role || "",
        prompt: botData.prompt || "",
        negative_prompt: botData.negative_prompt || ""
      });
    }
  }, [botData]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTopbar>
        <h2>Update Bot</h2>
        <IconButton edge="end" color="inherit" onClick={() => setOpenEditModal(false)}>
          <CloseIcon />
        </IconButton>
      </FormTopbar>
      <CombinedFields>
        <FormField>
          <Label>Name</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label>Role</Label>
          <Input type="text" name="role" value={formData.role} onChange={handleChange} />
        </FormField>
      </CombinedFields>
      <CombinedFields>
        <FormField>
          <Label>Prompt</Label>
          <TextArea name="prompt" value={formData.prompt} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label>Negative Prompt</Label>
          <TextArea name="negative_prompt" value={formData.negative_prompt} onChange={handleChange} />
        </FormField>
      </CombinedFields>
      <FormButton type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Updating..." : "Update Bot"}
      </FormButton>
    </FormContainer>
  );
};

export default UpdateBot;