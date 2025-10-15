import { motion } from "motion/react";
import { formatDate2 } from "../utils/helper";

const LoveStory = ({ data }) => {
  return (
    <section id="loveStory" className="min-h-[100vh] flex justify-center items-start pt-5 font-noto mb-4">
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: false, amount: 0.3 }} className="bg-gray-100/80 w-[95%] min-h-[88vh] py-5 rounded-xl shadow-md shadow-ku">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center lg:text-6xl md:text-5xl text-5xl mb-6 font-bold font-great text-rose-950"
        >
          Love Story
        </motion.h1>
        <div className="flex justify-center gap-4 items-center flex-col">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="bg-rose-900/10 w-[94%] shadow-ku rounded-bl-3xl rounded-tr-3xl px-4 py-2"
          >
            <p className="font-one lg:text-2xl md:text-xl text-lg text-rose-950 font-semibold">Awal Bertemu</p>
            <p className="font-semibold text-gray-800 lg:text-lg md:text-base text-sm">{data?.date_bertemu ? formatDate2(data.date_bertemu) : "01 Januari 2025"}</p>
            <p className="lg:text-xl md:text-lg">{data?.story_bertemu ? data.story_bertemu : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque explicabo optio tempore nemo, repellendus maxime? Cumque."}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="bg-rose-900/10 w-[94%] shadow-ku rounded-bl-3xl rounded-tr-3xl px-4 py-2"
          >
            <p className="text-right font-one lg:text-2xl md:text-xl  text-lg text-rose-950 font-semibold">Komitmen</p>
            <p className="text-right font-semibold text-gray-800 lg:text-lg md:text-base text-sm">{data?.date_komitmen ? formatDate2(data.date_komitmen) : "3 Februari 2025"}</p>
            <p className="lg:text-xl md:text-lg">{data?.story_komitmen ? data.story_komitmen : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque explicabo optio tempore nemo, repellendus maxime? Cumque."}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="bg-rose-900/10 w-[94%] shadow-ku rounded-bl-3xl rounded-tr-3xl px-4 py-2"
          >
            <p className="font-one lg:text-2xl md:text-xl text-lg text-rose-950 font-semibold">Lamaran</p>
            <p className="font-semibold text-gray-800 lg:text-lg md:text-base text-sm">{data?.date_lamaran ? formatDate2(data.date_lamaran) : "20 Oktober 2025"}</p>
            <p className="lg:text-xl md:text-lg">{data?.story_lamaran ? data.story_lamaran : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque explicabo optio tempore nemo, repellendus maxime? Cumque."}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            className="bg-rose-900/10 w-[94%] shadow-ku rounded-bl-3xl rounded-tr-3xl px-4 py-2"
          >
            <p className="text-right font-one lg:text-2xl md:text-xl text-lg text-rose-950 font-semibold">The Wedding</p>
            <p className="text-right font-semibold text-gray-800 lg:text-lg md:text-base text-sm">{data?.date_wedding ? formatDate2(data.date_wedding) : "20 Oktober 2025"}</p>
            <p className="lg:text-xl md:text-lg">{data?.story_wedding ? data.story_wedding : "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque explicabo optio tempore nemo, repellendus maxime? Cumque."}</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoveStory;
