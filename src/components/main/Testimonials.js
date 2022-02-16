import React from 'react';
import James from '../../assets/james.jpg'
import Laurence from '../../assets/laurence.jpg'
import Taylor from '../../assets/taylor.jpg'
import Testimonial from './Testimonial'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

const TESTIMONIES = [
    {
        image: James,
        name: 'James Bars',
        text: 'Although I have bought clothes from this shop several times, I\'m always satisfied by their product quality and service. Really want to recommend you all to this shop.'
    },
    {
        image: Laurence,
        name: 'Laurence Cruz',
        text: 'First experience. In the words of my wife, “I have never seen something fit you that well”. They customs suit world feel right at home. Class act!'
    },
    {
        image: Taylor,
        name: 'Taylor',
        text: 'GentleNyan\'s is outstanding. Tremendous customer service and great selection of clothing. They also offers very personalized service.'
    }
]

export default function Testimonials() {
    return (
        <div className="bg-gray-200 py-10 px-8 relative z-0">
            <h2 className="my-4 text-3xl text-gray-900 text-center font-bold uppercase tracking-wide">Customer Testimonials</h2>
            <Swiper 
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={1}
                navigation={{clickable: true}}
            >
                {TESTIMONIES?.map(testimonial => (
                    <SwiperSlide key={testimonial.name}>
                        <Testimonial {...testimonial}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
