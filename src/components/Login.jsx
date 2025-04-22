import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Login = ({ onClose }) => {
  const {user, setUser,setShowUserLogin}= useAppContext();
  const [formType, setFormType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleGoogleLogin = () => {
    alert("Google login simulated!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === "register") {
      alert(`Registered:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`);
    } else {
      alert(`Logged in with Email: ${email}`);
    }
    setUser({ 
      email: email,
      name: name,
    });
    console.log("user",user);
    setShowUserLogin(false);
  };

  // This is triggered when clicking outside the form
  const handleWrapperClick = () => {
    if (onClose) onClose();
  };

  return (
    <div
      onClick={handleWrapperClick} 
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
        className="w-full max-w-sm p-6 bg-white shadow-2xl rounded-xl border border-gray-200 text-sm text-gray-600"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-500 mb-4">
          {formType === "login" ? "Login" : "Sign Up"}
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-400 hover:bg-red-300 text-white py-2 rounded-md flex items-center justify-center gap-2 mb-4 transition-all"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="flex items-center gap-2 mb-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formType === "register" && (
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Full name"
                className="w-full p-2 border border-gray-300 rounded-md outline-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 border border-gray-300 rounded-md outline-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md outline-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded-md transition-all"
          >
            {formType === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {formType === "login"
            ? "Don't have an account?"
            : "Already registered?"}{" "}
          <span
            onClick={() =>
              setFormType(formType === "login" ? "register" : "login")
            }
            className="text-indigo-500 cursor-pointer underline"
          >
            {formType === "login" ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
