import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUsers, fetchLoginUsers } from "../../featured/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../ExtraComponent/ToastContext";

export default function MyForm({ Register = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.Users);

  const [isRegister, setIsRegister] = useState(Register);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // ✅ الحل هنا: كل ما تتغير قيمة Register من props (عند التنقل)
  // يتم تحديث isRegister في state
  useEffect(() => {
    setIsRegister(Register);
  }, [Register]);
  
  const { showHideToast } = useToast();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
        showHideToast("Please fill in all required fields.");
      return;
    }

    if (isRegister) {
      const result = await dispatch(AddUsers(formData));
      if (result.payload && !result.error) {
        showHideToast("Account Created Successfully!");
        setIsRegister(false);
        navigate("/Login");
      } else {
        showHideToast("Error Creating Account!");
      }
    } else {
      const result = await dispatch(fetchLoginUsers(formData));
  if (result.payload && result.payload.accessToken && !result.error)  {
        showHideToast("Login Successful!");
        navigate("/");
      } else {
        showHideToast("Invalid Email or Password!");
      }
    }
  };
  return (
    <div
      className="bg-gradient-to-t
 from-[#1a0024] to-[#6b1f8a] flex justify-center items-center min-h-screen bg-cover bg-center relative"
      // style={{
      //   backgroundImage:
      //     "url('https://images.unsplash.com/photo-1614851099511-773084f6911d?auto=format&fit=crop&w=1950&q=80')",
      // }}
    >
      <div className="absolute inset-0 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-10"></div>

      <div className="relative z-10 before:w-full before:h-full before:bg-black before:absolute before:inset-0 before:opacity-40 before:rounded-2xl p-10 rounded-2xl shadow-xl w-[95%] md:w-[33%] text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-pink-500">
          {isRegister ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          {isRegister && (
            <div>
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-pink-600 hover:bg-pink-700 text-white py-2 rounded mt-4"
          >
            {isLoading
              ? isRegister
                ? "Registering..."
                : "Logging in..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>
<p className="text-center mt-4 text-sm">
  {isRegister ? "Already have an account? " : "Don't have an account? "}
  <span
    onClick={() => {
      // ✅ الحل: استخدم القيمة الحالية مباشرة بدون toggle
      const targetPath = isRegister ? "/Login" : "/Register";
      navigate(targetPath);
    }}
    className="text-pink-400 cursor-pointer hover:underline"
  >
    {isRegister ? "Login Now!" : "Register Here!"}
  </span>
</p>
      </div>
    </div>
  );
}
