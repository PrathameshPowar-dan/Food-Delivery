import React, { useState } from 'react'

const Login = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign In")

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

                    <div className="space-y-4">
                        {/* Username */}
                        {currState === "Login" ? null : (
                            <div>
                                <label className="label">
                                    <span className="label-text font-medium">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
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
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Terms */}
                        {currState !== "Login" && (
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="checkbox checkbox-primary" />
                                <span className="text-sm text-base-content/80">
                                    I agree to the Terms & Conditions
                                </span>
                            </div>
                        )}

                        {/* Submit */}
                        <button className="btn btn-primary w-full">
                            {currState === "Login" ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    {/* Footer */}
                    <p className="mt-4 text-center text-sm text-base-content/70">
                        {currState === "Login" ? (
                            <>Don't have an account?{" "}
                                <span
                                    className="link link-primary cursor-pointer"
                                    onClick={() => setCurrState("SignUp")}
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