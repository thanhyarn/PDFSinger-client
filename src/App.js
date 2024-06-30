import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./containers/LoginForm";
import Dashboard from "./containers/Dasnboard";
import Home from "./containers/Home";
import Encode from "./components/Encode";
import Decode from "./components/Decode";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateKey from "./components/CreateKey";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import Header from "./components/Header";

function App() {
  
  return (
    <>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/key" element={<CreateKey />}></Route>
          <Route path="/encode" element={<Encode />}></Route>
          <Route path="/decode" element={<Decode />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </>
  );
}

export default App;
