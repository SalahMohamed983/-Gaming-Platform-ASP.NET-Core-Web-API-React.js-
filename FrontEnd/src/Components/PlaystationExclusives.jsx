import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const games = [
  {
    title: "God of War: Ragnarök",
    description:
      "Kratos and Atreus must journey to each of the Nine Realms in search of answers as they prepare for the prophesied battle that will end the world. Togethe...",
    image:
      "/ImagesGaming/1c305096502c475c00276c827f0fd697.webp", // ضع صورة مناسبة
  },
  {
    title: "Horizon Forbidden West",
    description:
      "Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes as you return to the far-future, post-...",
    image:
      "/ImagesGaming/048b46cdc66cbc7e235e1f359c2a77ec.webp", // ضع صورة مناسبة
  },
  {
    title: "Horizon Forbidden West",
    description:
      "Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes as you return to the far-future, post-...",
    image:
      "/ImagesGaming/709bf81f874ce5d25d625b37b014cb63.webp", // ضع صورة مناسبة
  },
  {
    title: "Horizon Forbidden West",
    description:
      "Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes as you return to the far-future, post-...",
    image:
      "/ImagesGaming/bf73b105ccbba42107986bbcd96fcada.webp", // ضع صورة مناسبة
  },
  {
    title: "Horizon Forbidden West",
    description:
      "Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes as you return to the far-future, post-...",
    image:
      "/ImagesGaming/f2493ea338fe7bd3c7d73750a85a0959.jpg", // ضع صورة مناسبة
  },
  

];

export default function PlaystationExclusives() {
  return (
    <div className="">
      <div className=" flex justify-between items-center my-6">
        <h1 className="text-white text-3xl font-bold">PLAYSTATION EXCLUSIVES</h1>
        <a href="#" className="text-pink-400 font-medium hover:underline">
          Browse All Games
        </a>
      </div>

  <Swiper
  spaceBetween={20}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
   slidesPerView={1}
  breakpoints={{
    1024: { slidesPerView: 2 },
  }}
    modules={[Autoplay]}
  className="!h-[240px] !mt-10"
>
        {games.map((game, index) => (
<SwiperSlide key={index} className="">
<Card
            className=" !bg-[#2f2f2f]  flex flex-row !h-full !rounded-2xl shadow-lg !overflow-hidden"
          >
            {/* النص */}
            <CardContent className="flex-1 self-center text-white">
              <Typography variant="h6" className="!font-bold">
                {game.title}
              </Typography>
              <hr className="my-2 border" />
              <Typography variant="body2" className="opacity-80 !leading-7">
                {game.description}
              </Typography>
            </CardContent>

            {/* الصورة */}
            <CardMedia
              component="img"
              image={game.image}
              alt={game.title}
              className="!w-[40%] !hidden md:!inline  "
            />
          </Card>
</SwiperSlide>
       
        ))}
</Swiper>
      
    </div>
  );
}
