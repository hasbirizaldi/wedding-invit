import { motion } from "motion/react";
import { gallery } from "../api/data";

const End = ({ data }) => {
  const galleries = data?.galleries ? JSON.parse(data.galleries) : [];

  const galleryImage = galleries[0] ? `https://brewokode.site/storage/${galleries[0]}` : gallery.gallery1;

  const male = data ? data.fullname_mp?.split(" ")[0] : "Romeo";
  const famale = data ? data.fullname_mw?.split(" ")[0] : "Juliete";

  return (
    <section id="end" className="min-h-[110vh] flex justify-center items-start pt-5  font-noto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
        className="bg-gray-100/80 w-[95%] min-h-[88vh] py-5 px-4 rounded-xl shadow-md shadow-ku"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-6 font-semibold lg:text-xl text-base pt-6 text-slate-900"
        >
          Atas kehadiran dan do’a restu dari Bapak/Ibu/Saudara/i sekalian, kami mengucapkan Terima Kasih.
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: false, amount: 0.3 }} className="text-center text-rose-950 font-bold lg:text-2xl text-lg mb-6">
          Wassalamu’alaikum Wr. Wb.
        </motion.div>
        <div>
          <motion.img
            initial={{ opacity: 0, rotateY: 90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            src={galleryImage}
            alt="couple"
            className="rounded-full object-cover object-top lg:h-110 h-70 lg:w-110 w-70 mx-auto shadow-btn border-2 border-pink-950 lg:mb-6"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center lg:mb-6 mb-3 font-semibold lg:text-xl text-base pt-6 text-slate-900"
        >
          Kami yang berbahagia
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: false, amount: 0.3 }} className="text-center text-rose-950 font-semibold lg:text-4xl text-2xl font-one">
          {male} & {famale}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default End;
