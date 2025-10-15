import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { gallery } from "../api/data";

const SwiperGallery = ({ data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const demoGalleries = Object.values(gallery);
  const galleryDB = data?.galleries;

  let parsedGalleries = [];
  try {
    parsedGalleries = typeof galleryDB === "string" && galleryDB.trim() !== "" ? JSON.parse(galleryDB) : Array.isArray(galleryDB) ? galleryDB : [];
  } catch (err) {
    console.error("Error parsing galleries:", err);
    parsedGalleries = [];
  }

  const galleryArray = parsedGalleries.length > 0 ? parsedGalleries : demoGalleries;

  return (
    <>
      <div className="w-[95%] max-w-2xl mx-auto relative z-0">
        {/* Swiper Utama */}
        <Swiper modules={[Thumbs, Navigation]} thumbs={{ swiper: thumbsSwiper }} navigation className="mb-4">
          {galleryArray.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                loading="lazy"
                onClick={() => {
                  setStartIndex(i);
                  setIsOpen(true);
                }}
                src={parsedGalleries.length > 0 ? `https://brewokode.site/storage/${src}` : src}
                alt={`Thumb ${i + 1}`}
                className="w-full lg:h-200 md:h-190 h-130 object-cover object-center rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail */}
        <Swiper modules={[Thumbs]} onSwiper={setThumbsSwiper} slidesPerView={4} spaceBetween={10} watchSlidesProgress>
          {galleryArray.map((src, i) => (
            <SwiperSlide key={i}>
              <img src={parsedGalleries.length > 0 ? `https://brewokode.site/storage/${src}` : src} alt={`Thumb ${i + 1}`} className="w-full lg:h-40 md:h-35 h-25 object-cover rounded-md cursor-pointer" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-90 flex items-center justify-center">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white text-3xl font-bold">
            ✕
          </button>

          <Swiper modules={[Navigation]} navigation initialSlide={startIndex} className="w-[100vw] h-[80vh]">
            {galleryArray.map((src, i) => (
              <SwiperSlide key={i}>
                <img src={parsedGalleries.length > 0 ? `https://brewokode.site/storage/${src}` : src} alt={`Fullscreen ${i}`} className="w-full h-full object-contain cursor-pointer" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default SwiperGallery;
