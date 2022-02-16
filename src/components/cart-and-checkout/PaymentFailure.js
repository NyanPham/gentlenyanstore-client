import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function PaymentFailure() {
    return (
        <section className="h-screen flex-center items-center bg-gray-200">
            <div className="p-8 w-3/5 mx-auto bg-white flex flex-col justify-center items-center gap-4 rounded-lg shadow-lg translate-y-20 md:flex-row md:w-2/5">
                <div className="py-3 px-4 bg-red-500 rounded-full flex justify-center items-center">
                    <FontAwesomeIcon icon={faTimes} className="text-3xl text-white"/>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Failure</h2>
                    <p>
                        Your transaction did not succeed. You were not charged for the transaction. If you were charged by all means, contact us for solution.
                    </p>
                </div>
                <Link 
                    to="/" 
                    className="absolute top-full mt-5 py-2 px-3 bg-sky-500 rounded-lg text-center text-base text-white hover:bg-sky-400 hover:-translate-y-1 transform transition active:bg-sky-600"
                >
                    So sad. Let's go back home and try again!
                </Link>
            </div>
        </section>
    )
}
