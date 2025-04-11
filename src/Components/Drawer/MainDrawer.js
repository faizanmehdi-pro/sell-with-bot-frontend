import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BuildIcon from '@mui/icons-material/Build';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Logout } from '@mui/icons-material';
import styled from 'styled-components';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { toast } from 'react-toastify';

const topbarColor = '#1976d2';
const inactiveColor = '#000';
const drawerWidth = 290;

const getTitleFromPath = (path) => {
  switch (path) {
    case '/dashboard':
      return 'Dashboard';
    case '/create/modify-bot':
      return 'Create/Modify Bot';
    case '/create/modify-bot/integrate':
      return 'Integrate';
    case '/create/modify-bot/prompt':
      return 'Prompt';
    default:
      return 'Page';
  }
};

function MainDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [modifyBotOpen, setModifyBotOpen] = React.useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    toast.success("User Logout Successfully!")
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleModifyBotToggle = () => {
    setModifyBotOpen(!modifyBotOpen);
  };

  const drawer = (
    <div>
      <Toolbar>
        <LogoContainer>
          <h1>Sell with Bot</h1>
        </LogoContainer>
      </Toolbar>
      <Divider />
      <List>
        {/* Dashboard Link */}
        <ListItem key="dashboard" disablePadding>
          <ListItemButton component={Link} to="/dashboard" sx={{ color: currentPath === '/dashboard' ? topbarColor : inactiveColor }}>
            <ListItemIcon sx={{ color: currentPath === '/dashboard' ? topbarColor : inactiveColor }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Modify Bot Dropdown */}

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleModifyBotToggle}
            sx={{ color: inactiveColor }}
          >
            <ListItemIcon sx={{ color: inactiveColor }}>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Create / Modify Bot" />
            {modifyBotOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        {/* Sublinks for Modify Bot */}
        {modifyBotOpen && (
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton component={Link} to="/create/modify-bot/integrate" sx={{ color: currentPath === '/create/modify-bot/integrate' ? topbarColor : inactiveColor }}>
              <ListItemIcon sx={{ color: currentPath === '/create/modify-bot/integrate' ? topbarColor : inactiveColor }}>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <ListItemText primary="Integrate" />
            </ListItemButton>

            <ListItemButton component={Link} to="/create/modify-bot/prompt" sx={{ color: currentPath === '/create/modify-bot/prompt' ? topbarColor : inactiveColor }}>
              <ListItemIcon sx={{ color: currentPath === '/create/modify-bot/prompt' ? topbarColor : inactiveColor }}>
                <ChatBubbleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Prompt" />
            </ListItemButton>
          </List>
        )}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, backgroundColor: topbarColor }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {getTitleFromPath(location.pathname)}
          </Typography>
          <Box sx={{ flexGrow: 0, ml: 'auto' }}>
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout} sx={{ textAlign: 'center', color: '#fff' }}>
                <Logout />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainDrawer;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #007bff;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 2px 10px rgba(0, 123, 255, 0.5);
  }
`;
