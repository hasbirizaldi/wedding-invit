import { IoIosCopy } from "react-icons/io";
import { images } from "../api/data";
import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { handleCopy } from "../utils/helper";

const Gift = ({ data }) => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab((prev) => (prev === tabName ? null : tabName));
  };

  return (
    <section id="gift" className="min-h-[100vh] flex justify-center items-start pt-5 font-noto mb-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
        className="bg-gray-100/80 w-[95%] min-h-[105vh] py-5 rounded-xl shadow-md shadow-ku"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center lg:text-3xl md:text-3xl text-2xl mb-6 font-semibold font-one text-rose-950"
        >
          Wedding Gift
        </motion.h1>
        <p className="px-4 mt-9 text-center mb-6  lg:text-xl md:text-lg">Bilamana Bapak/Ibu/Saudara/i ingin mengungkapkan rasa bahagia dengan memberi hadiah, maka dapat mengklik Tautan di bawah ini</p>
        <div className="flex justify-between text-white mx-auto w-[60%] mb-6">
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: false, amount: 0.3 }}
            onClick={() => handleTabClick("cashless")}
            className={`lg:w-40 md:w-40 w-26 lg:h-12 md:h-12 h-9 shadow-ku  py-1 px-1 rounded-md font-semibold lg:text-2xl md:text-xl text-lg cursor-pointer
      ${activeTab === "cashless" ? "bg-rose-950" : "bg-pink-700/60"}`}
          >
            Cashless
          </motion.button>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 3 }}
            viewport={{ once: false, amount: 0.3 }}
            onClick={() => handleTabClick("gift")}
            className={`lg:w-40 md:w-40 w-26 lg:h-12 md:h-12 h-9  shadow-ku py-1 px-1 rounded-md font-semibold lg:text-2xl md:text-xl text-lg cursor-pointer
      ${activeTab === "gift" ? "bg-rose-950" : "bg-pink-700/60"}`}
          >
            Gift
          </motion.button>
        </div>

        {activeTab === "cashless" && (
          <div className=" flex flex-col gap-6 ">
            <div className="bg-white flex flex-col gap-0 justify-center items-center  rounded-xl shadow-ku animate-mubeng mx-auto w-[80%] lg:py-8 md:py-8 py-3">
              {data?.rek1 ? (
                <>
                  {data.rek1 === "bca" && <img src={images.img_bca} alt="" className="lg:w-40 md:w-40 w-34 lg:mb-4 md:mb-4 mb-2" />}
                  {data.rek1 === "bni" && <img src={images.img_bni} alt="" className="lg:w-40 md:w-40 w-34 lg:mb-4 md:mb-4 mb-2" />}
                  {data.rek1 === "bri" && <img src={images.img_bri} alt="" className="lg:w-40 md:w-40 w-34 lg:mb-4 md:mb-4 mb-2" />}
                  {data.rek1 === "mandiri" && <img src={images.img_mandiri} alt="" className="lg:w-40 md:w-40 w-34 lg:mb-4 md:mb-4 mb-2" />}
                  {data.rek1 === "bsi" && <img src={images.img_bsi} alt="" className="lg:w-40 md:w-40 w-34 lg:mb-4 md:mb-4 mb-2" />}
                  {data.rek1 === "cimb" && <img src={images.img_cmb} alt="" className="lg:w-40 md:w-40 w-34 lg:mb-4 md:mb-4 mb-2" />}
                </>
              ) : (
                <>
                  <img src={images.img_bca} alt="BCA" className="lg:w-40 md:w-40 w-34 lg:mb-4 md:mb-4 mb-2" />
                </>
              )}
              <p className="font-semibold lg:text-2xl lg:mb-4 text-lg">{data?.no_rek1 ? data.no_rek1 : "xxxxx909877"}</p>
              <p className="lg:text-2xl text-lg lg:mb-4 mb-2">{data?.name_rek1 ? data.name_rek1 : "Nama Pemilik"}</p>
              <button
                onClick={() => handleCopy(data?.no_rek1 ? data.no_rek1 : "xxxxx909877")}
                className="bg-rose-950 shadow-ku flex justify-center items-center text-white lg:w-60 w-40 lg:h-11 h-8 rounded-lg font-semibold lg:text-2xl text-base cursor-pointer"
              >
                <IoIosCopy className="mr-1" />
                Copy Nomor
              </button>
            </div>
            <div className="bg-white flex flex-col gap-0 justify-center items-center rounded-xl shadow-ku animate-mubeng mx-auto w-[80%] lg:py-8 py-3">
              {data?.rek2 ? (
                <>
                  {data.rek2 === "bca" && <img src={images.img_bca} alt="" className="w-34 mb-2" />}
                  {data.rek2 === "bni" && <img src={images.img_bni} alt="" className="w-34 mb-2" />}
                  {data.rek2 === "bri" && <img src={images.img_bri} alt="" className="w-34 mb-2" />}
                  {data.rek2 === "mandiri" && <img src={images.img_mandiri} alt="" className="w-34 mb-2" />}
                  {data.rek2 === "bsi" && <img src={images.img_bsi} alt="" className="w-34 mb-2" />}
                  {data.rek2 === "cimb" && <img src={images.img_cmb} alt="" className="w-34 mb-2" />}
                </>
              ) : (
                <>
                  <img src={images.img_bni} alt="" className="w-34 mb-2 lg:mb-4" />
                </>
              )}
              <p className="font-semibold lg:text-2xl lg:mb-4 text-lg">{data?.no_rek2 ? data.no_rek2 : "xxxx00098988"}</p>
              <p className="lg:text-2xl text-lg mb-4">{data?.name_rek2 ? data.name_rek2 : "Nama Pemilik"}</p>
              <button
                onClick={() => handleCopy(data?.no_rek2 ? data.no_rek2 : "xxxx00098988")}
                className="bg-rose-950 shadow-ku flex justify-center items-center text-white lg:w-60 w-40 lg:h-11 h-8 rounded-lg font-semibold lg:text-2xl text-base cursor-pointer"
              >
                <IoIosCopy className="mr-1" />
                Copy Nomor
              </button>
            </div>
          </div>
        )}

        {activeTab === "gift" && (
          <div className="bg-white flex flex-col gap-1 justify-center items-center rounded-xl shadow-ku animate-mubeng mx-auto w-[80%] lg:py-8 py-3 px-4 ">
            <img src={images.img_gift} alt="" className="lg:w-50 w-40 mb-4" />
            <p className="lg:text-2xl text-lg mb-4">{data?.name_tujuan ? data.name_tujuan : "Nama Tujuan"}</p>
            <p className="lg:text-2xl text-base mb-4 text-center font-semibold">{data?.alamat_tujuan ? data.alamat_tujuan : "Jl. Joko Widodo Jancook No. 01 A, Singasari"}</p>
            <button
              onClick={data ? () => handleCopy(data?.alamat_tujuan) : () => handleCopy("Jl. Joko Widodo Jancook No. 01 A, Singasari")}
              className="bg-rose-950 shadow-ku flex justify-center items-center text-white lg:w-60 w-40 lg:h-11 h-8 rounded-lg font-semibold  lg:text-2xl text-base cursor-pointer"
            >
              <IoIosCopy className="mr-1" />
              Copy Alamat
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Gift;
