import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { loginWithGoogle } from "../firbaseConfiguration ";
import toast from "react-hot-toast";
import AdSpaceContainer from "./AdsSense";

const Login = ({ onClose }) => {
  const { setUser, setShowUserLogin, axios } = useAppContext();
  const [formType, setFormType] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const googleUser = await loginWithGoogle();
      const { email, displayName, photoURL, phoneNumber } =
        googleUser.providerData[0] || {};

      const { data } = await axios.post("/api/user/googleLogin", {
        email,
        name: displayName,
        image: photoURL,
        phone: phoneNumber,
      });

      if (data.success) {
        setUser(data.data);
        setShowUserLogin(false);
        toast.success("Google login successful!");
      } else {
        toast.error(data.message || "Google login failed.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (formType === "register") {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phone", phone);
        if (image) formData.append("image", image);

        response = await axios.post("/api/user/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.success) {
          toast.success("User registered successfully.");
          setUser(response.data.data);
          setShowUserLogin(false);
        } else {
          toast.error(response.data.message || "Registration failed.");
        }
      } else {
        response = await axios.post("/api/user/login", { email, password });

        if (response.data.success) {
          toast.success("Logged in successfully.");
          setUser(response.data.data);
          setShowUserLogin(false);
        } else {
          toast.error(response.data.message || "Login failed.");
        }
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleWrapperClick = () => {
    if (onClose) onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div
      onClick={handleWrapperClick}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white shadow-2xl rounded-2xl border border-gray-200 text-sm text-gray-600 flex flex-col max-h-full overflow-y-auto p-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          {formType === "login" ? "Login" : "Sign Up"}
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-400 text-white py-2 rounded-lg flex items-center justify-center gap-2 mb-4 transition"
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
          <span className="text-xs text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formType === "register" && (
            <>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Full name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone number"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-indigo-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col items-center gap-3">
                <p className="text-lg font-semibold text-gray-700">
                  Profile Photo
                </p>
                <label className="cursor-pointer">
                  <input
                    accept="image/*"
                    type="file"
                    name="image"
                    hidden
                    onChange={handleImageChange}
                  />
                  <img
                    src={
                      imagePreview ||
                      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    }
                    alt="Upload Preview"
                    className="w-32 h-32 object-cover rounded-lg border-2 border-dashed border-gray-400 hover:border-indigo-400 transition"
                  />
                </label>
              </div>
            </>
          )}

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded-lg transition"
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
