import React from 'react';
import Hero from './Hero'
import IntroGrid from "./IntroGrid";
import FeaturedProducts from "./FeaturedProducts";
import NewArrival from "./NewArrival";
import Testimonials from './Testimonials';

export default function Home() {
    return (
        <>
            <Hero />
            <IntroGrid />
            <FeaturedProducts />
            <NewArrival />
            <Testimonials />
        </>
    )
}
