import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiRefreshCw, FiX, FiSearch } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { leadConnectIntegrate } from "../../apis/leadConnectIntegrate";
import { toast } from "react-toastify";
import { disconnectAccount } from "../../apis/disconnectAccount";
import { useQuery } from "@tanstack/react-query";
import { previousAdded } from "../../apis/previousAdded";
import { reconnectAccount } from "../../apis/reconnectAccount";
import { activeAccounts } from "../../apis/activeAccounts";

const CardContainer = styled.div`
  width: 100%;
  background: #FFFFFF;
  padding: 100px 30px 50px 30px;
  box-shadow: 0px 10px 60px 0px #E2ECF980;
  border-radius: 30px;
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
  color: #3182CE;
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

// const ClearButton = styled(FiX)`
//   position: absolute;
//   right: 10px;
//   top: 50%;
//   transform: translateY(-50%);
//   cursor: pointer;
//   color: #999;

//   &:hover {
//     color: #3182CE;
//   }
// `;

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
      color: #3182CE;
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
  background: ${(props) => (props.disabled ? "#ccc" : "#3182CE")};
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LeadConnector = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddAccountLoading, setIsAddAccountLoading] = useState(false);
  const [currentLocationId, setCurrentLocationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const {
    data: filteredResults = [],
    refetch: refetchFilteredItems,
  } = useQuery({
    queryKey: ["ghl_search"],
    queryFn: async () => {
      const response = await previousAdded();
      return response || [];
    },
    enabled: false,
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-bar")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setIsDropdownOpen(true);
    setSearchLoading(true); // Start loading when focus happens
    refetchFilteredItems().finally(() => {
      setSearchLoading(false); // Stop loading once the refetch is done
    });
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const filteredItems = filteredResults.filter((item) => {
    const isSelected = selectedItems.some((selected) => selected.id === item.location_id);
    const matchesSearch = (
      (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location_id || "").toLowerCase().includes(searchQuery.toLowerCase())
      // (item.address || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      // (item.city || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
    return !isSelected && matchesSearch;
  });

  const reconnectAccountMutation = useMutation({
    mutationFn: reconnectAccount,
    onSuccess: (data) => {
      toast.success(data?.message || "Account Reconnected Successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error || "Failed to Reconnect Account.";
      toast.error(errorMessage);
    },
  });
  

  const handleSelectItem = (item) => {
    const alreadyExists = selectedItems.some((selected) => selected.id === item.location_id);
    if (!alreadyExists) {
      const newItem = {
        id: item.location_id,
        title: item.name,
        subtitle: item.company_id,
        address: item.address,
        city: item.city,
      };
  
      setSelectedItems((prev) => [...prev, newItem]);
      reconnectAccountMutation.mutate({ location_id: newItem.id }); // <-- API call
    }
    setIsDropdownOpen(false);
  };  

  const removeAccountMutation = useMutation({
    mutationFn: disconnectAccount,
    onSuccess: (data) => {
      toast.success(data.message || "Sub-account disconnected successfully!");
      setSelectedItems((prev) => prev.filter((item) => item.id !== currentLocationId));
    },
    onError: () => {
      toast.error("Failed to disconnect sub-account.");
    },
  });

  const handleRemoveItem = (id) => {
    setCurrentLocationId(id);
    removeAccountMutation.mutate(id);
  };

  const handleRefreshItem = (id) => {
    const item = selectedItems.find((item) => item.id === id);
    if (item) {
      setSelectedItems((prev) =>
        prev.map((selectedItem) =>
          selectedItem.id === id ? { ...selectedItem } : selectedItem
        )
      );
    }
  };

  const addNewAccountMutation = useMutation({
    mutationFn: () => {
      return activeAccounts();
    },
    onSuccess: (data) => {
      setIsAddAccountLoading(false);
      if (data?.active_accounts?.length > 0) {
        const newAccounts = data.active_accounts
          .filter((location) => !selectedItems.some((item) => item.id === location.location_id))
          .map((location) => ({
            id: location.location_id,
            title: location.name,
          }));
      
        if (newAccounts.length > 0) {
          setSelectedItems((prev) => [...prev, ...newAccounts]);
        }
      
        setIsDropdownOpen(false);
      } else {
        setIsAddAccountLoading(false);
      }
    },
    onError: () => {
      setIsAddAccountLoading(false);
    },
  });
  
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      setIsAddAccountLoading(true);
      addNewAccountMutation.mutate();
    }
  }, []); 

  const mutation = useMutation({
    mutationFn: leadConnectIntegrate,
    onSuccess: (data) => {
      if (data?.auth_url) {
        window.location.href = data.auth_url;
      } else {
        toast.error("Auth URL not found");
      }
    },
    onError: () => {
      toast.error("Auth URL not found");
    },
  });

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
            value={searchQuery} // Bind value to searchQuery
            onChange={handleInputChange}
            onFocus={handleSearchFocus}
          />
          {isDropdownOpen && (
            <SelectDropdown>
              {searchLoading ? (
                <DropdownItem><ListLoader /></DropdownItem>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <DropdownItem key={item.location_id} onClick={() => handleSelectItem(item)}>
                    <ListItem>
                      <ListItemTitle>{item.name}</ListItemTitle>
                      <ListItemSubtitle>{item.location_id}</ListItemSubtitle>
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
        <AddButton onClick={() => mutation.mutate()} disabled={mutation.isPending}>
          {mutation.isPending ? <Loader /> : "Add New"}
        </AddButton>
      </SearchBarContainer>

      {isAddAccountLoading ? (
        <LoaderContainer><ListLoader /></LoaderContainer>
      ) : (
        selectedItems.map((item) => (
          <ListItem key={item.id}>
            <IconActions>
              <FiRefreshCw size={16} title="Refresh" onClick={() => handleRefreshItem(item.id)} />
              <FiX size={16} title="Remove" onClick={() => handleRemoveItem(item.id)} />
            </IconActions>
            <ListItemTitle>{item.title}</ListItemTitle>
            <ListItemSubtitle>{item.id}</ListItemSubtitle>
          </ListItem>
        ))
      )}
    </CardContainer>
  );
};

export default LeadConnector;
