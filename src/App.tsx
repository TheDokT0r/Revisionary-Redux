import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import { io } from 'socket.io-client';
import verifyConnection from './api/UserMannagement/verifyConnection';

const Home = lazy(() => import('./pages/Home'));
const UserProfile = lazy(() => import('./pages/(UserComponents)/UserProfile'));
const Signup = lazy(() => import('./pages/(UserComponents)/Signup'));
const Login = lazy(() => import('./pages/(UserComponents)/Login'));
const Browse = lazy(() => import('./pages/(Revisions)/Browse'));
// const Revision = lazy(() => import('./pages/(Revisions)/Revision'));
const Revision = lazy(() => import('./pages/(Revisions)/PlayRevision'));
const RevisionData = lazy(() => import('./pages/(Revisions)/RevisionData'));
const Create = lazy(() => import('./pages/(Revisions)/Create'));
const Debug = lazy(() => import('./pages/Debug'));
const About = lazy(() => import('./pages/About'));
const RevisionPreview = lazy(() => import('./pages/(Revisions)/RevisionPreview'));
const FriendsList = lazy(() => import('./pages/(UserComponents)/FriendsList'));
const EditProfile = lazy(() => import('./pages/(UserComponents)/EditProfile'));
const LoadingScreen = lazy(() => import('./components/LoadingScreen'));


function App() {
  const isLogged = async () => {
    return await verifyConnection();
  }

  useEffect(() => {
    if (!isLogged()) {
      console.log('Invalid token');
      return;
    }

    const socket = io(
      process.env.REACT_APP_SERVER_URL || 'http://localhost:4000',
      {
        query: {
          token: localStorage.getItem('token')
        }
      });


    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('disconnect', () => {
      console.log('disconnected');
    });
    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen text={'Loading page'} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            {/* <Route path="/users/:uid/profile" element={<UserProfile />} />  */}
            <Route path='/u/:uid/profile' element={<UserProfile />} />  {/*New user routing system*/}
            <Route path='/u/:uid/edit' element={<EditProfile />} />
            <Route path='/u/:uid/friends' element={<FriendsList />} />
            <Route path='/rev/browse' element={<Browse />} />
            <Route path='/rev/create' element={<Create />} />
            <Route path='/rev/:revId/play' element={<Revision />} />
            <Route path='/rev/:revId/info' element={<RevisionData />} />
            <Route path='/rev/:revId/prev' element={<RevisionPreview />} />
            <Route path='/debug/:uid' element={<Debug />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
