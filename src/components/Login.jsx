import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { loginWithGoogle } from "../firbaseConfiguration ";
import toast from "react-hot-toast";

const Login = ({ onClose }) => {
  const { setUser, setShowUserLogin, axios, navigate } = useAppContext();
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

      const { email, displayName, photoURL, phoneNumber } = googleUser.providerData[0];

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
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div
      onClick={handleWrapperClick}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm p-6 bg-white shadow-2xl rounded-2xl border border-gray-200 text-sm text-gray-600"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-500 mb-4">
          {formType === "login" ? "Login" : "Sign Up"}
        </h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 hover:bg-red-400 text-white py-2 rounded-lg flex items-center justify-center gap-2 mb-4 transition-all"
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
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full p-2 border border-gray-300 rounded-lg outline-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full p-2 border border-gray-300 rounded-lg outline-indigo-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Profile Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 border border-gray-300 rounded-lg outline-indigo-500"
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
              className="w-full p-2 border border-gray-300 rounded-lg outline-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded-lg transition-all"
          >
            {formType === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {formType === "login" ? "Don't have an account?" : "Already registered?"}{" "}
          <span
            onClick={() => setFormType(formType === "login" ? "register" : "login")}
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
