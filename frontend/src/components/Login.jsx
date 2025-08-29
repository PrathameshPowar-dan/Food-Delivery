import React, { useContext, useEffect, useState } from 'react'
import { axiosInstance } from '../Context/axios';

const Login = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign In")
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(
              `/user/${currState === "Login" ? "login" : "register"}`,
              data
            );
            console.log(response.data);
            if (response.data.success) {
                setShowLogin(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl relative mx-auto">

                {/* Close Button */}
                <button
                    onClick={() => setShowLogin(false)}
                    className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost z-10"
                >
                    ✕
                </button>

                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center text-base-content mb-4">
                        {currState === "Login" ? "Login" : "Create Account"}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* name */}
                        {currState === "Login" ? null : (
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={data.name}
                                    required
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <input
                                type="password"
                                name='password'
                                onChange={handleChange}
                                value={data.password}
                                required
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Submit */}
                        <button type="submit" className="btn btn-primary w-full">
                            {currState === "Login" ? "Login" : "Sign Up"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-4 text-center text-sm text-base-content/70">
                        {currState === "Login" ? (
                            <>Don't have an account?{" "}
                                <span
                                    className="link link-primary cursor-pointer"
                                    onClick={() => setCurrState("Sign Up")}
                                >
                                    Create one
                                </span>
                            </>
                        ) : (
                            <>Already have an account?{" "}
                                <span
                                    className="link link-primary cursor-pointer"
                                    onClick={() => setCurrState("Login")}
                                >
                                    Click Here
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login