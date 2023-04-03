import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import UserProfile from './pages/UserProfile';
// import Browse from './pages/Revitions/Browse';
// import Revition from './pages/Revitions/Revition';
// import RevitionData from './pages/Revitions/RevitionData';
// import Create from './pages/Revitions/Create';

import LoadingScreen from './components/LoadingScreen';

const Home = lazy(() => import('./pages/Home'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const Browse = lazy(() => import('./pages/Revitions/Browse'));
const Revition = lazy(() => import('./pages/Revitions/Revition'));
const RevitionData = lazy(() => import('./pages/Revitions/RevitionData'));
const Create = lazy(() => import('./pages/Revitions/Create'));
const Debug = lazy(() => import('./pages/Debug'));
const About = lazy(() => import('./pages/About'));


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen text={'Loading page'} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/users/:uid/profile" element={<UserProfile />} />
          <Route path='/rev/browse' element={<Browse />} />
          <Route path='/rev/create' element={<Create />} />
          <Route path='/rev/:revId/play' element={<Revition />} />
          <Route path='/rev/:revId/info' element={<RevitionData />} />
          <Route path='/debug/:uid' element={<Debug />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
