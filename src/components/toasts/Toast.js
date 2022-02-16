import React, { useEffect, useState } from 'react'
import { COLOR_MAP } from '../main/ProductDetails'


export default function Toast({ name, imageURL, chosenColor, chosenSize, amount, toastedAt }) {
    const [status, setStatus] = useState('show')

    useEffect(() => {
       const timeout = setTimeout(() => {
            setStatus('hide')
       }, 5000) 

       return () => {
           clearTimeout(timeout)
       }
    }, [])

    const transformMap = {
        'show': 'opacity-100',
        'hide': 'opacity-0 -translate-y-full'
    }

    return (
        <div className={`${transformMap[status]} max-w-64 p-4 rounded-md shadow-xl bg-white transform transition duration-700`}>
            <h2 className="font-md text-base">This item has been added to your cart</h2>
            <div className="flex items-center space-y-3 gap-4">
                <div className="w-16 h-16">
                    <img className="max-w-full max-h-full" src={imageURL} alt={name} />
                </div>
                <div>
                    <h3 className="text-sm">{name}</h3>
                    <div className="flex justify-start items-start text-sm">
                        Color: &nbsp;
                        <div className={`${COLOR_MAP[chosenColor]} w-5 h-5 rounded-full inline-block text-sm`} /> 
                    </div>
                    <p>Size: {chosenSize}</p>
                    <p className="py-1 px-2 bg-gray-200 w-fit text-sm">&times;{amount}</p>
                </div>
            </div>
        </div>
    )
}
