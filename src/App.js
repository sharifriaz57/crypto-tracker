import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Header from './components/header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SingleCoin from './pages/SingleCoin';

function App() {

  return (
    <>
      <Box sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<SingleCoin />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
