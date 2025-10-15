import React from "react";
import { motion } from "motion/react";
import { images } from "../api/data";

const Intro = ({ data }) => {
  return (
    <section id="intro" className="min-h-[100vh] flex justify-center items-start pt-5 font-noto">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.3 }} className="bg-gray-100/80 w-[95%] min-h-[88vh] py-9 rounded-xl shadow-ku">
        <motion.h5
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center lg:text-xl md:text-xl  text-base mb-4 font-semibold text-rose-950"
        >
          Assalamu’alaikum Wr. Wb.
        </motion.h5>
        <motion.p initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} viewport={{ once: false, amount: 0.3 }} className="text-center lg:text-xl md:text-lg text-[16px] px-4 mb-9">
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta’ala, insyaaAllah kami akan menyelenggarakan acara pernikahan
        </motion.p>
        <div className="grid grid-cols-[5fr_2fr_5fr] gap-0 px-4 items-center  relative">
          <motion.img
            initial={{ rotateY: 90 }}
            whileInView={{ rotateY: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            src={data?.foto_mp ? `https://brewokode.site/storage/${data.foto_mp}` : images.img_male}
            alt="male"
            className="lg:h-40 md:h-40 h-33 lg:w-40 md:w-40 w-33 object-cover rounded-full shadow-btn mx-auto"
          />
          <img src={images.flower1} alt="flower" className="rotate-130  mt-8 animate-zoomIn" />
          <motion.img
            initial={{ rotateY: 90 }}
            whileInView={{ rotateY: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            src={data?.foto_mw ? `https://brewokode.site/storage/${data.foto_mw}` : images.img_famale}
            alt="famale"
            className="lg:h-40 md:h-40 h-33  lg:w-40 md:w-40 w-33 object-cover rounded-full shadow-btn mx-auto"
          />
        </div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} viewport={{ once: false, amount: 0.3 }} className="flex flex-col items-center justify-center gap-2 lg:mt-10 mt-8 ">
          <div className="flex w-[90%] flex-col items-center justify-center ">
            <p className="font-one text-rose-950 lg:text-3xl md:text-2xl text-lg font-semibold">{data ? data.fullname_mp : "Raden Mas Romeo"}</p>
            <p className="lg:text-xl md:text-lg text-[14px] text-center text-gray-900 font-noto">
              Putra dari Bapak {data ? data.fullname_bmp : "(Nama Bapak)"} & Ibu {data ? data.fullname_imp : "(Nama Ibu)"}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="lg:w-30 w-12 h-[2px] bg-rose-950"></div>
            <div className="font-one lg:text-2xl text-lg font-semibold text-rose-950">&</div>
            <div className="lg:w-30 w-12 h-[2px] bg-rose-950"></div>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <p className="font-one text-rose-950 lg:text-3xl md:text-2xl text-lg font-semibold">{data ? data.fullname_mw : "Raden Mas Romeo"}</p>
            <p className="lg:text-xl  md:text-lg text-[14px] text-center text-gray-900 font-noto">
              Putri dari Bapak {data ? data.fullname_bmw : "(Nama Bapak)"} & Ibu {data ? data.fullname_imw : "(Nama Ibu)"}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Intro;
