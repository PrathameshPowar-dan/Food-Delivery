import React, { useState } from 'react';
import Header from '../components/Header';
import ExMenu from '../components/ExMenu';
import FoodDisplay from '../components/FoodDisplay';
import Break from '../components/Break';

const Home = () => {
  const [category, setcategory] = useState("All");
  return (
    <div>
      <Header />
      <ExMenu category={category} setcategory={setcategory} />
      <Break />
      <FoodDisplay category={category} />
    </div>
  )
}

export default Home
