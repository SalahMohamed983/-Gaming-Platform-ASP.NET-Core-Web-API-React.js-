import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Thumbs } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import SwipperGames from "./SwipperGames";
import PlaystationExclusives from "./PlaystationExclusives";
import { Typography } from "@mui/material";

export default function Home() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <main className=" pt-5 pb-10 px-2 md:px-6">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}       
         modules={[Autoplay, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
            className="rounded-2xl  overflow-hidden shadow-lg"
      >
        {/* ====== السلايد الأول ====== */}
        <SwiperSlide >
          <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
            <video
              className="absolute  inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/ImagesGaming/spidervideo.mp4" type="video/mp4" />
            </video>

            {/* النص مع الأنيميشن */}
            <div className="absolute sm:bottom-20 bottom-7  sm:left-18 flex flex-col justify-center items-start px-10 text-white">
              <motion.img
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                src="/ImagesGaming/news1title.webp"
                className="w-[400px]"
              />

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false }}
                className="text-3xl sm:text-sm font-bold mt-10 mb-2"
              >
                Marvel Spider-Man 2
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: false }}
                className="max-w-lg sm:text-sm mb-4"
              >
                Peter Parker & Miles Morales return for an exciting new
                adventure in the acclaimed Marvel’s Spider-Man franchise.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: false }}
                className="bg-red-500 sm:text-sm hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
              >
                Find out more!
              </motion.button>
            </div>
          </div>
        </SwiperSlide>

        {/* ====== السلايد الثاني ====== */}
        <SwiperSlide>
          <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/ImagesGaming/call-of-duty-black-ops-6-animated-hero-mobile-01-en-22may24.mp4" type="video/mp4" />
            </video>
            <div className="absolute sm:bottom-20 bottom-7 sm:left-18 flex flex-col justify-center items-start px-10 text-white">
              <motion.img
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                src="/ImagesGaming/call-of-duty-black-ops-6-logo-01-en-21may24.webp"
                className="w-[400px]"
              />
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false }}
                className="text-3xl font-bold sm:text-sm mt-10 mb-2"
              >
                Call of Duty: Modern Warfare
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: false }}
                className="max-w-lg mb-4 sm:text-sm"
              >
                Experience the most intense COD campaign and multiplayer modes.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: false }}
                className="bg-amber-700 hover:bg-amber-600  px-4 py-2 rounded-lg font-semibold"
              >
                Play now
              </motion.button>
            </div>
          </div>
        </SwiperSlide>

        {/* ====== السلايد الثالث ====== */}
        <SwiperSlide>
          <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src="/ImagesGaming/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.jpg"
              alt="Dragon Ball"
            />
            <div className="absolute sm:bottom-20 bottom-7 sm:left-18 flex flex-col justify-center items-start px-10 text-white">
              <motion.img
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                src="/ImagesGaming/Dragon-Ball-Sparking-Zero-logo-01-03oct24.webp"
                className="w-[400px]"
              />
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false }}
                className="text-3xl font-bold mt-10 mb-2 sm:text-sm"
              >
                Dragon Ball Z Fighter
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: false }}
                className="max-w-lg mb-4 sm:text-sm"
              >
                Relive epic DBZ battles with stunning visuals and combat action.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: false }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
              >
                Discover more
              </motion.button>
            </div>
          </div>
        </SwiperSlide>

        {/* ====== السلايد الرابع ====== */}
        <SwiperSlide>
          <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/ImagesGaming/cyberpunk-2077-phantom-liberty-video-hero-01-en-11sep23.mp4" type="video/mp4" />
            </video>

            <div className="absolute bottom-20 sm:left-18 flex flex-col justify-center items-start px-10 text-white">
              <motion.img
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false }}
                src="/ImagesGaming/iconcyber.webp"
                className="w-[400px]"
              />
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: false }}
                className="text-3xl sm:text-sm font-bold mt-10 mb-2"
              >
                Cyberpunk 2077
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: false }}
                className="max-w-lg mb-4 sm:text-sm"
              >
                Dive into the neon city of Night City with thrilling RPG action.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: false }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
              >
                Explore now
              </motion.button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
     {/* ====== Thumbnail Swiper ====== */}
     <Swiper
  onSwiper={setThumbsSwiper}
  spaceBetween={10}
  slidesPerView={4}
  breakpoints={{
    1024: {  spaceBetween: 20 },  // ديسكتوب
  }}
  watchSlidesProgress
  modules={[Thumbs]}
  className=" !overflow-visible thumbs-swiper !mt-3"
>
  {[
    { id: 1, img: "/ImagesGaming/poster.jpg" },
    { id: 2, img: "/ImagesGaming/call-of-duty-black-ops-6-hero-desktop-01-en-21may24.jpg" },
    { id: 3, img: "/ImagesGaming/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.jpg" },
    { id: 4, img: "/ImagesGaming/cyb.jpg" },
  ].map((ele) => (
    <SwiperSlide key={ele.id}>
      <div className="relative transform transition duration-500 hover:translate-y-5">
        {/* overlay */}
        <div
          className="absolute inset-0 bg-gray-50 opacity-0 hover:opacity-20 transition duration-500 rounded-lg"
        ></div>

        {/* image */}
     <img
  src={ele.img}
  alt="game-thumb"
  className="rounded-lg w-full h-[70px] md:h-[150px] object-cover"
/>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
{/* ///////////////////////////////// */}
    <h1 className="text-white text-3xl font-bold mt-10">Top Games for PS5</h1>
<SwipperGames cat={2}/>
    <h1 className="text-white text-3xl font-bold mt-10">Top Games</h1>
<SwipperGames cat="Top"/>
  <PlaystationExclusives />
    <h1 className="text-white text-3xl font-bold mt-10">Top PC Games</h1>
<SwipperGames cat={3}/>
{/* ////////////////////////////////// */}
    </main>
  );
}
