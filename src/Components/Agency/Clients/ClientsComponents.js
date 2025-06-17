import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import ClientsTable from "./ClientsTable";
import AddClientForm from "./AddClientForm";

const ClientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 10px;
`;

const ClientsTopbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;

const TopbarHeading = styled.h1`
  color: #1976d2;
`;

const ClientsComponents = () => {
  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
  });

  const handleAddClientModalOpen = () => {
    setOpenAddClientModal(true);
  };

  const handleAddClientModalClose = () => {
    setOpenAddClientModal(false);
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "phone" ? value.replace(/[^0-9]/g, "") : value;

    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: updatedValue,
    }));
  };

  const handleAddClientSubmit = () => {
    console.log("New Client added:", newClient);
    // Add API call or saving logic here
    setOpenAddClientModal(false);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      status: "",
    });
  };

  return (
    <ClientsContainer>
      <ClientsTopbar>
        <TopbarHeading>Clients List</TopbarHeading>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClientModalOpen}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "16px",
            padding: "10px 24px",
          }}
        >
          Add Client
        </Button>
      </ClientsTopbar>

      <ClientsTable />

      <AddClientForm
        open={openAddClientModal}
        onClose={handleAddClientModalClose}
        onChange={handleClientChange}
        onSubmit={handleAddClientSubmit}
        client={newClient}
      />
    </ClientsContainer>
  );
};

export default ClientsComponents;
