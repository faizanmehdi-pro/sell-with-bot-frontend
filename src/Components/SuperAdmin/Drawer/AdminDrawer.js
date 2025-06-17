import * as React from "react";
import { Link, useLocation } from "react-router-dom";
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
import logo from "../../../assets/SuperAdmin/images/logo.png";
import bgImage from "../../../assets/SuperAdmin/body/Background.png";
import HomeIcon from "../../../assets/SuperAdmin/sidebarIcons/home.png";
import HomeIconA from "../../../assets/SuperAdmin/sidebarIcons/homeA.png";
import ChartIcon from "../../../assets/SuperAdmin/sidebarIcons/chart.png";
import ChartIconA from "../../../assets/SuperAdmin/sidebarIcons/chartA.png";
import BillingIcon from "../../../assets/SuperAdmin/sidebarIcons/billing.png";
import UsersIcon from "../../../assets/SuperAdmin/sidebarIcons/users.png";
import BillingIconA from "../../../assets/SuperAdmin/sidebarIcons/billingA.png";
import UsersIconA from "../../../assets/SuperAdmin/sidebarIcons/usersA.png";
import SettingIcon from "../../../assets/SuperAdmin/topbarIcons/setting.png";
import BellIcon from "../../../assets/SuperAdmin/topbarIcons/bell.png";

const drawerWidth = 265;

const getTitleFromPath = (path) => {
  switch (path) {
    case "/super-admin-dashboard":
      return "Dashboard";
    case "/super-admin-accounts":
      return "Accounts";
    case "/super-admin-billing":
      return "Billing & Invoices";
    case "/super-admin-users":
      return "Users";
    default:
      return "Page";
  }
};

function AdminDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <StyledDrawerContainer>
      <LogoContainer>
        <img src={logo} alt="SellWithBot" />
      </LogoContainer>
      <LogoDivider />
      <List>
        <ListItem disablePadding>
          {currentPath === "/super-admin-dashboard" ? (
            <ActiveItem component={Link} to="/super-admin-dashboard">
              <ActiveItemIcon>
                <img src={HomeIconA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Dashboard" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/super-admin-dashboard">
              <InactiveItemIcon>
                <img src={HomeIcon} alt="Icon" />
              </InactiveItemIcon>
              <ListItemText primary="Dashboard" />
            </InactiveItem>
          )}
        </ListItem>

        <ListItem disablePadding>
          {currentPath === "/super-admin-accounts" ? (
            <ActiveItem component={Link} to="/super-admin-accounts">
              <ActiveItemIcon>
                <img src={ChartIconA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Accounts" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/super-admin-accounts">
              <InactiveItemIcon>
                <img src={ChartIcon} alt="Icon" />
              </InactiveItemIcon>
              <ListItemText primary="Accounts" />
            </InactiveItem>
          )}
        </ListItem>

        <ListItem disablePadding>
          {currentPath === "/super-admin-billing" ? (
            <ActiveItem component={Link} to="/super-admin-billing">
              <ActiveItemIcon>
                <img src={BillingIconA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Billing & Invoices" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/super-admin-billing">
              <InactiveItemIcon>
                <img src={BillingIcon} alt="Icon" />
              </InactiveItemIcon>
              <ListItemText primary="Billing & Invoices" />
            </InactiveItem>
          )}
        </ListItem>

        <ListItem disablePadding>
          {currentPath === "/super-admin-users" ? (
            <ActiveItem component={Link} to="/super-admin-users">
              <ActiveItemIcon>
                <img src={UsersIconA} alt="Icon" />
              </ActiveItemIcon>
              <ListItemText primary="Users" />
            </ActiveItem>
          ) : (
            <InactiveItem component={Link} to="/super-admin-users">
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
            mt: 0
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

          <Box sx={{ display: "flex", gap: 2, pr: 2 }}>
            <img src={SettingIcon} alt="Icon" />
            <img src={BellIcon} alt="Icon" />
          </Box>
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

export default AdminDrawer;

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
