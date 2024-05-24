import React from 'react';
import GroupTab from "./component/GroupTab";
import Navlink from './component/Navlink';
import App from './App.js';
import Dashboard from './compoArgh/components/Dashboard';
import Login from './compoArgh/components/Login';
import Sign from './compoArgh/components/Sign';
import Landing from './components2/Landing';
import { useState } from "react"; 

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Routerl() {
  
  const [user, setUser] = useState(null);
  
  return (
    <Router>
      <div>
        <Navlink/>
        <div className='bg-danger'>
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="/Group" element={<GroupTab user={user}/>} />
            <Route path="/Login" element={<Login setUser={setUser}/>} />
            <Route path="/Sign" element={<Sign/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
