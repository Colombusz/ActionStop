import React from 'react';

import { HeroParallax } from './ui/hero-parallax';
import { TextHoverEffect } from './ui/text-hover-effect';

function About() {
  return (
    
    <div className='bg-zinc-900 w-full'>
        {/* PARALLAX */}
        <HeroParallax products={products} />;   

        {/* TEXT HOVER EFFECT */}
        <div className="h-[40rem] flex items-center justify-center">
            <TextHoverEffect text="ACSTP" />
        </div>

        
        {/* MACBOOK SCROLL */}
        {/* <div className="overflow-hidden dark:bg-[#0B0B0F] bg-black w-full">
            <MacbookScroll
                title={
                <span>
                    Your ActionStop Shop for Figurines <br /> No kidding.
                </span>
                }
                showGradient={false}
            />
        </div> */}

        {/* SPARKLES */}
        {/* <div className="h-[40rem] w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
                ActionStop Figurines
            </h1>
            <div className="w-full h-40 relative">
                
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={1200}
                className="h-full"
                particleColor="#FFFFFF"
                />

                <div className="absolute inset-0 w-full h-full bg-transparent [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
        </div> */}
    </div>

    
       

      


    
  );
}

export const products = [
    {
      title: "Waifu1",
      thumbnail:
        "https://m.media-amazon.com/images/I/51iJ8XsUFdL._AC_SL1000_.jpg",
    },
    {
        title: "Waifu2",
        thumbnail:
          "https://i.pinimg.com/originals/0e/5f/04/0e5f0414836f8e5df3d8f6fb0689eb50.jpg",
      },
      {
        title: "Waifu3",
        thumbnail:
          "https://i.pinimg.com/originals/7b/77/ba/7b77ba0175533d620ea3823bd23989c3.jpg",
      },
      {
        title: "Waifu4",
        thumbnail:
          "https://ae01.alicdn.com/kf/HTB15v9LLXXXXXbEXpXXq6xXFXXXB/Free-shipping-Japanese-Anime-Figures-Fate-stay-night-Saber-Lily-Doll-the-Sword-of-Victory-Aciton.jpg",
      },
      {
        title: "Waifu5",
        thumbnail:
          "https://i.pinimg.com/originals/90/04/23/900423388cc0f48db718e8bb3b5be0ba.jpg",
      },
      {
        title: "Waifu6",
        thumbnail:
          "https://ae01.alicdn.com/kf/HTB1YviiXfjsK1Rjy1Xaq6zispXal/15cm-Action-Figure-Yukino-Yukinoshita-Kimono-Style-Sexy-Girl-Model-Cartoon-Doll-PVC-Japanese-Figurine-World.jpg",
      },
      {
        title: "Waifu7",
        thumbnail:
          "https://resize.cdn.otakumode.com/full/shop/product/3b1270f41e554c11bc31c5a27b815430.jpg",
      },
      {
        title: "Waifu8",
        thumbnail:
          "https://i.pinimg.com/736x/b5/e2/7a/b5e27a561d368c0d3f59920ab97da115--sao-merch-sword-art-online-figures.jpg",
      },
      {
        title: "Waifu9",
        thumbnail:
          "https://th.bing.com/th/id/OIP.h6uHlLDFokW1qCttZJzocgDMEy?rs=1&pid=ImgDetMain",
      },
      {
        title: "Waifu10",
        thumbnail:
          "https://i.pinimg.com/originals/c3/fc/9d/c3fc9dc4392323ca156ca3dd9c724017.jpg",
      },
      {
        title: "Waifu11",
        thumbnail:
          "https://i.pinimg.com/originals/e4/fb/72/e4fb72b93bb1dbaf7be23ebb09b3544a.jpg",
      },
      {
        title: "Waifu12",
        thumbnail:
          "https://i.pinimg.com/originals/ea/ce/e1/eacee19f1fc0348babbe568496e37219.jpg",
      },
      {
        title: "Waifu13",
        thumbnail:
          "https://i.pinimg.com/originals/ef/3c/da/ef3cda1ba35c70fb8978a7536ab2660c.png",
      },
      {
        title: "Waifu14",
        thumbnail:
          "https://th.bing.com/th/id/OIP.hTv5PxyQC-Y2RJli27t5WgHaKx?w=550&h=800&rs=1&pid=ImgDetMain",
      },
      {
        title: "Waifu15",
        thumbnail:
          "https://th.bing.com/th/id/OIP.S4vclYsFFJ5zzmj-Zhef-wAAAA?rs=1&pid=ImgDetMain",
      },
    
    
  ];

export default About;