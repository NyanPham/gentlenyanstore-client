import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { signUp, setSignUpError } from '../../redux/actions/authenticationActions'
import { useSelector, useDispatch } from 'react-redux'
import { resetValue } from '../../helper'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const currentUser = useSelector(state => state.currentUser)
    const { loading, error } = useSelector(state => state.signUpStatus)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleCreateAccount(e) {
        e.preventDefault()

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return dispatch(setSignUpError('Passwords do not match'))
        }

        dispatch(signUp(emailRef.current.value, passwordRef.current.value))
    }

    useEffect(() => {
        if (currentUser?.email) {
            resetValue([emailRef.current, passwordRef.current, passwordConfirmRef.current])
            navigate('/')
        }
    }, [currentUser])
    
    return (
        <div className="py-8 px-16 bg-white h-screen text-center motion-safe:animate-fadeIn">
            <div className="flex justify-between items-center">
                <Link to="/"><h2 className="text-3xl text-gray-500">GentleNyan</h2></Link>
                <Link to="/login" className="py-1.5 px-2.5 bg-sky-500 text-sm text-white rounded-sm hover:bg-sky-400 hover:-translate-y-2 hover:shadow-xl transform transition">
                    Login
                </Link>
            </div>
            <form className="text-center max-w-lg mx-auto mt-6" onSubmit={handleCreateAccount}>
                <h2 className="text-3xl text-gray-900 font-bold">Wanna join us?</h2>
                <h3 className="text-slate-500 mt-6">Enter your info below to create account</h3>
                {error && <p className="text-red-500 mt-6">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email" className="label">Your email</label>
                    <input 
                        className="text-input" 
                        type="email" id="email" placeholder='eg.you@website.com' required
                        ref={emailRef}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">Your password</label>
                    <input 
                        className="text-input"                     
                        type="password" id="password" placeholder="eg.yourpassword@a234^" required
                        ref={passwordRef}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password-confirm" className="label">Confirm your password</label>
                    <input 
                        className="text-input"                     
                        type="password" id="password-confirm" placeholder="eg.yourpassword@a234^" required
                        ref={passwordConfirmRef}
                    />
                </div>
                <button 
                    className="submit-button"
                    type="submit"
                    disabled={loading}
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}
