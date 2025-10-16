import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { images } from "../api/data";
import { formatDate, toTitleCase } from "../utils/helper";

const Home = ({ data }) => {
  const [guestName, setGuestName] = useState("Tamu Undangan");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get("to");

    if (nameFromUrl) {
      const formattedName = toTitleCase(decodeURIComponent(nameFromUrl));
      setGuestName(formattedName);
    }
  }, []);
  return (
    <section id="home" className="min-h-[100vh] flex justify-center items-start pt-5">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.3 }} className="bg-gray-100/80 w-[95%] min-h-[88vh] py-4 rounded-xl shadow-ku ">
        <motion.h1 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.3 }} className=" text-center lg:text-2xl md:text-2xl text-lg font-semibold">
          The Wedding Of
        </motion.h1>
        <div className=" flex justify-center mt-8 md:mt-6">
          <div className="lg:w-[50%] md:w-[50%] w-[100%] lg:h-[180px] md:h-[160px] h-[160px] font-great font-semibold text-shadow-yellow-600 text-shadow-sm flex flex-col text-rose-950">
            <motion.div
              initial={{ opacity: 0, x: -120, scale: 0.2 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.3 }}
              className="lg:text-6xl md:text-6xl text-[46px] text-center"
            >
              {data ? data.nickname_mp : "Romeo"}
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.3 }} className="lg:text-3xl md:text-3xl text-2xl text-center">
              &
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 0.2 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
              className="lg:text-6xl md:text-6xl text-[46px] text-center"
            >
              {data ? data.nickname_mw : "Juliete"}
            </motion.div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center  mt-4">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} viewport={{ once: false, amount: 0.3 }} className="font-semibold">
            <p className="text-center lg:text-xl md:text-xl text-base text-rose-950 font-one">
              {data
                ? formatDate(data.date_akad, {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "31 Desember 2026"}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.3 }} className="mx-auto">
            <img src={images.flower4} alt="flower" className="lg:w-55 md:w-55 w-40 lg:h-40 md:h-40 h-30 animate-zoomIn" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} viewport={{ once: false, amount: 0.3 }} className="lg:text-xl md:text-xl text-base font-noto lg:mb-6 md:mb-6 mb-3">
            <p className="text-center">Kepada Yth.</p>
            <p className="text-center">Bapak/Ibu/Saudara/i</p>
            <div className=" w-[80%] lg:w-[60%] md:w-[60%] rounded-lg shadow-ku mx-auto py-4 px-2 bg-white/60 mt-2">
              <p className="text-center lg:text-xl md:text-xl text-base font-bold lg:mb-6 md:mb-6 mb-2">{guestName}</p>
              <p className="text-center lg:text-xl md:text-xl text-base">Di tempat</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
