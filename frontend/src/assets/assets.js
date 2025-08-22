// src/menu_list.js

import Bread from "../assets/BreadandButter.jpg";
import Brownie from "../assets/Brownie.jpg";
import Burger from "../assets/Burger.jpg";
import CheesyPasta from "../assets/CheesyPasta.jpg";
import ChocoCake from "../assets/ChocoCake.jpg";
import Churo from "../assets/Churo.jpg";
import FishChips from "../assets/FishandChips.jpg";
import FriedFish from "../assets/FriedFish.jpg";
import FriedRice from "../assets/FriedRice.jpg";
import Fries from "../assets/Fries.jpg";
import FrostedDonuts from "../assets/FrostedDonuts.jpg";
import MiniPizza from "../assets/MiniPizza.jpg";
import Noodles from "../assets/Noodles.jpg";
import Pancakes from "../assets/Pancakes.jpg";
import PizzaSet from "../assets/PizzaSet.jpg";
import Ramen from "../assets/Ramen.jpg";
import Onigiri from "../assets/Onigiri.jpg";
import Sushi from "../assets/Sushi.jpg";
import Takoyaki from "../assets/Takoyaki.jpg";
import Bento from "../assets/Bento.jpg";
import Taco from "../assets/Taco.jpg";
import Enchiladas from "../assets/Enchiladas.jpg";

export const menu_list = [
  { 
    dish_name: "American", 
    dish_image: "https://media.istockphoto.com/id/998309062/photo/burger-with-beef-and-cheese.jpg?s=612x612&w=0&k=20&c=gsS00tWuoGp0_PQNEIIRII-qsCr42TSRujwBzP7P3Ls=" 
  },
  { 
    dish_name: "Italian", 
    dish_image: "https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=" 
  },
  { 
    dish_name: "Japanese", 
    dish_image: "https://media.istockphoto.com/id/1555947107/photo/set-of-sushi-and-maki.jpg?s=612x612&w=0&k=20&c=Tdt7UyRfO-JERN_SXIdf-l8uhD_dVDyH-xzXYh2Q5-Y=" 
  },
  { 
    dish_name: "Mexican", 
    dish_image: "https://media.istockphoto.com/id/614313140/photo/soft-beef-tacos-with-fries.jpg?s=612x612&w=0&k=20&c=KxBKdcWFKWCQwLWiil-Rgvlpl9l8SZXwkvjnCiWcia8=" 
  },
  { 
    dish_name: "Desserts", 
    dish_image: "https://media.istockphoto.com/id/1456234806/photo/mango-ice-cream-served-in-cup-isolated-on-grey-background-top-view-of-indian-and-bangladesh.jpg?s=612x612&w=0&k=20&c=Uks87rmzZT5tQtD48aRG9S-EUqSBTlAlkpOKgLUlIe4=" 
  },
];

export const food_list = [
  {
    _id: "1",
    name: "Bread & Butter",
    image: Bread,
    price: 5.99,
    description: "A classic combination of bread and butter.",
    Category: "American"
  },
  {
    _id: "2",
    name: "Brownie",
    image: Brownie,
    price: 3.99,
    description: "A rich chocolate brownie.",
    Category: "Desserts"
  },
  {
    _id: "3",
    name: "Burger",
    image: Burger,
    price: 8.99,
    description: "A juicy beef burger with cheese.",
    Category: "American"
  },
  {
    _id: "4",
    name: "Cheesy Pasta",
    image: CheesyPasta,
    price: 7.99,
    description: "Creamy pasta with cheese.",
    Category: "Italian"
  },
  {
    _id: "5",
    name: "Choco Cake",
    image: ChocoCake,
    price: 4.99,
    description: "A rich chocolate cake.",
    Category: "Desserts"
  },
  {
    _id: "6",
    name: "Churros",
    image: Churo,
    price: 3.49,
    description: "Delicious fried dough pastries.",
    Category: "Desserts"
  },
  {
    _id: "7",
    name: "Fried Rice",
    image: FriedRice,
    price: 6.99,
    description: "A flavorful mix of rice and vegetables.",
    Category: "Mexican"
  },
  {
    _id: "8",
    name: "Fries",
    image: Fries,
    price: 2.99,
    description: "Crispy golden fries.",
    Category: "American"
  },
  {
    _id: "9",
    name: "Fish and Chips",
    image: FishChips,
    price: 9.99,
    description: "Crispy fish and chips.",
    Category: "American"
  },
  {
    _id: "10",
    name: "Fried Fish",
    image: FriedFish,
    price: 8.99,
    description: "Crispy fried fish with tartar sauce.",
    Category: "American"
  },
  {
    _id: "11",
    name: "Sushi",
    image: Sushi,
    price: 12.99,
    description: "Fresh sushi rolls with a variety of fillings.",
    Category: "Japanese"
  },
  {
    _id: "12",
    name: "Takoyaki",
    image: Takoyaki,
    price: 9.99,
    description: "Delicious octopus balls drizzled with sauce.",
    Category: "Japanese"
  },
  {
    _id: "13",
    name: "Bento",
    image: Bento,
    price: 11.99,
    description: "A traditional Japanese lunch box with rice, fish, and vegetables.",
    Category: "Japanese"
  },
  {
    _id: "14",
    name: "Onigiri",
    image: Onigiri,
    price: 2.99,
    description: "A traditional Japanese rice ball filled with various ingredients.",
    Category: "Japanese"
  },
  // Additional food items using the remaining imports
  {
    _id: "15",
    name: "Frosted Donuts",
    image: FrostedDonuts,
    price: 4.50,
    description: "Glazed, frosted donuts perfect for a quick snack.",
    Category: "Desserts"
  },
  {
    _id: "16",
    name: "Mini Pizza",
    image: MiniPizza,
    price: 6.50,
    description: "A small, delicious pizza.",
    Category: "Italian"
  },
  {
    _id: "17",
    name: "Noodles",
    image: Noodles,
    price: 7.50,
    description: "Stir-fried noodles with vegetables.",
    Category: "Japanese"
  },
  {
    _id: "18",
    name: "Pancakes",
    image: Pancakes,
    price: 5.50,
    description: "Fluffy pancakes served with syrup.",
    Category: "Desserts"
  },
  {
    _id: "19",
    name: "Pizza Set",
    image: PizzaSet,
    price: 12.99,
    description: "A set of delicious pizza slices.",
    Category: "Italian"
  },
  {
    _id: "20",
    name: "Ramen",
    image: Ramen,
    price: 9.99,
    description: "Traditional Japanese ramen noodles in a rich broth.",
    Category: "Japanese"
  },
  {
    _id: "21",
    name: "Taco",
    image: Taco,
    price: 3.99,
    description: "A delicious taco with various fillings.",
    Category: "Mexican"
  },
  {
    _id: "22",
    name: "Enchiladas",
    image: Enchiladas,
    price: 7.99,
    description: "Corn tortillas stuffed with meat and cheese.",
    Category: "Mexican"
  }
];
