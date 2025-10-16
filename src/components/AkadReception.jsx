import { motion } from "motion/react";
import { IoLocationSharp } from "react-icons/io5";
import { safeDate } from "../utils/helper";

const AkadReception = ({ data }) => {
  return (
    <section id="akadReception" className="min-h-[100vh] flex justify-center items-start pt-5 mb-4 font-noto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.3 }} className="bg-gray-100/80 w-[95%] min-h-[88vh] py-5 rounded-xl shadow-ku">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center lg:text-3xl md:text-3xl text-2xl mb-6 font-semibold font-one text-rose-950 "
        >
          Acara Kami
        </motion.h1>
        <div className="flex flex-col gap-8 px-4 lg:px-8 md:px-8 lg:pb-4 md:pb-4">
          <motion.div initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} transition={{ duration: 1.2 }} viewport={{ once: false, amount: 0.3 }} className="bg-rose-900/5 shadow-ku rounded-xl p-4 pb-6">
            <div className="grid grid-cols-3 font-semibold font-playfair text-rose-950 mb-5 lg:mx-14 md:mx-14">
              <div className="flex justify-center items-center">
                <motion.p initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.9 }} viewport={{ once: false, amount: 0.3 }} className="lg:text-2xl md:text-2xl text-xl font-one">
                  {data ? safeDate(data.date_akad).toLocaleDateString("id-ID", { weekday: "long" }).toUpperCase() : "Minggu"}
                </motion.p>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <motion.p initial={{ rotateY: 90 }} whileInView={{ rotateY: 0 }} transition={{ duration: 1, delay: 0.9 }} viewport={{ once: false, amount: 0.3 }} className="lg:text-7xl md:text-6xl text-5xl font-extrabold font-one">
                  {data
                    ? safeDate(data.date_akad).toLocaleDateString("id-ID", {
                        day: "2-digit",
                      })
                    : "31"}
                </motion.p>
                <motion.p initial={{ rotateY: 90 }} whileInView={{ rotateY: 0 }} transition={{ duration: 1, delay: 0.7 }} viewport={{ once: false, amount: 0.3 }} className="lg:text-4xl text-2xl font-one">
                  {data
                    ? safeDate(data.date_akad).toLocaleDateString("id-ID", {
                        year: "numeric",
                      })
                    : "2026"}
                </motion.p>
              </div>
              <div className="flex justify-center items-center">
                <motion.p initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.9 }} viewport={{ once: false, amount: 0.3 }} className="lg:text-3xl md:text-3xl text-2xl font-one">
                  {data
                    ? safeDate(data.date_akad).toLocaleDateString("id-ID", {
                        month: "short",
                      })
                    : "Des"}
                </motion.p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <h2 className="font-one text-rose-950 lg:text-2xl md:text-2xl text-lg font-semibold">Akad Nikah</h2>
              <p className="lg:text-xl md:text-xl">
                Pukul
                <span className="mx-1 ">
                  {data
                    ? safeDate(data.date_akad).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "09.00"}
                </span>
                WIB - Selesai
              </p>
              <p className="lg:text-xl  text-base font-semibold ">Alamat</p>
              <p className="lg:text-xl  font-bold text-rose-950">{data ? data.venue_akad : "Masjid Agung"}</p>
              <p className="mb-3 text-center lg:text-xl ">{data ? data.address_venue_akad : "Jl. Pangeran Diponegoro No 11, Kec. Gombong, Kab. Konoha"}</p>
              <a target="_blank" href={data?.lgm_venue_akad ? data.lgm_venue_akad : "https://brewokode.com/"} className="flex justify-center items-center bg-rose-950 text-slate-50 px-4 py-1 rounded-lg shadow-ku lg:text-xl">
                <IoLocationSharp className="mr-1" />
                Lihat Lokasi
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ scale: 1 }} whileInView={{ scale: 1.05 }} transition={{ duration: 1.2 }} className="bg-rose-900/5 shadow-ku rounded-xl p-4 mx-2 pb-6">
            <div className="grid grid-cols-3 font-playfair text-rose-950 mb-5 lg:mx-14 md:mx-14">
              <div className="flex justify-center items-center font-one font-extrabold">
                <motion.p initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.9 }} viewport={{ once: false, amount: 0.3 }} className="text-xl lg:text-2xl md:text-2xl">
                  {data ? safeDate(data.date_resepsi).toLocaleDateString("id-ID", { weekday: "long" }).toUpperCase() : "Minggu"}
                </motion.p>
              </div>
              <div className="flex flex-col justify-center items-center font-one font-extrabold">
                <motion.p initial={{ rotateY: 90 }} whileInView={{ rotateY: 0 }} transition={{ duration: 1, delay: 0.9 }} viewport={{ once: false, amount: 0.3 }} className="lg:text-7xl md:text-6xl text-5xl ">
                  {data
                    ? safeDate(data.date_resepsi).toLocaleDateString("id-ID", {
                        day: "2-digit",
                      })
                    : "31"}
                </motion.p>
                <motion.p initial={{ rotateY: 90 }} whileInView={{ rotateY: 0 }} transition={{ duration: 1, delay: 0.7 }} viewport={{ once: false, amount: 0.3 }} className="lg:text-4xl text-2xl">
                  {data
                    ? safeDate(data.date_resepsi).toLocaleDateString("id-ID", {
                        year: "numeric",
                      })
                    : "2026"}
                </motion.p>
              </div>
              <div className="flex justify-center items-center font-one font-extrabold">
                <motion.p initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.9 }} viewport={{ once: false, amount: 0.3 }} className="text-2xl lg:text-3xl md:text-3xl">
                  {data
                    ? safeDate(data.date_resepsi).toLocaleDateString("id-ID", {
                        month: "short",
                      })
                    : "Des"}
                </motion.p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <h2 className="font-one font-bold text-rose-950 lg:text-2xl md:text-2xl text-lg">Resepsi</h2>
              <p className="lg:text-xl">
                Pukul
                <span className="mx-1">
                  {data
                    ? safeDate(data.date_resepsi).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "10.00"}
                </span>
                WIB - Selesai
              </p>
              <p className="font-semibold lg:text-xl">Alamat</p>
              <p className="font-bold text-rose-950 lg:text-xl">{data ? data.venue_resepsi : "Masjid Agung"}</p>
              <p className="mb-3 text-center lg:text-xl">{data ? data.address_venue_resepsi : "Jl. Jokowi Widodo Jancook"}</p>
              <a target="_blank" href={data?.lgm_venue_resepsi ? data.lgm_venue_resepsi : "https://brewokode.com/"} className="flex justify-center items-center bg-rose-950 text-slate-50 px-4 py-1 rounded-lg lg:text-xl">
                <IoLocationSharp className="mr-1" />
                Lihat Lokasi
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AkadReception;
