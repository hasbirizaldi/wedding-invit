import { motion } from "motion/react";
import { IoIosSend } from "react-icons/io";

const Wishes = () => {
  return (
    <section id="gift" className="min-h-[100vh] flex justify-center items-start pt-5 font-noto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.3 }} className="bg-gray-100/80 w-[95%] min-h-[88vh] py-5 rounded-xl shadow-md shadow-ku">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center lg:text-3xl text-2xl mb-6 font-semibold font-one text-rose-950"
        >
          Ucapan & Doa
        </motion.h1>
        <p className="lg:text-xl text-center px-4 mb-3">Berikan ucapan terbaik untuk kedua mempelai</p>
        <div className="bg-rose-900/10 border-rose-900/80 border-1 px-3 py-5 pb-10 text-white w-[93%] mx-auto rounded-lg shadow-ku">
          <form>
            <div className="flex flex-col mb-2">
              <label className="text-gray-950 mb-1 lg:text-xl ">Nama Anda</label>
              <input
                type="text"
                placeholder="Isikan Nama Anda"
                required
                className="bg-slate-50/50 lg:h-12 h-9 rounded-lg text-gray-800 px-2 py-2 border border-rose-900/80  focus:outline-none focus:ring-2 focus:ring-amber-600 lg:text-xl text-base focus:border-transparent "
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-gray-950 mb-1 lg:text-xl">Ucaapan & Doa</label>
              <textarea
                required
                className="bg-slate-50/50 rounded-lg text-gray-800 px-2 py-2 border border-rose-900/80 focus:outline-none focus:ring-2 focus:ring-amber-600 lg:text-xl text-lg focus:border-transparent"
                rows={5}
                placeholder="Berikan Ucapan dan Doa"
              ></textarea>
            </div>
            <div className="flex flex-col mb-10">
              <label className="text-gray-950 mb-1 lg:text-xl">Konfirmasi Kehadiran</label>
              <select className="w-64 lg:h-12 h-9 bg-slate-50/50 rounded-lg text-slate-800 px-1 h-9 border border-rose-900/80  focus:outline-none focus:ring-2 focus:ring-amber-600 lg:text-xl text-base focus:border-transparent">
                <option value="Akan Hadir">Akan Hadir</option>
                <option value="Tidak Hadir">Tidak Hadir</option>
                <option value="Belum Tahu">Belum Tahu</option>
              </select>
            </div>
            <button type="submit" className="w-full lg:text-2xl flex justify-center items-center h-10 lg:h-13 px-2 font-semibold rounded-lg shadow-ku bg-rose-950">
              Kirim Ucapan
              <IoIosSend className="ml-2 lg:text-2xl text-2xl" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Wishes;
