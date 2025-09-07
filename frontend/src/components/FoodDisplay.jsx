import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FoodDisplay = ({ category }) => {
  const { food_list, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

    const navigate = useNavigate();

    const handleCheckout = () => {
      navigate("/cart");
    };
  return (
    <section className="relative py-12 px-4 max-w-6xl mx-auto" id="order">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-base-content">
          {category === "All" ? "All Foods" : category}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-base-content/70">
          Delicious dishes carefully selected just for you 🍴
        </p>
      </div>

      {/* Food Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {food_list
          .filter((food) => category === "All" || food.category === category)
          .map((food, idx) => {
            const itemQuantity = cartItems[food._id] || 0;

            return (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border-2 border-base-300 transition-all duration-300 relative"
              >
                {/* Image with Add-to-Cart */}
                <div className="relative h-52 sm:h-56 lg:h-64 w-full overflow-hidden bg-base-200 rounded-t-2xl">
                  <img
                    src={food.image}
                    alt={food.name}
                    loading="lazy"
                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-700"
                    draggable="false"
                  />

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-base-100/30 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Add-to-Cart Button / Counter */}
                  {itemQuantity > 0 ? (
                    <div className="absolute bottom-3 right-3 flex items-center gap-3 bg-base-100/90 backdrop-blur-sm rounded-full shadow-xl px-4 py-2">
                      <button
                        className="btn btn-sm btn-circle btn-outline"
                        onClick={() => removeFromCart(food._id)}
                      >
                        -
                      </button>
                      <span className="font-bold text-base min-w-[20px] text-center">
                        {itemQuantity}
                      </span>
                      <button
                        className="btn btn-sm btn-circle btn-primary"
                        onClick={() => addToCart(food._id)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="absolute bottom-3 right-3 btn btn-primary btn-circle shadow-xl scale-110"
                      onClick={() => addToCart(food._id)}
                    >
                      +
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="text-lg font-semibold text-base-content line-clamp-1">
                      {food.name}
                    </h3>
                    <p className="text-sm text-base-content/70 line-clamp-2 mt-1">
                      {food.description}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ${food.price}
                    </span>
                    <button
                      className="flex items-center gap-2 bg-primary text-primary-content px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                      onClick={handleCheckout}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="text-sm font-medium">Checkout</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </section>
  );
};

export default FoodDisplay;