import React, { useState } from 'react';
import Header from '../components/Header';
import ExMenu from '../components/ExMenu';
import FoodDisplay from '../components/FoodDisplay';
import Break from '../components/Break';

const Home = () => {
  const [Category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExMenu Category={Category} setCategory={setCategory} />
      <Break />
      <FoodDisplay Category={Category} />
    </div>
  )
}

export default Home
