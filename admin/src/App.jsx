import React from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Order from './pages/Order.jsx'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </div>
    </>
  )
}

export default App