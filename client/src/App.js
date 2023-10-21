import { Route,Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Layout from "./Layout";
import Home from "./components/Home";
import Spin from './components/Spin'
import Register from "./components/Register";
import Header from "./Header";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
function App() {
  const [spin,setSpin]=useState(true);
  axios.defaults.withCredentials=true;
  useEffect(() => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      setSpin(false);
    }, 2000); // Set a time in milliseconds to determine when to stop showing the spinner
  }, []);


  return (
    

    <UserContextProvider  >
    <Routes>
      <Route path="/" element={<Layout></Layout>}  >
        <Route index element={<Home/>}/>
        
        {spin ? (
          <Route path="/login" element={<Spin />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        <Route path="/register" element={<Register></Register>} ></Route>
        
      </Route>
      
    </Routes>
     </UserContextProvider>
  );
}
export default App;

