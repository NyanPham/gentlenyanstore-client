import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

export function pageTransitionClick() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })       
}

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const { ref, inView } = useInView({
        threshold: 0
    })

    function closeMenu() {
        setOpen(false)
    }

    function handleNavLinkClick() {
        if (open) closeMenu()
        pageTransitionClick()
    }

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <>
            <div className={`${open ? 'opacity-100 scale-100 pointer-events-all' : 'opacity-0 scale-0 pointer-events-none'} transition duration-500 origin-bottom-right fixed inset-0 bg-white z-50 flex flex-col justify-center items-center gap-7 text-2xl md:hidden`}>
                <NavLink className="navlink" to="/" onClick={handleNavLinkClick}>Home</NavLink>
                <NavLink className="navlink" to="/about-us" onClick={handleNavLinkClick}>About us</NavLink>
                <NavLink className="navlink" to="/items/inNewCollection" onClick={handleNavLinkClick}>New Collection</NavLink>
                <NavLink className="navlink" to="/items/inNewArrival" onClick={handleNavLinkClick}>New Arrival</NavLink>
                <NavLink className="navlink" to="/blog" onClick={handleNavLinkClick}>Blog</NavLink>
                <NavLink className="navlink" to="/contact" onClick={handleNavLinkClick}>Contact us</NavLink>
            </div>
            <div className="hidden p-3 w-full h-14 bg-white border border-slate-300 sm:flex justify-evenly items-center" ref={ref}>
                <NavLink className="navlink" to="/" onClick={handleNavLinkClick}>Home</NavLink>
                <NavLink className="navlink" to="/about-us" onClick={handleNavLinkClick}>About us</NavLink>
                <NavLink className="navlink" to="/items/inNewCollection" onClick={handleNavLinkClick}>New Collection</NavLink>
                <NavLink className="navlink" to="/items/inNewArrival" onClick={handleNavLinkClick}>New Arrival</NavLink>
                <NavLink className="navlink" to="/blog" onClick={handleNavLinkClick}>Blog</NavLink>
                <NavLink className="navlink" to="/contact" onClick={handleNavLinkClick}>Contact us</NavLink>
            </div>
            <button className="fixed bottom-5 right-5 w-7 h-7 -translate-y-1 bg-gray-900 rounded-sm flex justify-center items-center z-50 sm:hidden"
                onClick={() => setOpen(prevOpen => !prevOpen)}
            >
                <span className="absolute w-4 h-0.5 bg-white -translate-y-1.5"></span>
                <span className="absolute w-4 h-0.5 bg-white"></span>
                <span className="absolute w-4 h-0.5 bg-white translate-y-1.5"></span>
            </button>
            {!inView && isMounted && ReactDOM.createPortal(
                <div className="hidden p-3 w-full h-14 bg-white border border-slate-300 -translate-y-full shadow-lg sm:animate-navBar sm:fixed sm:top-0 sm:flex justify-evenly items-center">
                    <NavLink className="navlink" to="/" onClick={handleNavLinkClick}>Home</NavLink>
                    <NavLink className="navlink" to="/about-us" onClick={handleNavLinkClick}>About us</NavLink>
                    <NavLink className="navlink" to="/items/inNewCollection" onClick={handleNavLinkClick}>New Collection</NavLink>
                    <NavLink className="navlink" to="/items/inNewArrival" onClick={handleNavLinkClick}>New Arrival</NavLink>
                    <NavLink className="navlink" to="/blog" onClick={handleNavLinkClick}>Blog</NavLink>
                    <NavLink className="navlink" to="/contact" onClick={handleNavLinkClick}>Contact us</NavLink>
                </div>, document.getElementById('navbar-positioner')
            )}
        </>
    )
}