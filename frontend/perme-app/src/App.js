import React from 'react';
import Navbar from '../src/components/Header/Navbar';
import AppRoutes from './routes/AppRoutes';
import {useAuth} from './contexts/auth';

function App() {
  const { isLoggedOn } = useAuth();

  return (
    <>
      {isLoggedOn && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;
