import React, { useEffect, useRef, useState } from "react";
import Cover from "../components/Cover";
import Home from "../components/Home";
import { GiLoveSong } from "react-icons/gi";
import { sounds } from "../api/data";
import { FaPlay } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { GiSelfLove } from "react-icons/gi";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { GiBigDiamondRing } from "react-icons/gi";
import { FaRegEnvelope } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import Intro from "../components/Intro";
import AkadReception from "../components/AkadReception";
import Gallery from "../components/Gallery";
import LoveStory from "../components/LoveStory";
import Gift from "../components/Gift";
import { ToastContainer } from "react-toastify";
import Wishes from "../components/Wishes";
import End from "../components/End";
import { useParams } from "react-router-dom";
import axios from "axios";

const Main = () => {
  const [visible, setVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { slug } = useParams();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const openInvitation = () => {
    setVisible(false);
    setIsPlaying(true);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (!visible && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true); // <- Tambahkan ini
          })
          .catch((error) => {
            console.warn("Autoplay blocked:", error);
          });
      }
    }
  }, [visible]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://www.brewokode.site/api/wedding/${slug}`);
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return; // <--- pastikan ref ada

    const sections = scrollRef.current.querySelectorAll("section[id]");
    const options = {
      root: scrollRef.current,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [visible]); // <-- bisa tambahkan visible supaya update setelah Cover hilang

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-1">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-[100vh]">
      <div ref={scrollRef} className="lg:w-[650px] md:w-[650px] w-full relative bg-1 overflow-scroll">
        {visible ? (
          <div>
            <Cover openInvitation={openInvitation} data={data} />
          </div>
        ) : (
          <div className="bg-1 relative">
            <section id="home">
              <Home data={data} />
            </section>

            <section id="intro">
              <Intro data={data} />
            </section>
            <section id="akadReception">
              <AkadReception data={data} />
            </section>
            <section id="gallery">
              <Gallery data={data} />
            </section>
            <section id="loveStory">
              <LoveStory data={data} />
            </section>
            <section id="gift">
              <Gift data={data} />
            </section>
            <Wishes />
            <section id="end">
              <End data={data} />
            </section>
            <div
              onClick={toggleMusic}
              className={`fixed top-9 lg:top-10 md:top-10 lg:right-110 md:right-30 right-7 bg-rose-950 lg:w-9 md:w-9 w-7 lg:h-9 md:h-9 h-7 p-1 cursor-pointer rounded-full shadow-btn text-white flex justify-center items-center`}
            >
              {isPlaying ? <GiLoveSong className="text-xl animate-spin" /> : <FaPlay className="text-base" />}
            </div>
            {/* bottom bar */}
            <div className="flex justify-center z-50">
              <ul className="bg-slate-200/80 border-rose-900 h-14 border-2 rounded-xl fixed bottom-1 lg:w-[610px] md:w-[610px] w-[95%] flex gap-1 justify-evenly p-1 shadow-ku">
                <li className={`flex justify-center items-center rounded-md  transition-all ease cursor-pointer w-12  ${activeSection === "home" ? "bg-transparent text-rose-950 border-2 border-rose-900" : "bg-rose-950 text-rose-50"}`}>
                  <a href="#home">
                    <IoHome className="text-[28px]  mx-auto my-auto " />
                  </a>
                </li>
                <li className={` ${activeSection === "intro" ? "bg-transparent text-rose-950 border-2 border-rose-900" : "bg-rose-950 text-rose-50"} flex justify-center items-center rounded-md  transition-all ease cursor-pointer w-14`}>
                  <a href="#intro">
                    <GiSelfLove className="text-3xl  mx-auto my-auto " />
                  </a>
                </li>
                <li
                  className={` ${
                    activeSection === "akadReception" ? "bg-transparent text-rose-950 border-2 border-rose-900" : "bg-rose-950 text-rose-50"
                  } flex justify-center items-center rounded-md  transition-all ease cursor-pointer w-14`}
                >
                  <a href="#akadReception">
                    <MdOutlineEventAvailable className="text-3xl  mx-auto my-auto " />
                  </a>
                </li>
                <li className={` ${activeSection === "gallery" ? "bg-transparent text-rose-950 border-2 border-rose-900" : "bg-rose-950 text-rose-50"} flex justify-center items-center rounded-md  transition-all ease cursor-pointer w-14`}>
                  <a href="#gallery">
                    <IoMdPhotos className="text-3xl  mx-auto my-auto " />
                  </a>
                </li>
                <li className={` ${activeSection === "loveStory" ? "bg-transparent text-rose-950 border-2 border-rose-900" : "bg-rose-950 text-rose-50"} flex justify-center items-center rounded-md  transition-all ease cursor-pointer w-14`}>
                  <a href="#loveStory">
                    <GiBigDiamondRing className="text-3xl  mx-auto my-auto " />
                  </a>
                </li>
                <li className={` ${activeSection === "gift" ? "bg-transparent text-rose-950 border-2 border-rose-900" : "bg-rose-950 text-rose-50"} flex justify-center items-center rounded-md  transition-all ease cursor-pointer w-14`}>
                  <a href="#gift">
                    <FaGift className="text-[27px]  mx-auto my-auto " />
                  </a>
                </li>
                <li className={` ${activeSection === "end" ? "bg-transparent text-rose-950 border-2 border-rose-900" : "bg-rose-950 text-rose-50"} flex justify-center items-center rounded-md  transition-all ease cursor-pointer w-14`}>
                  <a href="#end">
                    <FaRegEnvelope className="text-3xl  mx-auto my-auto " />
                  </a>
                </li>
              </ul>
            </div>
            {/* bottom bar */}
          </div>
        )}
      </div>
      <ToastContainer />
      <audio ref={audioRef} src={sounds.sound2} loop preload="auto"></audio>
    </div>
  );
};

export default Main;
