import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Lead from "./pages/Dashboard/Lead";
import Developer from "./pages/Dashboard/Developer";
import NotFound from "./pages/NotFound";
import Layout from "./hocs/Layout";
import LeadDetail from "./pages/Dashboard/LeadDetail";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard/lead" element={<Lead />} />
        <Route path="/dashboard/lead/:id" element={<LeadDetail />} />
        <Route path="/dashboard/developer" element={<Developer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
