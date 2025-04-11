import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainDrawer from './Components/Drawer/MainDrawer';
import './App.css';
import Login from './Pages/Login/Login';
import { AuthProvider, useAuth } from './Components/Auth/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Components/Auth/SignUpForm';
import Dashboard from './Pages/Dashboard/Dashboard';
import Integrate from './Pages/ModifyBot/Integrate';
import Main from './Pages/ModifyBot/Main';
import VerifyOTP from './Components/Auth/VerifyOTP';

const queryClient = new QueryClient();

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />

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
                path="//create/modify-bot/integrate"
                element={
                  <ProtectedRoute>
                    <Integrate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="//create/modify-bot/prompt"
                element={
                  <ProtectedRoute>
                    <Main />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
