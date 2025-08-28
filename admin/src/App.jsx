import React from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Order from './pages/Order.jsx'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const url = "http://localhost:3000";
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url}/>} />
          <Route path="/orders" element={<Order url={url} />} />
        </Routes>
      </div>
    </>
  )
}

export default App