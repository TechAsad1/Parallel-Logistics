import React, { useState } from 'react';
import "./styles/style.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Layout, Menu, Button, Modal } from 'antd';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import Export from './export/Export.jsx';
import NewJob from './export/NewJob.jsx';
import Jobs from './export/Jobs.jsx';
import Users from './users/Users.jsx';
import JobDetail from './export/JobDetail.jsx';
import EditJob from './export/EditJob.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import Invoice from './export/Invoice.jsx';
import Customers from './customer/Customers.jsx';
import Login from './Login/Login.jsx';
import AdminDashboard from './AdminDashboard/AdminDashboard.jsx';
import ProtectedRoute from "./ProtectedRoute.jsx";
import PageNotFound from "./PageNotFound.jsx";

const Home = () => {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/Login" element={<Login />} />

        {/* Protected */}
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/AdminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/Job" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/AddJob" element={<ProtectedRoute><NewJob /></ProtectedRoute>} />
        <Route path="/EditJob/:id" element={<ProtectedRoute><EditJob /></ProtectedRoute>} />
        <Route path="/JobDetail/:id" element={<ProtectedRoute><JobDetail /></ProtectedRoute>} />
        <Route path="/User" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/Customer" element={<ProtectedRoute><Customers /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Outlet />
    </>
  );
};
export default Home;