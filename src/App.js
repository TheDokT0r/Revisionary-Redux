import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import Browse from './pages/Revitions/Browse';
import Revition from './pages/Revitions/Revition';
import RevitionData from './pages/Revitions/RevitionData';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/users/:uid/profile" element={<UserProfile />} />
        <Route path='/rev/browse' element={<Browse />} />
        <Route path='/rev/:revId/play' element={<Revition />} />
        <Route path='/rev/:revId/info' element={<RevitionData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
