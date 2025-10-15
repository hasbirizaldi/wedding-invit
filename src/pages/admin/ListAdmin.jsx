import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
import { formatDate2 } from "../../utils/helper";
import { BsEnvelopeHeart } from "react-icons/bs";

const ListAdmin = () => {
  const [weddings, setWeddings] = useState({});
  const [loading, setLoading] = useState(true);

  const getAllWedds = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get("https://www.brewokode.site/api/admin/wedd", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      setWeddings(response.data.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (weddId) => {
    if (!(await alertConfirm("Apakah anda yakin akan menhhapus data ini?"))) {
      return;
    }
    const token = localStorage.getItem("token");
    const response = await axios.delete(`https://www.brewokode.site/api/admin/wedd/${weddId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (response.status === 200) {
      await alertSuccess("Data Berhasil Dihapus");
      setWeddings((prev) => prev.filter((item) => item.id !== weddId));
    } else {
      await alertError("Terjadi Error!");
    }
  };

  useEffect(() => {
    getAllWedds();
  }, []);
  return (
    <div className="bg-gray-200/80 px-1 lg:px-4 py-5 rounded-lg shadow-ku">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end lg:gap-0 gap-3 mb-2">
        <h1 className="text-pink-950 text-lg lg:text-2xl font-bold">Daftar Undangan</h1>
        <Link to="/hasbi/create" className="font-one flex items-center gap-2 bg-pink-950 py-1 px-3  cursor-pointer hover:bg-pink-900 font-semibold rounded shadow-ku text-white ">
          <BsEnvelopeHeart className="text-lg lg:text-xl" />
          Buat Undangan
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className=" w-[800px] lg:w-full border border-gray-300 rounded-lg font-noto overflow-x-scroll">
          <thead className="bg-pink-950 text-pink-50 font-semibold">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold border-b">#</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border-b">Nama Undangan</th>
              <th className=" px-4 py-2 text-left text-sm font-semibold border-b">Tanggal Akad</th>
              <th className=" px-4 py-2 text-left text-sm font-semibold border-b lg:table-cell hidden">Email</th>
              <th className=" px-4 py-2 text-left text-sm font-semibold border-b lg:table-cell hidden">Tanggal Dibuat</th>
              <th className="px-4 py-2 text-left text-sm font-semibold border-b lg:table-cell hidden">No Tlp</th>

              <th className="px-4 py-2 text-center text-sm font-semibold border-b ">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {loading ? (
              // Skeleton Rows
              [...Array(5)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-4 py-2 border-b">
                    <div className="h-4 w-4 bg-pink-200 rounded"></div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="h-4 w-24 bg-pink-200 rounded"></div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="h-4 w-28 bg-pink-200 rounded"></div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="h-4 w-20 bg-pink-200 rounded"></div>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <div className="h-4 w-20 bg-pink-200 rounded"></div>
                  </td>
                  <td className="px-4 py-2 border-b flex gap-3 justify-center">
                    <div className="h-6 w-6 bg-pink-200 rounded"></div>
                    <div className="h-6 w-6 bg-pink-200 rounded"></div>
                    <div className="h-6 w-6 bg-pink-200 rounded"></div>
                  </td>
                </tr>
              ))
            ) : weddings.length > 0 ? (
              weddings.map((wedd, index) => (
                <tr key={wedd.id} className="hover:bg-pink-100">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">
                    {wedd.nickname_mp?.split(" ")[0]} & {wedd.nickname_mw?.split(" ")[0]}
                  </td>
                  <td className="px-4 py-2 border-b">{formatDate2(wedd.date_akad)}</td>
                  <td className="px-4 py-2 border-b lg:table-cell hidden">{wedd.user.email}</td>
                  <td className="px-4 py-2 border-b lg:table-cell hidden">{formatDate2(wedd.created_at)}</td>

                  <td className="px-4 py-2 border-b lg:table-cell hidden">{wedd.no_tlp}</td>
                  <td className=" flex flex-row gap-3 justify-center px-4 py-2 border-b">
                    <Link to={`/${wedd.slug}?to=Raden Mas Gareng`} target="_blank" className="px-2 py-1 text-lg bg-pink-400 text-white rounded hover:bg-pink-500">
                      <FaPlayCircle />
                    </Link>
                    <Link to={`/hasbi/edit/${wedd.id}`} className="px-2 py-1 text-lg bg-green-600 text-white rounded hover:bg-green-900">
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(wedd.id)} className="px-2 py-1 cursor-pointer text-lg bg-red-700 text-white rounded hover:bg-pink-900">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center font-semibold py-2 text-red-700">
                  Data Empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAdmin;
