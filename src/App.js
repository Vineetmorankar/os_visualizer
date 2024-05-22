import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FCFS from "./pages/Fcfs";
import SJF from "./pages/SJF";
import Priority from "./pages/Priority";
import RoundRobin from "./pages/RoundRobin";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fcfs" element={<FCFS />} />
          <Route path="/sjf" element={<SJF />} />
          <Route path="/priority" element={<Priority />} />
          <Route path="/round_robin" element={<RoundRobin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
