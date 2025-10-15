import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsEnvelopeHeart } from "react-icons/bs";
import { FaEdit, FaEye } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { formatDate2 } from "../../utils/helper";
import CountdownTimer2 from "../../components/CountDownTimer2";
// import { MdDelete } from "react-icons/md";
import { theme } from "../../api/data";
// import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [weddings, setWeddings] = useState([]);
  const { user } = useAuth();
  const userId = user?.data?.id;
  const navigate = useNavigate();

  const handleCreateClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/create");
    }
  };

  const getMyWedd = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(`https://www.brewokode.site/api/wedd/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setWeddings(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (weddId) => {
  //   if (!(await alertConfirm("Apakah anda yakin akan menhhapus undangan ini?"))) {
  //     return;
  //   }
  //   const token = localStorage.getItem("token");
  //   const response = await axios.delete(`https://www.brewokode.site/api/wedd/${weddId}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       Accept: "application/json",
  //     },
  //   });

  //   if (response.status === 200) {
  //     await alertSuccess("Undangan Berhasil Dihapus");
  //     setWeddings((prev) => prev.filter((item) => item.id !== weddId));
  //   } else {
  //     await alertError("Terjadi Error!");
  //   }
  // };
  useEffect(() => {
    if (!userId) {
      setWeddings([]); // 🧹 bersihin data saat user logout
      setLoading(false);
      return;
    }

    getMyWedd(); // ambil ulang kalau user login
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <div className="bg-gray-200/80 pt-4 lg:pb-6 md:pb-6 pb-6 lg:px-10 md:px-10 px-2 shadow-ku rounded-lg min-h-[90vh]">
      <div className="flex gap-6">
        <button onClick={handleCreateClick} className="font-one flex items-center gap-2 bg-pink-950 py-1.5 px-3  cursor-pointer hover:bg-pink-900 font-semibold rounded shadow-ku text-white ">
          <BsEnvelopeHeart className="text-xl" />
          Buat Undangan
        </button>
      </div>
      {weddings?.length > 0 && (
        <>
          <h1 className="text-xl text-red-950 font-bold lg:pt-4 md:pt-4 pt-4">Undangan Anda</h1>
          <div className="h-0.5 w-full bg-pink-950 mb-3" />
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-5 space-y-4">
            {weddings?.map((wedd, index) => (
              <div key={index}>
                <div className=" bg-5 rounded-lg transition-all shadow-ku px-3 py-3 cursor-pointer">
                  <div className="bg-gray-200/80 rounded-lg h-[450px] z-20 font-semibold mt-2  flex flex-col justify-evenly items-center">
                    <h1 className=" text-center font-semibold text-lg">The Wedding Of</h1>
                    <div className=" flex justify-center">
                      <div className=" h-[120px] text-shadow-yellow-600 text-shadow-sm font-great font-semibold flex flex-col text-rose-950 animate-zoomIn">
                        <p className="text-[40px] text-center">{wedd.nickname_mw || "Juliete"}</p>
                        <p className="text-xl text-center">&</p>
                        <p className="text-[40px] text-center">{wedd.nickname_mp || "Romeo"}</p>
                      </div>
                    </div>
                    <div className="">
                      <p className="font-noto text-center mb-3">{formatDate2(wedd.date_akad)}</p>
                      <CountdownTimer2 targetDate={wedd?.date_akad || "2027-12-01T00:00:00"} />
                    </div>
                    <Link to={`/${wedd.slug}?to=Mr. Samsul`} target="_blank" className="flex justify-center items-center gap-2 bg-pink-950 text-white px-3  py-1.5 rounded mb-2">
                      <FaEye />
                      Lihat Undangan
                    </Link>
                  </div>
                </div>
                <div className="flex gap-4 justify-center mt-2">
                  <Link to={`/edit/${wedd.id}`} className="px-3 font-noto py-1 base bg-green-600 text-white rounded cursor-pointer hover:bg-green-800 flex items-center gap-1 justify-center shadow-ku ">
                    <FaEdit />
                    Edit
                  </Link>
                  {/* <button onClick={() => handleDelete(wedd.id)} className="px-3 py-1 base bg-red-700 text-white rounded cursor-pointer hover: flex items-center justify-center gap-1 font-noto shadow-ku hover:bg-red-900">
                    <MdDelete />
                    Hapus
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <h1 className="text-xl text-red-950 font-bold lg:pt-4 md:pt-8 pt-8">Daftar Tema</h1>
      <div className="h-0.5 w-full bg-pink-950 mb-3 mt-1" />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-5">
        <div className=" bg-pink-100/40 rounded-lg hover:scale-[101%] transition-all shadow-ku px-2 py-4 cursor-pointer">
          <img src={theme.theme1} alt="Tema 1" className="mx-auto rounded-lg" />
          <div className="font-semibold mt-2 flex justify-evenly items-center">
            <h1 className="font-one text-pink-950">Tema 1</h1>
            <Link to="/demo?to=Mr. Samsul" target="_blank" className="flex justify-center items-center gap-2 bg-pink-950 text-white px-3 text-sm py-1.5 rounded">
              <FaEye />
              Lihat Demo
            </Link>
          </div>
        </div>
        <div className=" bg-pink-100 rounded-lg hover:scale-[101%] transition-all shadow-ku p-2 cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl">Mohon maaf tema baru ada 1</p>
            <p className="text-4xl text-center">😁</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
