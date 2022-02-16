import React from 'react';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Testimonial({image, text, name}) {
    return (
        <div className="space-y-12 mt-12">
            <div className="w-24 h-24 rounded-full bg-blue-500 bg-cover bg-no-repeat bg-center overflow-hidden mx-auto">
                <img className="object-cover object-top" src={image} alt={name} />
            </div>
            <p className="italic text-2xl w-4/5 text-center mx-auto relative">
                <FontAwesomeIcon className="text-blue-400 absolute -top-3 -left-4" icon={faQuoteLeft}/>
                {text}
                <FontAwesomeIcon className="text-blue-400 absolute -bottom-3 -right-4" icon={faQuoteRight}/>
            </p>
            <p className="text-blue-700 text-2xl italic font-bold text-center">{name}</p>
        </div>
    )
}
