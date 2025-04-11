import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiRefreshCw, FiX, FiSearch } from "react-icons/fi";

// Styled Components (make sure they are declared before being used)
const CardContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px 20px;
  margin-top: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f0f4f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0;
  color: #333;
`;

const Subtitle = styled.a`
  font-size: 14px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  font-size: 14px;
  margin-right: 10px;
  padding-left: 30px;  // Space for the search icon
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const ClearButton = styled(FiX)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;

  &:hover {
    color: #007bff;
  }
`;

const SelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const IconActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
  gap: 10px;

  svg {
    cursor: pointer;
    color: #999;

    &:hover {
      color: #007bff;
    }
  }
`;

const ListItem = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover ${IconActions} {
    display: flex;
  }
`;

const ListItemTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const ListItemSubtitle = styled.div`
  font-size: 12px;
  color: #666;
`;

const AddButton = styled(Link)`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const LeadConnector = () => {
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, title: "AI Automation HQ", subtitle: "RRYOIUu546orj9aXOzw" },
  ]);
  const [items] = useState([
    { id: 1, title: "AI Automation HQ", subtitle: "RRYOIUu546orj9aXOzw" },
    { id: 2, title: "Tech Innovations", subtitle: "123ABCxyZ456" },
    { id: 3, title: "Marketing Insights", subtitle: "qwerty0987lkj" },
    { id: 4, title: "Productivity Hub", subtitle: "zxcvbnm5678poi" },
  ]);
  const [searchQuery, setSearchQuery] = useState(""); // For handling the search input
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter items based on search query
  const filteredItems = items
    .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((item) => !selectedItems.some((selected) => selected.id === item.id)); // Exclude selected items

  // Handle the selection of an item from the dropdown
  const handleSelectItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    setSearchQuery(""); // Clear search query after selection
    setIsDropdownOpen(false); // Close the dropdown after selecting
  };

  // Handle removing an item from selectedItems
  const handleRemoveItem = (id) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  // Handle refresh action (for now, simulate it by re-adding the item to the list)
  const handleRefreshItem = (id) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setSelectedItems(
        selectedItems.map((selectedItem) =>
          selectedItem.id === id ? { ...selectedItem } : selectedItem
        )
      );
    }
  };

  // Handle outside click to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".search-bar")) return;
      setIsDropdownOpen(false); // Close the dropdown when clicking outside
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <CardContainer>
      <Header>
        <Icon>🔗</Icon>
        <TitleContainer>
          <Title>Lead Connector</Title>
          <Subtitle href="#">Setup Instructions</Subtitle>
        </TitleContainer>
      </Header>
      <SearchBarContainer>
      <SearchBar className="search-bar">
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search previously added..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
        />
        {searchQuery && <ClearButton onClick={() => setSearchQuery("")} />}
        {isDropdownOpen && (
          <SelectDropdown>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <DropdownItem key={item.id} onClick={() => handleSelectItem(item)}>
                  <ListItem>
                    <ListItemTitle>{item.title}</ListItemTitle>
                    <ListItemSubtitle>{item.subtitle}</ListItemSubtitle>
                  </ListItem>
                </DropdownItem>
              ))
            ) : (
              <DropdownItem>No results found</DropdownItem>
            )}
          </SelectDropdown>
        )}
      </SearchBar>
        or
        <AddButton to="http://54.197.41.35/oauth/initiate/">Add New</AddButton>
        </SearchBarContainer>

      {/* Render selected items */}
      {selectedItems.length > 0 ? (
        selectedItems.map((item) => (
          <ListItem key={item.id}>
            <IconActions>
              <FiRefreshCw size={16} title="Refresh" onClick={() => handleRefreshItem(item.id)} />
              <FiX size={16} title="Remove" onClick={() => handleRemoveItem(item.id)} />
            </IconActions>
            <ListItemTitle>{item.title}</ListItemTitle>
            <ListItemSubtitle>{item.subtitle}</ListItemSubtitle>
          </ListItem>
        ))
      ) : (
        ""
      )}
    </CardContainer>
  );
};

export default LeadConnector;
