import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { formatPriceToVND } from '../../helper'

export default function ProductPreview({id, imageURL, name, price, salePercent = null, outOfStock = false, onSale = false}) {
    const { ref, inView } = useInView()
    const [visible, setVisible] = useState(false)
    
    useEffect(() => {
        if (!inView) return
        setVisible(true)
    }, [inView])

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div ref={ref} className={`${visible ? 'motion-safe:animate-fadeIn' : ''} group p-3 h-64 w-60 bg-white shadow-lg rounded-md overflow-hidden relative opacity-0 translate-y-5`}>
            <div className="absolute inset-0 bg-gray-900/70 flex justify-center items-center -translate-y-full group-hover:translate-y-0 transform transition duration-500 ease-in-out">
                <Link to={`/product/${id}`} onClick={scrollToTop}>
                    <button className="py-2 px-3 bg-white text-gray-900 font-medium text-lg rounded-sm outline-none hover:-translate-y-1 hover:shadow-xl transform transition focus:ring focus:ring-blue-500 focus:bg-gray-400">
                        More details
                    </button>
                </Link>
            </div>
            <div className="flex justify-between h-7">
                
                {salePercent ? <span className="py-0.5 px-1.5 bg-blue-700 text-white rounded-lg" >-{salePercent}%</span> : ''}
                
                <span className="text-red-500">
                    {outOfStock ? 'Out of stock' : ''}
                </span> 
            </div>
            <div className="text-center space-y-1 mt-2">
                <div className="h-32 w-44 mx-auto flex justify-center items-center">
                    <img className="max-h-full max-w-full object-contain bg-gray-400" src={imageURL} alt={name}/>
                </div>
                <div>
                  <h3 className="text-lg">{name}</h3>
                    <p className="text-base text-blue-800">
                        {onSale
                            ? (<>
                                <span className="text-xs line-through text-red-500">{formatPriceToVND(price)}</span>
                                <span className="ml-1">{formatPriceToVND(price - price * salePercent / 100)}</span>
                                </>)
                            : (<span>{formatPriceToVND(price)}</span>)
                        }
                    </p>  
                </div>
            </div>
        </div>
    )
}
