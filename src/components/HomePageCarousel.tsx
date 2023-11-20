"use client"

import React from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Image from "next/image"

export default function SimpleSlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    //style: { width: '100vw', height: '33vw' },
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear"
  }

  return (
    // <div>
    //   <h2>Single Item </h2>
    <Slider  {...settings}>



      {/* <div  style={{ width: '100px', height: '100px' }}> */}
      {/* <div style={{ width: '500px', height: '300px' }}> */}
      {/* <div className = "overflow-hidden "> */}
      <div >
        {/* <AspectRatio ratio={1}> */}
        <Image

          //role="group"
          //key={index}
          //aria-roledescription="slide"
          // src="/images/mvp-slide-1.webp"
          src="/images/new-1.png"
          alt=""
          //fill
          // width={1500}
          // height={500}
          width={2000}
          height={500}

          //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg"
        />
      </div>
      <div>
        {/* <Image

              src="/images/space.webp"
              alt=""
              //fill
              width={3536}
              height={2357}
              //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

            /> */}
        {/* <AspectRatio ratio={3/1}>  */}
        <Image

          // src="/images/mvp-slide-2.webp"
          src="/images/new-2.png"

          alt=""
          width={2000}
          height={500}
          // fill
          className="rounded-lg"
        //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* </AspectRatio>  */}
      </div>

      <div>
        {/* <div className = "overflow-hidden"> */}
        <Image

          src="/images/new-3.png"
          alt=""
          //fill
          width={2000}
          height={500}
          className="rounded-lg"
        //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        //overflow-hidden

        />

      </div>
      {/* <div>
            <Image
              src="/images/4.png"
              alt=""
              width={2000}
              height={500}
              className="rounded-lg"
            />
          
        </div> */}
      {/* <div>
            <Image
              src="/images/mvpSlide-five.webp"
              alt=""
              width={3000}
              height={1000}
              className="rounded-lg"
            />
          
        </div> */}
      {/* <div>
            <Image
              src="/images/mvpSlide-six.webp"
              alt=""
              // width={1500}
              // height={500}
              width={3000}
              height={1000}
              className="rounded-lg"
            />
          
        </div> */}
      {/* <div>
            <Image
              src="/images/background-6.webp"
              alt=""
              width={3000}
              height={1000}
              className="rounded-lg"
            />
          
        </div> */}
      {/* <div>
            <Image
              src="/images/slide-seven.png"
              alt=""
              width={1500}
              height={500}
              className="rounded-lg"
            />
          
        </div> */}
    </Slider>

  )

}
