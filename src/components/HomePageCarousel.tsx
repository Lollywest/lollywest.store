"use client"

import React from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styled from "styled-components"

import Image from "next/image"
import Link from "next/link"
import { AspectRatio } from "@/components/ui/aspect-ratio"


export default function SimpleSlider(){
  
    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // height: "50px",
    // width: "50px"
    arrows: false,
    }
  
  return (
      // <div>
      //   <h2>Single Item </h2>
      <Slider {...settings}>
       
        

        {/* <div  style={{ width: '100px', height: '100px' }}> */}
        {/* <div style={{ width: '500px', height: '300px' }}> */}
          <div className = "rounded-sm">
            {/* <AspectRatio ratio={1}> */}
              <Image
                
                //role="group"
                //key={index}
                //aria-roledescription="slide"
                src="/images/splash.webp"
                alt=""
                //fill
                width={6000}
                height={4000}
                //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                //className="object-cover"
                //className="w-full max-w-screen-xl"
                //className="m-0 p-0 w-full max-w-screen-xl"
              />
            {/* </AspectRatio> */}
          </div>
        {/* </div> */}
        <div className = "overflow-hidden ">
            <Image

              src="/images/space.webp"
              alt=""
              //fill
              width={3536}
              height={2357}
              //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

            />
          
        </div>
        <div>
        <div className = "overflow-hidden">
            <Image

              src="/images/waves.webp"
              alt=""
              //fill
              width={6000}
              height={4000}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              //overflow-hidden
              
            />
          
        </div>
        </div>
        
        <div className = "overflow-hidden">
            <Image

              src="/images/stairs.webp"
              alt=""
              //fill
              width={4288}
              height={2848}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

            />
          
        </div>
        
        <div className = "overflow-hidden">
            <Image

              src="/images/audience.webp"
              alt=""
              //fill
              width={5472}
              height={3648}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              
            />
          
        </div>
      </Slider>
   
      )
  
}

// export default class SimpleSlider extends Component {
//   render() {
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1
//     };
//     return (
//       <div>
//         <h1> Hello hel</h1>
//         <h2> Single Item</h2>
//         <Slider {...settings}>
//           <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//           <div>
//             <h3>4</h3>
//           </div>
//           <div>
//             <h3>5</h3>
//           </div>
//           <div>
//             <h3>6</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }

//import React, { Component } from "react";
// import * as React from "react"

// import Slider from "react-slick";
// import styled from 'styled-components';

// //import * as React from "react";
// import { cva, type VariantProps } from "class-variance-authority";
// //import Slider from "react-slick";

// const sliderVariants = cva(
//   "default-slider-class",
//   {
//     variants: {
//       arrowStyle: {
//         default: "default-arrow",
//         fancy: "fancy-arrow"
//         // ...other styles
//       },
//       dotPosition: {
//         bottom: "dots-bottom",
//         top: "dots-top"
//         // ...other positions
//       }
//     },
//     defaultVariants: {
//       arrowStyle: "default",
//       dotPosition: "bottom"
//     }
//   }
// )

// export interface SimpleSliderProps extends VariantProps<typeof sliderVariants> {
//   //... other props specific to SimpleSlider
// }

// const SimpleSlider = React.forwardRef<HTMLDivElement, SimpleSliderProps>(
//   ({ arrowStyle, dotPosition, ...props }, ref) => {
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1
//       // ... other settings
//     };

//     return (
//       <Slider
//         className={sliderVariants({ arrowStyle, dotPosition })}
//         {...settings}
//         {...props}
//       >
//         {/* ...slides */}
//       </Slider>
//     )
//   }
// )
// SimpleSlider.displayName = "SimpleSlider"

// export { SimpleSlider, sliderVariants }

// export default class SimpleSlider extends Component {
//   render() {
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1
//     };
//     return (
//       <div>
//         <h2> Single Item</h2>
//         <Slider {...settings}>
//           <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//           <div>
//             <h3>4</h3>
//           </div>
//           <div>
//             <h3>5</h3>
//           </div>
//           <div>
//             <h3>6</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }

// export default function SimpleSlider() {
//     var settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1
//     };
//     return (
//       <Slider {...settings}>
//         <div>
//           <h3>1</h3>
//         </div>
//         <div>
//           <h3>2</h3>
//         </div>
//         <div>
//           <h3>3</h3>
//         </div>
//         <div>
//           <h3>4</h3>
//         </div>
//         <div>
//           <h3>5</h3>
//         </div>
//         <div>
//           <h3>6</h3>
//         </div>
//       </Slider>
//     );
// }

// export const SimpleSlider = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div>
//       <h2>Single Item</h2>
//       <Slider {...settings}>
//         <div><h3>1</h3></div>
//         <div><h3>2</h3></div>

//       </Slider>
//     </div>
//   );
// }

// SimpleSlider.displayName = "SimpleSlider"

// export default {SimpleSlider}
