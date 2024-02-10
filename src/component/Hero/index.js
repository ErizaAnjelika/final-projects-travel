import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { textSlide } from "@/const";

const Hero = () => {
  return (
    <div className="flex mt-20">
      <section className="relative bg-center w-full">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
          >
            <source src="./vidio/vidio.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 font-extrabold tracking-tight leading-none text-white lg:text-5xl md:text-4xl text-2xl">
            Jelajahi Tempat Impianmu
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Petualanganmu menanti, di mana kisah sejarah yang kaya dan
            warna-warni budaya hidup dengan gemilang.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
