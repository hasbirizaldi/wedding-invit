import { Link } from "react-router-dom";
import { theme } from "../../api/data";
import { BsEnvelopeHeart } from "react-icons/bs";
import { FaEye, FaListAlt } from "react-icons/fa";

const DashboardAdmin = () => {
  return (
    <div className="bg-gray-200/80 lg:pt-4 pt-3 pb-5 lg:px-6 md:px-4 px-2 shadow-ku rounded-xl min-h-[90vh]">
      <div className="flex lg:flex-row flex-col lg:gap-6 gap-4">
        <Link to="create" className="font-one flex items-center gap-2 bg-pink-950 py-2 px-3  cursor-pointer hover:bg-pink-900 font-semibold rounded shadow-ku text-white ">
          <BsEnvelopeHeart className="text-xl" />
          Buat Undangan
        </Link>
        <Link to="list" className="font-one flex items-center gap-2 bg-pink-950 py-2 px-3  cursor-pointer hover:bg-pink-900 font-semibold rounded shadow-ku text-white ">
          <FaListAlt className="text-xl" />
          Daftar Undangan
        </Link>
      </div>
      <h1 className="text-xl text-red-950 font-bold lg:pt-6 md:pt-5 pt-4">Daftar Tema</h1>
      <div className="h-0.5 w-full bg-pink-950 mb-3" />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-5">
        <div className=" bg-pink-100 rounded-lg hover:scale-[101%] transition-all shadow-ku p-2 cursor-pointer">
          <img src={theme.theme1} alt="Tema 1" className="mx-auto" />
          <div className="font-semibold mt-2 flex justify-evenly items-center">
            <h1 className="font-one text-pink-950">Tema 1</h1>
            <Link to="/dedes-arok" target="_blank" className="flex justify-center items-center gap-2 bg-pink-950 text-white px-3 text-sm py-1.5 rounded">
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

export default DashboardAdmin;
