import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { alertConfirm, alertSuccess } from "../../lib/alert";
import { useEffect } from "react";

const LayoutUser = () => {
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
    } else if (user && user.data.role !== "user") {
      navigate("/hasbi");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Navbar */}
      <div className="grid z-50 bg-pink-950 lg:h-12 h-10 fixed w-full top-0">
        <div className={` grid grid-cols-2 items-center`}>
          {/* Logo */}
          <div className="flex flex-col justify-center pl-5 ">
            <Link to="/" className=" font-one font-semibold text-2xl text-pink-50">
              BreWed
            </Link>
          </div>
          {/* Menu */}

          <div className="flex items-center justify-start gap-2 flex-row relative">
            {user && (
              <div className="absolute right-30 font-semibold text-md rounded-lg text-pink-50 py-1 px-3 cursor-pointer">
                <p>{user.data.name.split(" ")[0]}</p>
              </div>
            )}
            {user ? (
              <div onClick={handleLogout} className="absolute right-5 font-semibold text-md rounded-lg text-pink-50 py-1 px-3 cursor-pointer ">
                Logout
              </div>
            ) : (
              <NavLink to="/login" className="absolute right-5 font-semibold text-md rounded-lg text-pink-50 py-1 px-3 cursor-pointer ">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Konten */}
      <div className="bg-2 min-h-screen bg-pink-50 overflow-y-scroll lg:py-4 pt-12 lg:pt-16 md:pt-14  px-2 lg:px-16 pb-8 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutUser;
