import React, { useState } from "react";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";

const Container = styled.div`
  width: 600px;
  margin: auto;
  background: #ffffff;
  padding: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
  font-weight: bold;
`;

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "1px solid #d1d5db",
    borderRadius: "5px",
    padding: "2px",
    boxShadow: "none",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#3b82f6",
    borderRadius: "4px",
    padding: "2px 6px",
    color: "#fff",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff",
    fontSize: "14px",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#fff",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#2563eb",
      color: "#fff",
    },
  }),
};

const predefinedOptions = [
  { value: "approachable", label: "approachable" },
  { value: "friendly", label: "friendly" },
  { value: "professional", label: "professional" },
  { value: "witty", label: "witty" },
];

const BotVoice = () => {
  const [selectedOptions, setSelectedOptions] = useState([
    { value: "approachable", label: "approachable" },
    { value: "friendly", label: "friendly" },
  ]);

  const handleChange = (newValue) => {
    setSelectedOptions(newValue);
  };

  return (
    <Container>
      <Label>Bot Voice</Label>
      <CreatableSelect
        isMulti
        options={predefinedOptions}
        value={selectedOptions}
        onChange={handleChange}
        styles={customStyles}
        placeholder="Add or select tags..."
        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
      />
    </Container>
  );
};

export default BotVoice;
