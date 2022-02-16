import React from 'react'
import bannerImage from '../../assets/man-banner.png'

export default function Hero() {
    return (
        <div className="p-8 flex w-100 max-h-96 justify-center items-center">
            <div className="space-y-4">
                <h1 className="text-6xl text-gray-900 font-bold leading-none">men's <br/> collection</h1>
                <p className="text-lg text-gray-900 font-normal">from t-shirt, jeans, jacket, watches, bags and sunglasses</p>
                
                <button 
                    className="py-4 px-6 mt-4 bg-gray-900 text-white rounded font-bold hover:opacity-70 transition transform
                    focus:ring focus:ring-offset-2 focus:ring-gray-900"
                    onClick={() => {
                        const rect = document.getElementById('featured-products')?.getBoundingClientRect()
                        if (!rect) return
                        window.scrollTo({
                            top: rect.top,
                            behavior: 'smooth'
                        })
                    }}
                >SHOP NOW</button>
            </div>
            <div className="hidden md:inline-block pointer-events-none">
                <img className="-translate-y-14 pointer-events-none" src={bannerImage} alt='banner'/>
            </div>
        </div>
    )
}