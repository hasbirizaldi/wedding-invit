import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔹 Ambil user dari API jika token ada
  useEffect(() => {
    if (token) {
      axios
        .get("https://www.brewokode.site/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.error("Gagal mengambil data user:", err);
          setUser(null);
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  // 🔹 Tambahkan fungsi LOGIN
  const login = async (email, password) => {
    const res = await axios.post("https://www.brewokode.site/api/login", {
      email,
      password,
    });

    const token = res.data.token; // pastikan sesuai response API kamu
    localStorage.setItem("token", token);

    // langsung ambil user dari API
    const userRes = await axios.get("https://www.brewokode.site/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUser(userRes.data);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://www.brewokode.site/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.warn("Logout API gagal:", error.response?.data || error.message);
    } finally {
      localStorage.removeItem("token");
      setUser(null); // pastikan ini ADA
    }
  };

  return <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
