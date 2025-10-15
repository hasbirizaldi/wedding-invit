import { FaEyeSlash, FaEye } from "react-icons/fa";
import React, { useState } from "react";
import { motion } from "motion/react";
import { alertError, alertSuccess } from "../../src/lib/alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [mode, setMode] = useState("login");
  const [passHidden, setPassHidden] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };

  const togglePassword = () => setPassHidden(!passHidden);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === "login" ? "https://www.brewokode.site/api/login" : "https://www.brewokode.site/api/register";

      const payload =
        mode === "login"
          ? { email: form.email, password: form.password }
          : {
              name: form.name,
              email: form.email,
              password: form.password,
              password_confirmation: form.password_confirmation,
            };

      const response = await axios.post(url, payload);
      const token = response.data.data.token;
      localStorage.setItem("token", token);

      const userRes = await axios.get("https://www.brewokode.site/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // simpan ke localStorage
      localStorage.setItem("user", JSON.stringify(userRes.data.data));

      // ✅ penting: update context agar langsung terbaca
      setUser(userRes.data.data);
      await alertSuccess(`${mode === "login" ? "Login Berhasil" : "Register Berhasil"}`);

      if (userRes.data.data.role === "admin") {
        navigate("/hasbi");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      await alertError(err.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-2">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-slate-100/80 lg:w-[40%] w-[95%] shadow-ku rounded-lg px-5 pt-10 pb-12">
        <h1 className="text-center font-one text-3xl font-semibold text-rose-950 mb-3">{mode === "login" ? "Login" : "Register"}</h1>
        <h4 className="text-rose-950 text-center mb-5">{mode === "login" ? "Silakan masuk dengan email dan password yang telah Anda daftarkan." : "Silakan daftarkan akun Anda."}</h4>

        <form onSubmit={handleSubmit} className="w-[90%] mx-auto">
          {mode === "register" && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                name="name"
                onChange={handleChange}
                placeholder="Nama lengkap"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 outline-none text-sm"
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              name="email"
              onChange={handleChange}
              placeholder="Alamat email"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 outline-none text-sm"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={passHidden ? "password" : "text"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="xxxxxxxxx"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 outline-none text-sm"
                required
              />
              <span onClick={togglePassword} className="absolute cursor-pointer right-4 top-3 text-slate-700">
                {passHidden ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {mode === "register" && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konfirmasi Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type={passHidden ? "password" : "text"}
                  name="password_confirmation"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  placeholder="xxxxxxxxx"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 outline-none text-sm"
                  required
                />
                <span onClick={togglePassword} className="absolute cursor-pointer right-4 top-3 text-slate-700">
                  {passHidden ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-rose-950 text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-800 transition mt-3 cursor-pointer">
            {loading ? "Memproses..." : mode === "login" ? "Login" : "Register"}
          </button>

          <p className="text-slate-900 mt-4 text-center">
            {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}
            <span onClick={toggleMode} className="font-semibold text-rose-950 underline ml-2 cursor-pointer hover:text-pink-800">
              {mode === "login" ? "Register" : "Login"}
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
