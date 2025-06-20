import React from "react";
import styled from "styled-components";

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

const DeleteSubAccountModal = ({ isOpen, onClose, user }) => {
  return (
    <Overlay isOpen={isOpen}>
      <Modal>
        <Title>Confirm Deletion</Title>
        <Message>
          Are you sure you want to delete <strong>{user?.clientName}</strong>?
        </Message>
        <Actions>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <DeleteButton>Delete</DeleteButton>
        </Actions>
      </Modal>
    </Overlay>
  );
};

export default DeleteSubAccountModal;
