import React, { useState } from "react";
import styled from "styled-components";
import {
  // FaRegEdit,
  FaRegTrashAlt,
  FaArrowRight,
  FaChevronDown,
  FaArrowDown,
} from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { LuSearch } from "react-icons/lu";
import { MdOutlineMarkChatUnread } from "react-icons/md";
import { TbArrowsRightLeft } from "react-icons/tb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bar from "../../../assets/SuperAdmin/accounts/bar.png";
import CreateSubAccount from "./CreateSubAccount";
import DeleteSubAccountModal from "./DeleteSubAccount";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAgencySubAccountsList } from "../../../apis/Agency/Accounts/getAgencySubAccountsList";
import { toast } from "react-toastify";
import { switchToAgencyAccount } from "../../../apis/Agency/Accounts/switchToAgencyAccount";
import { useAuth } from "../../Auth/AuthContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 10px 20px 40px;

  @media (max-width: 990px) {
    padding: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1150px) {
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

const DateFilter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border-radius: 5px;
  width: 300px;
  height: 42px;
  color: #969ba0;
  font-family: "Poppins", sans-serif;

  .react-datepicker-wrapper {
    width: 84px;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 0;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    color: #969ba0;
    font-size: 13px;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
  }

  @media (max-width: 550px) {
    width: 100%;
  }
`;

const SearchSortBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 550px) {
    width: 80%;
    flex-direction: column-reverse;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const SortSelects = styled.div`
  display: flex;
  align-items: center;
`;

const SortSelect = styled.div`
  background: white;
  color: #212121;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-family: "Poppins", sans-serif;
  font-size: 13px;
  font-weight: 400;
  position: relative;
  cursor: pointer;
  width: 112px;
  height: 42px;
  padding: 0 15px;
  border-top-left-radius: ${(props) => (props.rounded ? "5px" : "0")};
  border-bottom-left-radius: ${(props) => (props.rounded ? "5px" : "0")};
  border-top-right-radius: ${(props) => (props.rounded ? "0" : "5px")};
  border-bottom-right-radius: ${(props) => (props.rounded ? "0" : "5px")};
`;

const SearchWrapper = styled.div`
  width: 258px;
  height: 42px;
  display: flex;
  align-items: center;
  gap: 20px;
  background: #ffffff;
  border-radius: 5px;
  padding: 0 20px;
  gap: 8px;
  border: 1px solid #d6d6d6;

  @media (max-width: 550px) {
    width: 100%;
  }
`;

const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  background: none;
  color: #969ba0;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 13px;
  width: 173px;

  &::placeholder {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 13px;
    color: #969ba0;
  }

  @media (max-width: 550px) {
    width: 90%;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  background: white;
  border: 1px solid #d0d5dd;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
  width: 100%;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  color: #344054;
  cursor: pointer;

  &:hover {
    background-color: #f0f2f5;
  }
`;

const Main = styled.div`
  background: #ffffff;
  padding: 20px 30px;
  box-shadow: 0px 4px 3px -2px #0000000f;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 10px;

  @media (max-width: 550px) {
    gap: 20px;
    padding: 20px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 550px) {
    grid-gap: 20px;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #e6e7e9;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;

  @media (max-width: 550px) {
    gap: 20px;
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 20px;
`;

const CardTopLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;

  @media (max-width: 420px) {
    margin-top: 0;
  }
`;

const CardTopCenter = styled.div`
  display: flex;
  align-items: start;
  gap: 105px;

  @media (max-width: 550px) {
    gap: 40px;
  }

  @media (max-width: 420px) {
    flex-direction: column;
    gap: 20px;
    margin-top: 15px;
  }
`;

const CardTopCenterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CardTopCenterInfoHeading = styled.h3`
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #212121;
`;

const CardTopCenterInfoLeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CardTopCenterInfoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
`;

const CardTopCenterInfoRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: #cce6ff;
  width: 68px;
  height: 23px;
  border-radius: 15px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: #3182ce;
`;

const Label = styled.div`
  color: #212121;
  font-size: 16px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
`;

const InfoLine = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #212121;
  font-family: "Poppins", sans-serif;

  span {
    font-size: 14px;
    font-weight: 400;
  }
`;

const IconGroup = styled.button`
  display: flex;
  align-items: center;
  color: #828894;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;

  @media (max-width: 500px) {
    position: absolute;
    left: 15px;
    bottom: 10px;
    gap: 10px;
  }
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e6e7e9;
`;

const SwitchButton = styled.button`
  background: white;
  font-family: "Mulish", sans-serif;
  color: #3182ce;
  border: 1px solid #e6e7e9;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  width: 205px;
  height: 42px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  @media (max-width: 420px) {
    margin-right: 15px;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e6e7e9;
  gap: 10px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  font-size: 13px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  border: none;
  outline: none;
  background: none;
  border-bottom: ${({ active }) => (active ? "1px solid #3182ce" : "none")};
  color: ${({ active }) => (active ? "#3182ce" : "#212121")};
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    color: #3182ce;
  }

  @media (max-width: 420px) {
    padding: 10px 5px;
  }
`;

const ListLoader = styled.div`
  border: 4px solid #3182ce;
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  display: inline-block;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SubAccountComponent = () => {
  const { login } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showSortBy, setShowSortBy] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState("Sort By");
  const [selectedOrder, setSelectedOrder] = useState("A - Z");
  const [tab, setTab] = useState("list");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeSwitchId, setActiveSwitchId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["agency-sub-accounts"],
    queryFn: () => getAgencySubAccountsList(),
    keepPreviousData: true,
  });

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const switchMutation = useMutation({
    mutationFn: (userId) => switchToAgencyAccount(userId),
    onMutate: (userId) => {
      setActiveSwitchId(userId); // show loader for the selected ID
    },
    onSuccess: (resp) => {
      sessionStorage.setItem("authToken", resp?.user_token);
      sessionStorage.setItem("userName", resp?.full_name);
      sessionStorage.setItem("firstName", resp?.first_name);
      sessionStorage.setItem("lastName", resp?.last_name);
      sessionStorage.setItem("online", resp?.online);
      sessionStorage.setItem("botNumber", resp?.bot_number);
      sessionStorage.setItem("switchedSubAccount", "true");
      login(resp?.user_token);
      // window.open("http://localhost:3000/dashboard", "_self");
      // navigate("/dashboard");
      window.open(resp?.url_data, "_self");
    },
    onError: () => {
      toast.error("Failed to Switch Sub-Account");
    },
    onSettled: () => {
      setActiveSwitchId(null); // reset loader
    },
  });

  return (
    <Container>
      <Header>
        <DateFilter>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            popperPlacement="bottom-start"
          />
          <FaArrowRight />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            popperPlacement="bottom-start"
          />

          <FiCalendar />
        </DateFilter>

        <SearchSortBar>
          <SearchWrapper>
            <LuSearch size={22} color="#7E7E7E" />
            <StyledSearchInput placeholder="Search by Sub-Accounts..." />
          </SearchWrapper>
          <SortSelects>
            <SortSelect rounded onClick={() => setShowSortBy(!showSortBy)}>
              {selectedSortBy} <FaChevronDown />
              {showSortBy && (
                <Dropdown>
                  {["Client", "Bot ID", "Token"].map((option) => (
                    <DropdownItem
                      key={option}
                      onClick={() => {
                        setSelectedSortBy(option);
                        setShowSortBy(false);
                      }}
                    >
                      {option}
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </SortSelect>

            <SortSelect onClick={() => setShowOrder(!showOrder)}>
              {selectedOrder} <FaChevronDown />
              {showOrder && (
                <Dropdown>
                  {["A - Z", "Z - A"].map((option) => (
                    <DropdownItem
                      key={option}
                      onClick={() => {
                        setSelectedOrder(option);
                        setShowOrder(false);
                      }}
                    >
                      {option}
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </SortSelect>
          </SortSelects>
        </SearchSortBar>
      </Header>

      <Main>
        <Tabs>
          <TabButton active={tab === "list"} onClick={() => setTab("list")}>
            Sub-Accounts
          </TabButton>
          <TabButton active={tab === "create"} onClick={() => setTab("create")}>
            Create Sub-Account
          </TabButton>
        </Tabs>
        {tab === "list" ? (
          <CardGrid>
            {isLoading ? (
              <ListLoader />
            ) : isError ? (
              <p>Error Fetching Sub Accounts</p>
            ) : (
              data?.results?.map((account, index) => (
                <Card key={index}>
                  <CardTop>
                    <CardTopLeft>
                      <Label>Client name : {account.full_name}</Label>
                      <InfoLine>
                        Bot ID : <span>{account.bot_number || "N/A"}</span>
                      </InfoLine>
                      <CardTopCenter>
                        <CardTopCenterInfo>
                          <CardTopCenterInfoHeading>
                            Number of chats
                          </CardTopCenterInfoHeading>
                          <CardTopCenterInfoLeftContainer>
                            <CardTopCenterInfoLeft>
                              <MdOutlineMarkChatUnread />
                              {account.chat_count}
                            </CardTopCenterInfoLeft>
                            <CardTopCenterInfoRight>
                              <FaArrowDown />
                              {account.monthly_chat_percentage}
                            </CardTopCenterInfoRight>
                          </CardTopCenterInfoLeftContainer>
                        </CardTopCenterInfo>
                        <CardTopCenterInfo>
                          <CardTopCenterInfoHeading>
                            Usage of token
                          </CardTopCenterInfoHeading>
                          <CardTopCenterInfoLeftContainer>
                            <CardTopCenterInfoLeft>
                              <img src={bar} alt="icon" />
                              {account.token_used}
                            </CardTopCenterInfoLeft>
                            <CardTopCenterInfoRight>
                              <FaArrowDown />
                              {account.monthly_token_percentage}
                            </CardTopCenterInfoRight>
                          </CardTopCenterInfoLeftContainer>
                        </CardTopCenterInfo>
                      </CardTopCenter>
                    </CardTopLeft>
                    <IconGroup onClick={() => handleDelete(account)}>
                      <FaRegTrashAlt fontSize={19} />
                    </IconGroup>
                  </CardTop>
                  <CardBottom>
                    <SwitchButton
                      onClick={() => switchMutation.mutate(account.id)}
                      disabled={activeSwitchId === account.id}
                    >
                      {activeSwitchId === account.id ? (
                        <ListLoader
                          style={{
                            width: "20px",
                            height: "20px",
                            borderWidth: "2px",
                          }}
                        />
                      ) : (
                        <>
                          <TbArrowsRightLeft fontSize={20} /> Switch to
                          Sub-Account
                        </>
                      )}
                    </SwitchButton>
                  </CardBottom>
                </Card>
              ))
            )}
          </CardGrid>
        ) : (
          <CreateSubAccount setTab={setTab} />
        )}
      </Main>
      <DeleteSubAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        user={selectedUser}
      />
    </Container>
  );
};

export default SubAccountComponent;
