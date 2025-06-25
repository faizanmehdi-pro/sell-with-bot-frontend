import React, { useEffect } from 'react';
import DashboardComponents from '../../Components/Dashboard/DashboardComponents';

const Dashboard = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userToken = urlParams.get('user_token');
    console.log("urlT", userToken)

    if (userToken) {
      sessionStorage.setItem('authToken', userToken);
    }
  }, []);


  return <DashboardComponents />;
};

export default Dashboard;
