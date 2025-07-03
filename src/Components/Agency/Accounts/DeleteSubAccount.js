import React, { useState } from "react";
import styled from "styled-components";
import { deleteAgencySubAccount } from "../../../apis/Agency/Accounts/deleteAgencySubAccount";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const Modal = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 420px) {
    margin: 0 10px;
    padding: 30px 20px;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #3182ce;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #3d3c42;
  font-size: 14px;
  margin-bottom: 2rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background: #e5e7eb;
  color: #3d3c42;
`;

const DeleteButton = styled(Button)`
  background-color: #3182ce;
  color: #ffffff;
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

const DeleteSubAccountModal = ({ isOpen, onClose, user }) => {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
  
    const mutation = useMutation({
      mutationFn: deleteAgencySubAccount,
      onSuccess: (data) => {
        toast.success(data.message || 'Sub Account Deleted Successfully!');
        queryClient.invalidateQueries(['agency-sub-accounts']);
        onClose();
      },
      onError: (error) => {
        toast.error(error.message || 'Something went wrong'); 
      },
    });
  
    const handleDelete = () => {
      if (!user?.id) return;
      setLoading(true);
      mutation.mutate(user.id, {
        onSettled: () => {
          setLoading(false);
        },
      });
    };

  return (
    <Overlay isOpen={isOpen}>
      <Modal>
        <Title>Confirm Deletion</Title>
        <Message>
          Are you sure you want to delete <strong>{user?.full_name}</strong>?
        </Message>
        <Actions>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <DeleteButton onClick={handleDelete} disabled={loading}>
            {loading ? <Loader /> : 'Delete'}
          </DeleteButton>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default DeleteSubAccountModal;
