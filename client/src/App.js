import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Mixer from "./pages/Mixer/Mixer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mixer" element={<Mixer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
