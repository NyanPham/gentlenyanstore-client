import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faBoxOpen, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import manSunglasses from '../../assets/glasses.jpg'
import manJump from '../../assets/man-jump.png'
import manShirt from '../../assets/man-shirt.jpg'
import shoes from '../../assets/shoes.jpg'
import { Link } from 'react-router-dom'

export const BENEFITS = [
    {
        icon: faTruck,
        name: 'Free Shipping',
        description: 'Free shipping on orders above VND 200,000'
    },
    {
        icon: faBoxOpen,
        name: '30 Days Return',
        description: 'Simply return it within 30 days for an exchange'
    },
    {
        icon: faHandHoldingUsd,
        name: '100% Payment Secure',
        description: 'Simply return it within 30 days for an exchange'
    }
]

function Benefit({ icon, name, description }) {
    return (
        <div className="p-6 bg-gray-400 flex justify-center items-center gap-4">
            <FontAwesomeIcon icon={icon} className="text-5xl text-gray-700" />
            <div>
                <h3 className="text-gray-900 font-bold text-lg">{name}</h3>
                <p className="text-gray-800 text-normal font-normal">{description}</p>
            </div>
        </div>
    )
}


export default function IntroGrid() {
    return (
        <section className="bg-white">
            <div className="flex flex-col gap-0.5 md:flex-row">
                {BENEFITS.map((benefit, index) => (
                    <Benefit 
                        key={`benefit_${index}`}
                        icon={benefit.icon}
                        name={benefit.name}
                        description={benefit.description}
                    />
                ))}
            </div>
            <div className="py-8 px-16 h-100 grid grid-cols-1 grid-rows-5 justify-center gap-2 items-center relative max-auto md:grid-rows-3 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
                <div 
                    className="relative order-1 h-60 w-full bg-cover bg-no-repeat bg-center md:order-2 lg:order-1" 
                    style={{backgroundImage: `url(${manSunglasses})`, backgroundColor: 'rgba(0,0,0,0.3)', backgroundBlendMode: 'multiply'}}
                >
                    <div className="absolute bottom-10 left-5 space-y-2">
                      <h3 className="text-2xl text-white font-bold uppercase tracking-wide">Men's sunglasses</h3>
                        <Link to="/items/sunglasses" className="block">
                            <button 
                                className="py-2 px-4 border-2 border-white text-white text-lg
                                hover:-translate-y-1 hover:bg-white hover:text-gray-900
                                transform transition rounded-sm"
                            >Shop now</button>
                        </Link>
                    </div>
                </div>
                <div 
                    className="relative order-2 h-60 w-full bg-cover bg-no-repeat bg-blue-700 -scale-x-100 md:order-3 lg:order-2" 
                    style={{backgroundImage: `url(${manJump})`, backgroundPosition:'10% 30%' }}
                >
                    <div className="absolute bottom-10 right-5 space-y-2 -scale-x-100">
                      <h3 className="text-2xl text-white font-bold uppercase tracking-wide">Men's sneakers</h3>
                        <Link to="/items/sneakers" className="block">
                            <button 
                                className="py-2 px-4 border-2 border-white text-white text-lg
                                hover:-translate-y-1 hover:bg-white hover:text-gray-900
                                transform transition rounded-sm"
                            >Shop now</button>
                        </Link>
                    </div>
                </div>
                <div 
                    className="relative order-3 row-span-2 h-full w-full bg-cover bg-no-repeat md:row-span-2 md:order-1 lg:col-span-1 lg:order-3" 
                    style={{backgroundImage: `url(${manShirt})`, backgroundPosition:'10% 30%' }}
                >
                    <div className="absolute bottom-10 left-5 space-y-2">
                      <h3 className="text-2xl text-white font-bold uppercase tracking-wide">Men's T-shirt</h3>
                        <Link to="/items/t-shirts" className="block">
                            <button 
                                className="py-2 px-4 border-2 border-white text-white text-lg
                                hover:-translate-y-1 hover:bg-white hover:text-gray-900
                                transform transition rounded-sm"
                            >Shop now</button>
                        </Link>
                    </div>
                </div>

                <div 
                    className="order-4 relative h-60 w-full bg-cover bg-no-repeat md:col-span-2" 
                    style={{backgroundImage: `url(${shoes})`, backgroundPosition:'center 70%' }}
                >
                    <div className="absolute bottom-10 left-5 space-y-2">
                      <h3 
                        className="text-white uppercase tracking-wide"
                    >
                        <span className="text-sm">men's shoes</span>
                        <p className="text-2xl font-bold">collection</p>
                    </h3>
                        <Link to="/items/footwear" className="block">
                            <button 
                                className="py-2 px-4 border-2 border-white text-white text-lg
                                hover:-translate-y-1 hover:bg-white hover:text-gray-900
                                transform transition rounded-sm"
                            >Shop now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}


