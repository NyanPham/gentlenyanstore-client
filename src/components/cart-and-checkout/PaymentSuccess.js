import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function PaymentSuccess() {
    return (
        <section className="h-screen flex-center items-center bg-gray-200">
            <div className="p-8 w-3/5 mx-auto bg-white flex flex-col justify-center items-center gap-4 rounded-lg shadow-lg translate-y-20 md:flex-row md:w-2/5">                
                <div className="p-4 bg-green-500 rounded-full flex justify-center items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-3xl text-white"/>
                </div>
                
                <div>
                    <h2 className="text-2xl font-bold">Success</h2>
                    <p>
                        Your transaction was success. We will deliver your items in about 2-3 days.
                        Thank you.
                    </p>
                </div>
                <Link 
                    to="/" 
                    className="absolute top-full mt-5 py-2 px-3 bg-sky-500 rounded-lg text-base text-white hover:bg-sky-400 hover:-translate-y-1 transform transition active:bg-sky-600"
                >
                    Yeah. Now take me home!
                </Link>
            </div>
        </section>
    )
}
