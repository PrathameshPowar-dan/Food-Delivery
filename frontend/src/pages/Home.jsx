import React, { useState } from 'react'
import Header from '../components/Header'
import ExMenu from '../components/ExMenu'

const Home = () => {
  const [Category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExMenu Category={Category} setCategory={setCategory} />
    </div>
  )
}

export default Home
