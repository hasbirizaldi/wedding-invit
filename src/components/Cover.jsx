import { useEffect, useState } from "react";
import CountdownTimer from "./CountDownTimer";
import { FaRegEnvelope } from "react-icons/fa";
import { motion } from "motion/react";
import { formatDate, toTitleCase } from "../utils/helper";

const Cover = ({ openInvitation, data }) => {
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
    <>
      <section id="cover" className="h-[100vh]  flex justify-center items-center ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
          className="bg-gray-100/70 w-[95%] h-[95%] py-4 rounded-xl shadow-ku overflow-hidden"
        >
          <h1 className=" text-center lg:text-2xl md:text-2xl text-lg font-semibold">The Wedding Of</h1>
          <div className=" flex justify-center lg:mt-8 mt-4">
            <div className="lg:w-[55%] md:w-[55%] w-[60%] lg:h-[150px] md:h-[150px] h-[150px] text-shadow-yellow-600 text-shadow-sm font-great font-semibold flex flex-col text-rose-950">
              <p className="lg:text-6xl md:text-6xl text-[46px] text-center animate-zoomIn">{data ? data.nickname_mp : "Romeo"}</p>
              <p className="lg:text-3xl md:text-3xl text-xl text-center">&</p>
              <p className="lg:text-6xl md:text-6xl text-[46px] text-center animate-zoomIn">{data ? data.nickname_mw : "Juliete"}</p>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center  mt-4">
            <div className="font-normal lg:text-2xl md:text-2xl text-lg text-amber-950">
              <p className="text-center font-one">{data ? formatDate(data.date_wedding, { weekday: "long" }).toUpperCase() : "Minggu"}</p>
              <p className="text-center font-one -mt-1">
                {data
                  ? formatDate(data.date_wedding, {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "20 Oktober 2026"}
              </p>
            </div>
            <div className="mx-auto lg:mt-2  md:mt-2 mt-1">
              <CountdownTimer targetDate={data ? data.date_akad : "2026-10-20"} />
            </div>
            <div className="mt-2 lg:text-xl md:text-xl text-base font-noto mb-6">
              <p className="text-center">Kepada Yth.</p>
              <p className="text-center lg:mb-4 md:mb-4 mb-2">Bapak/Ibu/Saudara/i</p>
              <div className="bg-white/65 w-[70%] shadow-ku rounded-lg mx-auto py-4">
                <p className="text-center lg:text-xl md:text-xl text-[16px] font-semibold mb-3">{guestName}</p>
                <p className="text-center lg:text-xl md:text-xl text-base">Di tempat</p>
              </div>
            </div>
            <button
              onClick={openInvitation}
              className="flex justify-center items-center bg-rose-950 lg:w-60 md:w-60 w-45 mx-auto mb-3  py-2  rounded-lg hover:brightness-125 cursor-pointer shadow-ku text-slate-50 lg:text-xl text-sm font-noto font-semibold"
            >
              <FaRegEnvelope className="mr-1 lg:text-2xl md:text-2xl text-lg" />
              Buka Undangan
            </button>
            <p className="lg:text-lg md:text-lg text-xs text-center">*Mohon maaf apabila ada kesalahan penulisan nama/gelar</p>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Cover;
