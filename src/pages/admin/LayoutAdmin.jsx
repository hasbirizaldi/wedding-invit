import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { alertConfirm, alertSuccess } from "../../lib/alert";
import { useEffect } from "react";

const LayoutAdmin = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await alertConfirm("Apakah anda yakin akan keluar?");
    if (!result) return;

    await logout();
    await alertSuccess("Anda berhasil keluar");
    navigate("/"); // langsung ke dashboard
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/"); // ⬅️ redirect ke dashboard utama
    } else if (user && user.data.role !== "admin") {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-2">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Navbar */}
      <div className="grid bg-pink-950 lg:h-14 md:h-10 h-10 fixed w-full top-0 z-50">
        <div className={` grid grid-cols-2 items-center`}>
          {}
          {/* Logo */}
          <div className="flex flex-col justify-center pl-5 ">
            <Link to="/hasbi" className=" font-one font-semibold text-2xl text-pink-50">
              Admin
            </Link>
          </div>
          {/* Menu */}
          <nav className="flex items-center justify-start gap-2 flex-row relative">
            {user && <p className="absolute right-30 font-semibold text-md rounded-lg text-pink-50 py-1 px-3 cursor-pointer ">{user?.data?.name.split(" ")[0]}</p>}
            {user ? (
              <button onClick={handleLogout} className="absolute right-0 font-semibold text-sm text-pink-50 py-1 px-3 cursor-pointer  ">
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="absolute right-2 font-semibold text-md rounded-lg text-pink-50 py-1 px-3 cursor-pointer ">
                Login
              </NavLink>
            )}
          </nav>
        </div>
      </div>

      {/* Konten */}
      <div className="bg-2 min-h-screen bg-pink-50 overflow-y-scroll lg:py-2 pt-12 lg:pt-18 pb-5  px-2 lg:px-12 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAdmin;
