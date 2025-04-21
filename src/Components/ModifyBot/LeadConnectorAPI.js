import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FiRefreshCw, FiX, FiSearch } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { leadConnectIntegrate } from "../../apis/leadConnectIntegrate";
import { toast } from "react-toastify";
import { getGHLSubAccounts } from "../../apis/accountList";
import { disconnectAccount } from "../../apis/disconnectAccount";

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
  background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
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
    background: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
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

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ListLoader = styled.div`
  border: 4px solid #0056b3;
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

const useExtractTokenAndLocation = () => {
  const { search } = useLocation();
  const [accessToken, setAccessToken] = useState(null);
  const [locationId, setLocationId] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(search);
    const dataParam = queryParams.get('data');

    if (dataParam) {
      try {
        const decodedData = decodeURIComponent(dataParam);
        const parsedData = JSON.parse(decodedData);
        const access_token = parsedData?.access_token || null;
        const locationId = parsedData?.locationId || null;

        setAccessToken(access_token);
        setLocationId(locationId);

        console.log('✅ access_token:', access_token);
        console.log('✅ location_id:', locationId);
      } catch (err) {
        console.error('❌ Failed to parse `data` param:', err);
      }
    } else {
      console.warn('⚠️ `data` query param not found.');
    }
  }, [search]);

  return { accessToken, locationId };
};

const LeadConnector = () => {
  const { accessToken, locationId } = useExtractTokenAndLocation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [items] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddAccountLoading, setIsAddAccountLoading] = useState(false);
  const [currentLocationId, setCurrentLocationId] = useState(null);

  const filteredItems = items
    .filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((item) => item.address.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((item) => item.city.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((item) => !selectedItems.some((selected) => selected.id === item.id));

  const handleSelectItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  const removeAccountMutation = useMutation({
    mutationFn: disconnectAccount,
    onSuccess: (data) => {
      toast.success(data.message || "Sub-account disconnected successfully!");
      // Optionally remove from state if server confirms successful delete
      setSelectedItems((prev) => prev.filter((item) => item.id !== currentLocationId));
    },
    onError: (error) => {
      toast.error("Failed to disconnect sub-account.");
    }
  });
  

  const handleRemoveItem = (id) => {
    setCurrentLocationId(id)
    removeAccountMutation.mutate(id);
  };

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

  const addNewAccountMutation = useMutation({
    mutationFn: () => {
      if (!accessToken || !locationId) {
        throw new Error("Missing access_token or location_id in URL");
      }

      return getGHLSubAccounts({ access_token: accessToken, location_id: locationId });
    },
    onSuccess: (data) => {
      setIsAddAccountLoading(false);
      if (data?.sub_accounts[0]?.location) {
        const { name, companyId, address, city, id } = data?.sub_accounts[0]?.location;
        const newAccount = {
          id: Date.now(),
          title: name,
          subtitle: companyId,
          address: address,
          city: city,
          id: id
        };
        setSelectedItems((prev) => [...prev, newAccount]);
      } else {
        toast.error("No subaccount data found.");
      }
    },
  });

  useEffect(() => {
    if (accessToken && locationId) {
      setIsAddAccountLoading(true);
      addNewAccountMutation.mutate();
    }
  }, [accessToken, locationId]);

  const mutation = useMutation({
    mutationFn: leadConnectIntegrate,
    onSuccess: (data) => {
      if (data?.auth_url) {
        window.location.href = data.auth_url;
      } else {
        toast.error("Auth URL not found");
      }
    },
    onError: (error) => {
      toast.error("Auth URL not found:", error);
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
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
                      <ListItemSubtitle>{item.address}</ListItemSubtitle>
                      <ListItemSubtitle>{item.city}</ListItemSubtitle>
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

      {isAddAccountLoading ? <LoaderContainer><ListLoader /></LoaderContainer> :
      (
        <>
      {selectedItems.length > 0 ? (
        selectedItems.map((item) => (
          <ListItem key={item.id}>
            <IconActions>
              <FiRefreshCw size={16} title="Refresh" onClick={() => handleRefreshItem(item.id)} />
              <FiX size={16} title="Remove" onClick={() => handleRemoveItem(item.id)} />
            </IconActions>
            <ListItemTitle>{item.title}</ListItemTitle>
            <ListItemSubtitle>{item.subtitle}</ListItemSubtitle>
            <ListItemSubtitle>{item.address}</ListItemSubtitle>
            <ListItemSubtitle>{item.city}</ListItemSubtitle>
          </ListItem>
        ))
      ) : (
        ""
      )}
      </>
      )}
    </CardContainer>
  );
};

export default LeadConnector;
