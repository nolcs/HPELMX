import React, { useState } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Exile from "./components/pages/Exile";

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/exile" element={<Exile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
