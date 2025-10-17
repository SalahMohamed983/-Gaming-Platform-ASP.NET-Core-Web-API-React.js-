import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Thumbs } from "swiper/modules";
import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameByID } from "../../featured/GameSlice";

export default function GameCard()
{
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const {Id} = useParams();
  const dispatch = useDispatch();

  const game = useSelector((state) => state.Games.gamesByCategory[`id-${Id}`]) || {};
    useEffect(() => 
    {

         dispatch(fetchGameByID(Number(Id)));

    }, [dispatch])

    return(
      <div className=" text-white pt-5 pb-10 px-2 md:px-6">
<h2 className=" mb-[10px]">{game.name}</h2>
    <p className=" mb-[30px]">Rating count : <span> {game.rating}</span></p>
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
  {game.images?.map((img) =>(
        <SwiperSlide>
          <div className="relative w-full h-[250px] md:h-[400px] lg:h-[500px]">
             <img
              className="absolute inset-0 w-full h-full object-cover"
              src={img?.imageUrl}
              alt={game.name}
            />
          </div>
        </SwiperSlide>
    ))}

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
  {game.images?.map((ele, idx) => (
    <SwiperSlide key={idx}>
      <div className="relative transform transition duration-500 hover:translate-y-5">
        {/* overlay */}
        <div
          className="absolute inset-0 bg-gray-50 opacity-0 hover:opacity-20 transition duration-500 rounded-lg"
        ></div>

        {/* image */}
     <img
  src={ele.imageUrl}
  alt={game.name}
  className="rounded-lg w-full h-[70px] md:h-[150px] object-cover"
/>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
<p className=" mt-[40px]">
{game.description}
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae architecto tenetur explicabo eveniet dolorem. Veniam possimus odit nostrum corporis. Fugiat, fugit error aliquid eaque voluptate nemo? Quisquam tenetur doloremque veniam.
</p>

      </div>
    );
}
