import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/Logo.png";
import bgImage from "../../assets/body/Background.png";
import HomeIcon from "../../assets/sidebarIcons/home.png";
import HomeIconA from "../../assets/sidebarIcons/homeA.png";
// import ChartIcon from "../../assets/sidebarIcons/chart.png";
// import ChartIconA from "../../assets/sidebarIcons/chartA.png";
import BillingIcon from "../../assets/sidebarIcons/billing.png";
import UsersIcon from "../../assets/sidebarIcons/users.png";
import BillingIconA from "../../assets/sidebarIcons/billingA.png";
import UsersIconA from "../../assets/sidebarIcons/usersA.png";
// import SettingIcon from "../../assets/topbarIcons/setting.png";
// import BellIcon from "../../assets/topbarIcons/bell.png";
import BotConversations from "../../assets/sidebarIcons/botConversations.png";
import BotConversationsA from "../../assets/sidebarIcons/botConversationsA.png";
import CreateUpdate from "../../assets/sidebarIcons/createUpdate.png";
import CreateUpdateA from "../../assets/sidebarIcons/CreateUpdateA.png";
import TestBot from "../../assets/sidebarIcons/test.png";
import TestBotA from "../../assets/sidebarIcons/TestA.png";
import IntegrationIcon from "../../assets/sidebarIcons/integrations.png";
import IntegrationIconA from "../../assets/sidebarIcons/IntegrationsA.png";
// import { useQuery } from "@tanstack/react-query";
// import { getDashboaedData } from "../../apis/getDashboaedData";
import { FiChevronDown, FiChevronUp, FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import { logoutUser } from "../../apis/AuthForm/logout";

const drawerWidth = 265;

const getTitleFromPath = (path) => {
  switch (path) {
    case "/dashboard":
      return "Dashboard";
    case "/bot-conversations":
      return "Bot Conversations";
    case "/create/modify-bot":
      return "Create Bot / Modify";
    case "/integrations":
      return "Integrations (GHL)";
    case "/test-bot":
      return "Test your Bot";
    case "/billing":
      return "Billing & Invoices";
    case "/users":
      return "Users";
    default:
      return "Page";
  }
};

function MainDrawer() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const firstName = sessionStorage.getItem("firstName") || "";
  const lastName = sessionStorage.getItem("lastName") || "";
  const initials = `${firstName[0] || ""}${lastName[0] || ""}`;

  // const { data } = useQuery({
  //   queryKey: ["cardData"],
  //   queryFn: getDashboaedData,
  // });

  // const currentBotNumber = data?.current_bot_number || sessionStorage.getItem("botNumber") || "";

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser(); // API call
      toast.success("User Logged Out Successfully!");
      sessionStorage.clear();
      navigate("/");
    } catch (error) {
      toast.error("Logout Failed. Please try again.");
      setIsLoggingOut(false);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const profileRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const drawer = (
    <StyledDrawerContainer>
      <LogoContainer>
        <img src={logo} alt="SellWithBot" />
      </LogoContainer>
      <LogoDivider />
      <BotNumber>{sessionStorage.getItem("botNumber") || ""}</BotNumber>
      <List>
        <ListItem disablePadding onClick={() => setMobileOpen(false)}>
          {currentPath === "/dashboard" ? (
            <ActiveItem component={Link} to="/dashboard">
              <ActiveItemIcon>
                <img src={HomeIconA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Dashboard" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/dashboard">
              <InactiveItemIcon>
                <img src={HomeIcon} alt="Icon" />
              </InactiveItemIcon>
              <ListItemText primary="Dashboard" />
            </InactiveItem>
          )}
        </ListItem>

        <ListItem disablePadding onClick={() => setMobileOpen(false)}>
          {currentPath === "/bot-conversations" ? (
            <ActiveItem component={Link} to="/bot-conversations">
              <ActiveItemIcon>
                <img src={BotConversationsA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Bot Conversations" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/bot-conversations">
              <InactiveItemIcon>
                <img src={BotConversations} alt="Icon" />
              </InactiveItemIcon>
              <ListItemText primary="Bot Conversations" />
            </InactiveItem>
          )}
        </ListItem>

        <ListItem disablePadding onClick={() => setMobileOpen(false)}>
          {currentPath === "/create/modify-bot" ? (
            <ActiveItem component={Link} to="/create/modify-bot">
              <ActiveItemIcon>
                <img src={CreateUpdateA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Create Bot / Modify" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/create/modify-bot">
              <InactiveItemIcon>
                <img src={CreateUpdate} alt="Icon" />
              </InactiveItemIcon>
              <ListItemText primary="Create Bot / Modify" />
            </InactiveItem>
          )}
        </ListItem>

        <ListItem disablePadding onClick={() => setMobileOpen(false)}>
          {currentPath === "/test-bot" ? (
            <ActiveItem component={Link} to="/test-bot">
              <ActiveItemIcon>
                <img src={TestBotA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Test Your Bot" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/test-bot">
              <InactiveItemIcon>
                <img src={TestBot} alt="Icon" />
              </InactiveItemIcon>
              <ListItemText primary="Test Your Bot" />
            </InactiveItem>
          )}
        </ListItem>

        <ListItem disablePadding onClick={() => setMobileOpen(false)}>
          {currentPath === "/integrations" ? (
            <ActiveItem component={Link} to="/integrations">
              <ActiveItemIcon>
                <img src={IntegrationIconA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Integrations (GHL)" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/integrations">
              <InactiveItemIcon>
                <img src={IntegrationIcon} alt="Icon" />
              </InactiveItemIcon>
              <ListItemText primary="Integrations (GHL)" />
            </InactiveItem>
          )}
        </ListItem>

        <ListItem disablePadding onClick={() => setMobileOpen(false)}>
          {currentPath === "/billing" ? (
            <ActiveItem component={Link} to="/billing">
              <ActiveItemIcon>
                <img src={BillingIconA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Billing & Invoices" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/billing">
              <InactiveItemIcon>
                <img src={BillingIcon} alt="Icon" />
              </InactiveItemIcon>
              <ListItemText primary="Billing & Invoices" />
            </InactiveItem>
          )}
        </ListItem>

        <ListItem disablePadding onClick={() => setMobileOpen(false)}>
          {currentPath === "/users" ? (
            <ActiveItem component={Link} to="/users">
              <ActiveItemIcon>
                <img src={UsersIconA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Users" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/users">
              <InactiveItemIcon>
                <img src={UsersIcon} alt="Icon" />
              </InactiveItemIcon>
              <ListItemText primary="Users" />
            </InactiveItem>
          )}
        </ListItem>
      </List>
    </StyledDrawerContainer>
  );

  return (
    <MainWrapper>
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          width: `calc(100% - ${drawerWidth}px - 20px)`,
          ml: `${drawerWidth}px`,
          "@media (max-width: 990px)": {
            width: "100%",
            ml: 0,
            mt: 0,
          },
          background: "none",
          boxShadow: "none",
          mt: 3,
          borderRadius: "12px",
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", p: 0, m: 0 }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 1,
                ml: 1,
                "@media (min-width: 990px)": {
                  display: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "14px",
                color: "#FFFFFF",
                fontFamily: "Mulish",
              }}
            >
              {getTitleFromPath(location.pathname)}
            </Typography>
          </Box>

          <ProfileWrapper ref={profileRef}>
            <AvatarButton onClick={handleProfileMenuToggle}>
              <InitialsCircle>{initials.toUpperCase() || "U"}</InitialsCircle>
              {isProfileMenuOpen ? (
                <FiChevronUp size={19} color="#fff" />
              ) : (
                <FiChevronDown size={19} color="#fff" />
              )}
            </AvatarButton>

            {isProfileMenuOpen && (
              <DropdownMenu>
                <ProfileInfo>
                  <AvatarCircle>{initials.toUpperCase() || "U"}</AvatarCircle>
                  <div>
                    <NameText>
                      {sessionStorage.getItem("firstName") +
                        sessionStorage.getItem("lastName") ||
                        sessionStorage.getItem("userName") ||
                        "User"}
                    </NameText>
                    <StatusText>
                      ●{" "}
                      {sessionStorage.getItem("online") === "true"
                        ? "Online"
                        : "Offline"}
                    </StatusText>
                  </div>
                </ProfileInfo>
                <LogoutButton onClick={handleLogout} disabled={isLoggingOut}>
                  {isLoggingOut ? (
                    <ListLoader />
                  ) : (
                    <>
                      <FiLogOut style={{ marginRight: "8px" }} />
                      Log out
                    </>
                  )}
                </LogoutButton>
              </DropdownMenu>
            )}
          </ProfileWrapper>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: "block",
            "@media (min-width: 990px)": {
              display: "none",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRadius: "20px",
              boxShadow: "0px 5px 14px 0px #0000000D",
              position: "fixed",
              top: 20,
              left: 20,
              bottom: 20,
              height: "auto",
              backgroundColor:
                "linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)",
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: "none",
            "@media (min-width: 990px)": {
              display: "block",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRadius: "20px",
              boxShadow: "0px 5px 14px 0px #0000000D",
              position: "fixed",
              top: 20,
              left: 20,
              bottom: 20,
              height: "auto",
              backgroundColor:
                "linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, #E0E1E2 49.52%, rgba(224, 225, 226, 0.15625) 99.04%)",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </MainWrapper>
  );
}

export default MainDrawer;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoDivider = styled.div`
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(224, 225, 226, 0) 0%,
    #e0e1e2 49.52%,
    rgba(224, 225, 226, 0.15625) 99.04%
  );
  height: 1px;
`;

const StyledDrawerContainer = styled.div`
  height: 100%;
  background: #ffffff;
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ActiveItem = styled(ListItemButton)`
  background: #ffffff;
  box-shadow: 0px 5px 14px 0px #0000000d;
  border: 1px solid
    linear-gradient(
      90deg,
      rgba(224, 225, 226, 0) 0%,
      #e0e1e2 49.52%,
      rgba(224, 225, 226, 0.15625) 99.04%
    );
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 10px;

  .css-rizt0-MuiTypography-root {
    color: #2d3748;
    font-size: 12px;
    font-weight: 700;
    font-family: "Mulish";
  }
`;

const InactiveItem = styled(ListItemButton)`
  display: flex;
  align-items: center;
  gap: 10px;

  .css-rizt0-MuiTypography-root {
    color: #a0aec0;
    font-size: 12px;
    font-weight: 700;
    font-family: "Mulish";
  }
`;

const ActiveItemIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3182ce;
  border-radius: 8px;
`;

const InactiveItemIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: #3182ce;
  font-size: 16px;
`;

const MainWrapper = styled.div`
  display: flex;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100% 414px; /* Full width, fixed height */
  background-attachment: fixed;
  min-height: 414px;

  @media (max-width: 990px) {
    flex-direction: column;
  }
`;

const BotNumber = styled.h2`
  color: #3182ce;
  font-size: 16px;
  text-align: center;
`;

const ProfileWrapper = styled.div`
  position: relative;
  margin-right: 20px;
`;

const AvatarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const InitialsCircle = styled.div`
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  color: #3182ce;
  border-radius: 50%;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: "Mulish";
`;

const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 40px;
  background: #ffffff;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  width: 250px;
  z-index: 1000;
  padding: 12px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 10px;
`;

const AvatarCircle = styled(InitialsCircle)`
  width: 36px;
  height: 36px;
  font-size: 16px;
  background-color: #3182ce;
  color: #ffffff;
`;

const NameText = styled.div`
  font-weight: bold;
  color: #2d3748;
  font-size: 14px;
`;

const StatusText = styled.div`
  font-size: 12px;
  color: green;
`;

const LogoutButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: #2d3748;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  padding: 8px 0;
  font-family: "Mulish";
  display: flex;
  align-items: center;
  padding: 12px 0 5px 5px;

  &:hover {
    color: #3182ce;
  }
`;

const ListLoader = styled.div`
  border: 4px solid #3182ce;
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 18px;
  height: 18px;
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
