import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext";
import { axiosInstance } from "../Context/axios";
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51S2SKMAIOTGW32fpNZoBRsVF6e2fb4RuSc6vOQgBTTKgCXmlGcf3J1D7KZUFvkCO50CGleF758YcbkaddVzFBmZf00tQAaIQll", {
  locale: 'en'
});

const PlaceOrder = () => {
  const { cartItems, food_list, getTotalCartAmount, getCartCount, clearCart } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Preload Stripe resources to prevent warnings
    const preloadStripeResources = () => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      document.head.appendChild(script);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://js.stripe.com/v3/elements.css';
      document.head.appendChild(link);
    };

    preloadStripeResources();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (getCartCount() === 0) {
      setError("Your cart is empty");
      return;
    }

    for (const key in data) {
      if (!data[key].trim()) {
        setError("Please fill in all fields");
        return;
      }
    }

    setIsSubmitting(true);
    setError("");

    try {
      const orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({
            itemId: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: cartItems[item._id],
          });
        }
      });

      const orderData = {
        address: data,
        items: orderItems,
        amount: (parseFloat(getTotalCartAmount()) + 2).toFixed(2),
      };

      console.log("Submitting order:", orderData);

      const response = await axiosInstance.post("/order/place-order", orderData);

      if (response.data.success) {
        const { session_url, session_id } = response.data.data;

       
        localStorage.setItem('stripe_session_id', session_id);


        window.location.href = session_url;
      } else {
        setError(response.data.message || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Order placement error:", err);
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <form className="grid lg:grid-cols-3 gap-8" onSubmit={handleSubmit}>
          {/* Delivery Information */}
          <div className="lg:col-span-2 card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-2xl font-bold mb-4">Delivery Information 🚚</h2>

              {error && (
                <div className="alert alert-error mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <div className="grid gap-4">
                {/* First + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">First Name</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={data.firstName}
                      onChange={onChangeHandler}
                      placeholder="John"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Last Name</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={data.lastName}
                      onChange={onChangeHandler}
                      placeholder="Doe"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Address</span>
                  </label>
                  <textarea
                    name="address"
                    value={data.address}
                    onChange={onChangeHandler}
                    placeholder="123 Main St, City, State"
                    className="textarea w-full textarea-bordered"
                    rows="3"
                    required
                  />
                </div>

                {/* Pincode + Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Pincode</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={data.pincode}
                      onChange={onChangeHandler}
                      placeholder="123456"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Country</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={data.country}
                      onChange={onChangeHandler}
                      placeholder="India"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Phone</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={onChangeHandler}
                    placeholder="+91 9876543210"
                    className="input input-bordered"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isSubmitting || getCartCount() === 0}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Processing...
                      </>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </button>
                </div>
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
                            </div>
                          </div>
                          <p className="font-medium text-primary">
                            ${(item.price * cartItems[item._id]).toFixed(2)}
                          </p>
                        </div>
                      ) : null
                    )}
                  </div>

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

                  <p className="text-center text-sm text-base-content/70 mt-4">
                    By placing your order, you agree to our{' '}
                    <a href="#" className="link link-primary">Terms of Service</a>
                  </p>
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