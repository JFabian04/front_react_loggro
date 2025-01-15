import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/ui/Layout';
import Login from './pages/Login';
import 'typeface-poppins';
import Historial from './pages/Historial';
import { Loading } from './components/loading';
import { AuthProvider, useAuth } from './hooks/authContext';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

const AppRoutes = () => {
  const { loading, data } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <RouterRoutes>
      <Route path='/' element={<Login />} />
      <Route path='/dashboard' element={<Layout data={data && data.user} />}>
        <Route index element={<Home />} />
        <Route path='historial' element={<Historial />} />
      </Route>
    </RouterRoutes>
  );
};

export default App;
