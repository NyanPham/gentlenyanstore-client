import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { db } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'
import Spinner from '../modals/Spinner'
import MessageModal from '../modals/MessageModal'

export default function Footer() {
    const emailRef = useRef()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    async function handleNewsletterSub(e) {
        e.preventDefault()
        if (emailRef.current.value == null) return
        if (!emailRef.current.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            setError('Invalid email address')
            return
        }

        try {
            setLoading(true)
            setError('')
            setMessage('')
            await addDoc(collection(db, 'newsletterSubs'), {
                subscriber: emailRef.current.value
            })
            setMessage('You have successfully subscribed')
        } catch (error) {
            console.error(error.message)
            setError('Failed to subscribe. Please try again later')
        }
        setLoading(false)
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <div className="py-8 px-12 grid grid-cols-1 gap-6 bg-blue-900 justify-evenly items-start md:grid-cols-2 lg:grid lg:grid-cols-4">
            <div>
                <h2 className="text-blue-100 text-lg uppercase tracking-wider mb-5">Contact us</h2>
                <div className="space-y-4">
                    <p className="text-blue-400 text-sm">
                        <FontAwesomeIcon className="mr-3" icon={faMapMarkerAlt} />
                        Binh Thanh Dist, HCM
                    </p>
                    <p className="text-blue-400 text-sm">
                        <FontAwesomeIcon className="mr-3 rotate-90" icon={faPhone} />
                        0947-057-091
                    </p>
                    <p className="text-blue-400 text-sm">
                        <FontAwesomeIcon className="mr-3" icon={faEnvelope} />
                        nhanphamdev@gmail.com
                    </p>
                </div>
            </div>
            <div>
                <h2 className="text-blue-100 text-lg uppercase tracking-wider mb-5">Products</h2>
                <div className="space-y-4 flex flex-col">
                    <Link to="/items/onSale" className="text-blue-400 text-sm w-max" onClick={scrollToTop}>Price Drop</Link>
                    <Link to="/items/inNewArrival" className="text-blue-400 text-sm w-max" onClick={scrollToTop}>New Arrival</Link>
                    <Link to="/items/all-products" className="text-blue-400 text-sm w-max" onClick={scrollToTop}>Products</Link>
                </div>
            </div>
            <div>
                <h2 className="text-blue-100 text-lg uppercase tracking-wider mb-5">Our Company</h2>
                <div className="space-y-4 flex flex-col">
                    <Link to="/contact" className="text-blue-400 text-sm w-max" onClick={scrollToTop}>Contact Us</Link>
                    <Link to="/about-us" className="text-blue-400 text-sm w-max" onClick={scrollToTop}>About us</Link>
                    <a href="https://goo.gl/maps/DC9A7efDK4BmacCD6" target="_blank" className="text-blue-400 text-sm w-max" onClick={scrollToTop}>Sitemap</a>
                </div>
            </div>
            <form onSubmit={handleNewsletterSub}>
                <h2 className="text-blue-100 text-lg uppercase tracking-wider mb-5">Join our newsletter now</h2>
                <input
                    className="py-2 px-3 bg-transparent text-gray-100 text-base outline-none border border-blue-100 rounded-md focus:ring focus:ring-blue-100 transition" 
                    placeholder="Email Address"
                    ref={emailRef}
                    disabled={message}
                />
                <button 
                    className="p-2 bg-gray-800 text-sm text-gray-100 ml-2 rounded-md hover:bg-gray-700 focus:bg-gray-900 tracking-wide transition md:p-3"
                    type="submit"
                    disabled={message || loading}
                >GO</button> 
            </form>
            {loading && <Spinner />}
            {message && <MessageModal message={message} isError={false}/>}
            {error && <MessageModal message={error} isError={true}/>}
        </div>
    )
}
