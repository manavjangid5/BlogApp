import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {Header} from './components';
import {Footer} from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  let bgColor = "#C6F6D5";
  const currTime = new Date();
  const targetTime = new Date();
  targetTime.setHours(17, 0, 0, 0); 

  if (currTime.getTime() >= targetTime.getTime()) {
    bgColor="#333333";
  }
  
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between' style={{backgroundColor: `${bgColor}`}}>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <div>Loading...</div>;
}

export default App;