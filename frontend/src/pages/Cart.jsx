import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import emptyCartImage from "../assets/empty-cart.png";

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart } =
    useContext(StoreContext);

  // total item count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  // total price
  const getTotalPrice = () => {
    return food_list.reduce((acc, item) => {
      return acc + (cartItems[item._id] ? item.price * cartItems[item._id] : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Cart Header */}
        <h2 className="text-3xl font-bold text-center mb-8 text-base-content">
          Your Cart 🛒
        </h2>

        {getCartCount() === 0 ? (
          // Empty Cart
          <div className="flex flex-col items-center justify-center py-5 text-center">
            <img
              src={emptyCartImage}
              alt="Empty cart"
              className="w-52 mb-6"
            />
            <p className="text-lg text-base-content/70">
              Your cart is empty. Start adding delicious items!
            </p>
            <button className="btn btn-primary mt-6"><a href="/">Browse Menu</a></button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {food_list.map((item) => {
                if (cartItems[item._id] > 0) {
                  return (
                    <div
                      key={item._id}
                      className="card bg-base-100 shadow-lg border border-base-300 rounded-xl"
                    >
                      <div className="card-body flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        {/* Image + Info */}
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 rounded-lg object-cover shadow-sm"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-base-content">
                              {item.name}
                            </h3>
                            <p className="text-sm text-base-content/70">
                              ${item.price} each
                            </p>
                            <p className="text-sm font-medium text-primary mt-1">
                              ${(item.price * cartItems[item._id]).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            className="btn btn-sm btn-outline"
                            onClick={() => removeFromCart(item._id)}
                          >
                            -
                          </button>
                          <span className="font-bold text-lg">
                            {cartItems[item._id]}
                          </span>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => addToCart(item._id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Summary Section */}
            <div className="card bg-base-100 shadow-xl border border-base-300 rounded-2xl h-fit sticky top-20">
              <div className="card-body">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2 text-base-content/80">
                  <span>Total Items</span>
                  <span>{getCartCount()}</span>
                </div>
                <div className="flex justify-between mb-4 text-base-content/80">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <button className="btn btn-primary w-full">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
