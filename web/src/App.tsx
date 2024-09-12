import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import CountryPage from "./pages/Country/CountryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/:countryCode" element={<CountryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
