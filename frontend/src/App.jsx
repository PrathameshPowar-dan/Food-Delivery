import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Settings from './pages/Setting.jsx';
import { useThemeStore } from './Context/useThemeStore.js';
import Login from './components/Login.jsx';

const App = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply the theme to the html element for DaisyUI
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App