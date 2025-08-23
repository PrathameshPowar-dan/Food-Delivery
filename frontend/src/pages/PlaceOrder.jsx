import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const PlaceOrder = () => {
  const { cartItems, food_list } = useContext(StoreContext);

  // Calculate totals
  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const getTotalPrice = () =>
    food_list.reduce(
      (acc, item) =>
        acc + (cartItems[item._id] ? item.price * cartItems[item._id] : 0),
      0
    );

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Delivery Information */}
        <div className="lg:col-span-2 card bg-base-100 shadow-xl border rounded-xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">Delivery Information 🚚</h2>

            <form className="grid gap-4">
              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="123 Main St"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Pincode & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Pincode</span>
                  </label>
                  <input
                    type="text"
                    placeholder="123456"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Country</span>
                  </label>
                  <input
                    type="text"
                    placeholder="India"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  className="input input-bordered w-full"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card bg-base-100 shadow-xl border rounded-xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold mb-4">Order Summary 🛒</h2>

            {getCartCount() === 0 ? (
              <p className="text-base-content/70">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {food_list.map((item) => {
                  if (cartItems[item._id] > 0) {
                    return (
                      <div
                        key={item._id}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-base-content/70">
                            ${item.price} × {cartItems[item._id]}
                          </p>
                        </div>
                        {/* <p className="font-semibold">
                          ${(item.price * cartItems[item._id]).toFixed(2)}
                        </p> */}
                      </div>
                    );
                  }
                  return null;
                })}

                <div className="flex justify-between mb-1 text-base-content/80">
                  <span>Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-1 text-base-content/80">
                  <span>Delivery Fee</span>
                  <span>+$2.00</span>
                </div>
                <div className="flex border justify-between mb-1 p-1 text-base-content/80">
                  <span>Total</span>
                  <span>${(getTotalPrice() + 2).toFixed(2)}</span>
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
