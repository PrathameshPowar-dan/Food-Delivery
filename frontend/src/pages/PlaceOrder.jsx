import React, { useContext, useState } from "react";
import { StoreContext } from "../Context/StoreContext";

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartAmount, getCartCount } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    console.log("Order Items:", orderItems);
    console.log("Customer Data:", data);
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <form
          className="grid lg:grid-cols-3 gap-8"
          onSubmit={handleSubmit} // ✅ keep form submit here
        >
          {/* Delivery Information */}
          <div className="lg:col-span-2 card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-4">Delivery Information 🚚</h2>

              <div className="grid gap-4">
                {/* First + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text text-base-content font-medium">
                        First Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={data.firstName}
                      onChange={onChangeHandler}
                      placeholder="John"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text text-base-content font-medium">
                        Last Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={data.lastName}
                      onChange={onChangeHandler}
                      placeholder="Doe"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="label">
                    <span className="label-text text-base-content font-medium">Address</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={data.address}
                    onChange={onChangeHandler}
                    placeholder="123 Main St"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Pincode + Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">
                      <span className="label-text text-base-content font-medium">Pincode</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={data.pincode}
                      onChange={onChangeHandler}
                      placeholder="123456"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text text-base-content font-medium">Country</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={data.country}
                      onChange={onChangeHandler}
                      placeholder="India"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="label">
                    <span className="label-text text-base-content font-medium">Phone</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={onChangeHandler}
                    placeholder="+91 9876543210"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                {/* ✅ Button only relies on form submit */}
                <button type="submit" className="btn btn-primary w-full mt-4">
                  Place Order
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card bg-base-100 shadow-xl border border-base-300 rounded-xl sticky top-6">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                <span className="bg-secondary/20 p-2 rounded-full mr-2">🛒</span>
                Order Summary
              </h2>

              {getCartCount() === 0 ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4 text-base-content/50">🛒</div>
                  <p className="text-base-content/70">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="max-h-80 overflow-y-auto pr-2">
                    {food_list.map((item) =>
                      cartItems[item._id] > 0 ? (
                        <div
                          key={item._id}
                          className="flex justify-between items-center py-3 border-b border-base-200"
                        >
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-base-300 rounded-md overflow-hidden mr-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-base-content/70">
                                ${item.price} × {cartItems[item._id]}
                              </p>
                              <p className="font-medium text-primary">
                                ${(item.price * cartItems[item._id]).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 pt-4 border-t border-base-200">
                    <div className="flex justify-between text-base-content/80">
                      <span>Subtotal</span>
                      <span>${getTotalCartAmount()}</span>
                    </div>
                    <div className="flex justify-between text-base-content/80">
                      <span>Delivery Fee</span>
                      <span>+$2.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-base-200">
                      <span>Total</span>
                      <span className="text-primary">
                        ${(parseFloat(getTotalCartAmount()) + 2).toFixed(2)}
                      </span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default PlaceOrder;
