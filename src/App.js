import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainDrawer from "./Components/Drawer/MainDrawer";
import Login from "./Pages/Login/Login";
import { AuthProvider, useAuth } from "./Components/Auth/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./Components/Auth/SignUpForm";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Integrate from "./Pages/ModifyBot/Integrate";
import Main from "./Pages/ModifyBot/Main";
import VerifyOTP from "./Components/Auth/VerifyOTP";
import MessageTable from "./Components/Dashboard/MessageTable";
import TestBot from "./Pages/ModifyBot/TestBot";
import GlobalStyles from "./styles/GlobalStyles";
import LoginAdmin from "./Pages/SuperAdmin/Login/LoginAdmin";
import AdminDrawer from "./Components/SuperAdmin/Drawer/AdminDrawer";
import SuperAdminDashboard from "./Pages/SuperAdmin/Dashboard/Dashboard";
import { useAdminAuth } from "./Components/SuperAdmin/Auth/AuthContext";
import { AdminAuthProvider } from "./Components/SuperAdmin/Auth/AuthContext";
import Accounts from "./Pages/SuperAdmin/Accounts/Accounts";
import LoginAgency from "./Pages/Agency/Login/LoginAgency";
import { AgencyAuthProvider, useAgencyAuth } from "./Components/Agency/Auth/AuthContext";
import AgencyDrawer from "./Components/Agency/Drawer/AgencyDrawer";
import AgencyDashboard from "./Pages/Agency/Dashboard/Dashboard";
import SubAccounts from "./Pages/Agency/Accounts/SubAccounts";
import AgencyBilling from "./Pages/Agency/Billing/AgencyBilling";
import AgencyUsers from "./Pages/Agency/Users/Users";
import AgencyIntegrate from "./Pages/Agency/Integrate/Integrate";
import AdminBilling from "./Pages/SuperAdmin/Billing/Billing";
import Billing from "./Pages/Billing/Billing";
import AdminUsers from "./Pages/SuperAdmin/Users/Users";
import Users from "./Pages/Users/Users";

const queryClient = new QueryClient();

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? children : <Navigate to="/super-admin" replace />;
};


const ProtectedAgencyRoute = ({ children }) => {
  const { isAuthenticated } = useAgencyAuth();
  return isAuthenticated ? children : <Navigate to="/agency" replace />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <AuthProvider>
        <AdminAuthProvider>
          <AgencyAuthProvider>
          <Router>
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
              {/* Public Route */}
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />

              <Route path="/super-admin" element={<LoginAdmin />} />
              
              <Route path="/agency" element={<LoginAgency />} />

              {/* Protected Routes wrapped in MainDrawer */}
              <Route element={<MainDrawer />}>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute> 
                  }
                />
                <Route
                  path="/bot-conversations"
                  element={
                    <ProtectedRoute>
                      <MessageTable />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/integrations"
                  element={
                    <ProtectedRoute>
                      <Integrate />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create/modify-bot"
                  element={
                    <ProtectedRoute>
                      <Main />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/test-bot"
                  element={
                    <ProtectedRoute>
                      <TestBot />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/billing"
                  element={
                    <ProtectedRoute>
                      <Billing />
                    </ProtectedRoute> 
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute> 
                  }
                />
              </Route>

              {/* Admin Dashboard Drawer */}
              <Route element={<AdminDrawer />}>
                <Route
                  path="/super-admin-dashboard"
                  element={
                    <ProtectedAdminRoute>
                      <SuperAdminDashboard />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/super-admin-accounts"
                  element={
                    <ProtectedAdminRoute>
                      <Accounts />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/super-admin-billing"
                  element={
                    <ProtectedAdminRoute>
                      <AdminBilling />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/super-admin-users"
                  element={
                    <ProtectedAdminRoute>
                      <AdminUsers />
                    </ProtectedAdminRoute>
                  }
                />
              </Route>
              
              {/* Agency Dashboard Drawer */}
              <Route element={<AgencyDrawer />}>
                <Route
                  path="/agency-dashboard"
                  element={
                    <ProtectedAgencyRoute>
                      <AgencyDashboard />
                    </ProtectedAgencyRoute>
                  }
                />
                <Route
                  path="/agency-sub-accounts"
                  element={
                    <ProtectedAgencyRoute>
                      <SubAccounts />
                    </ProtectedAgencyRoute>
                  }
                />
                <Route
                  path="/agency-billing"
                  element={
                    <ProtectedAgencyRoute>
                      <AgencyBilling />
                    </ProtectedAgencyRoute>
                  }
                />
                <Route
                  path="/agency-users"
                  element={
                    <ProtectedAgencyRoute>
                      <AgencyUsers />
                    </ProtectedAgencyRoute>
                  }
                />
                <Route
                  path="/agency-integrate"
                  element={
                    <ProtectedAgencyRoute>
                      <AgencyIntegrate />
                    </ProtectedAgencyRoute>
                  }
                />
              </Route>
            </Routes>
          </Router>
          </AgencyAuthProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
