import React from 'react';
import weekendBannerImage from '../../assets/weekend-banner.png'
import { useSelector } from 'react-redux'
import ProductPreview from './ProductPreview';
import { Link } from 'react-router-dom'
import { pageTransitionClick } from '../header/Navbar'

export default function NewArrival() {
    const products = useSelector(state => state.products)
    const newArrivals = products?.filter(product => product.inNewArrival).slice(0, 4)

    return (
        <div className="min-h-screen bg-white" id="new-arrival text-center">
            <div className="flex justify-evenly items-center bg-blue-900">
                <div className="py-4 px-8">
                    <small className="text-xs text-blue-100 sm:text-sm md:text-base">Special Promo</small>
                    <h2 className="text-lg text-blue-300 sm:text-2xl md:text-4xl font-bold mt-2 tracking-wide uppercase">Weekends Sale</h2>
                    <h3 className="text-base text-blue-100 sm:text-lg md:text-2xl mt-4 tracking-wide uppercase">Up to 50% off</h3>
                </div>
                <div className="w-2/4">
                    <img className="translate-y-4 mx-auto max-h-full max-w-full" src={weekendBannerImage} alt='boy-sitting'/>
                </div> 
            </div>
            <div className="showroom bg-white">
                <h2 className="text-center text-3xl text-gray-900 uppercase tracking-wide font-bold my-3">New Arrival</h2>
                <div className="flex gap-4 justify-evenly items-center flex-wrap">
                    {newArrivals.length > 0 && (
                        newArrivals.map(item => (
                            <ProductPreview key={item.code} {...item}/>
                        ))
                    )}
                </div>
               <Link to="/items/inNewArrival" className="mx-auto">
                    <button className="show-btn" onClick={pageTransitionClick}>Show All</button>
                </Link>
            </div>
        </div>
    )
}
