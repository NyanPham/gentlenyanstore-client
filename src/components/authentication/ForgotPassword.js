import React, { useRef } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/actions/authenticationActions';

export default function ForgotPassword() {
    const emailRef = useRef()
    const { loading, error, successMessage } = useSelector(state => state.resetPasswordStatus)
    const dispatch = useDispatch()

    function handleResetPassword(e) {
        e.preventDefault()
        dispatch(resetPassword(emailRef.current.value))
    }

    return (
        <div className="py-8 px-16 bg-white h-screen text-center motion-safe:animate-fadeIn">
            <div className="flex justify-between items-center">
                <Link to="/"><h2 className="text-3xl text-gray-500 text-slate-500">GentleNyan</h2></Link>
                <Link to="/signup" className="py-1.5 px-2.5 bg-sky-500 text-sm text-white rounded-sm hover:bg-sky-400 hover:-translate-y-2 hover:shadow-xl transform transition">
                    Sign Up
                </Link>
            </div>
            <form className="text-center max-w-lg mx-auto mt-6" onSubmit={handleResetPassword}>
                <h2 className="text-3xl text-gray-900 font-bold">Reset your password</h2>
                <h3 className="text-slate-500 mt-6">Forgot your password? Happens all the time. Enter your email below to reset it</h3>
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                {error && <div className="text-red-500">{error}</div>}
                <div className="form-group">
                    <label htmlFor="email" className="label">Your email</label>
                    <input 
                        className="text-input" 
                        type="email" id="email" placeholder='eg.you@website.com' required={true}
                        ref={emailRef}
                    />
                </div>
                
                <button 
                    type="submit"
                    className="submit-button"
                    disabled={loading || successMessage}
                >
                    Next
                </button>
            </form>
            <Link to="/login" className="text-slate-700 text-gray-600 hover:text-gray-500 focus:text-gray-700 disabled:bg-slate-300" disabled={true}>Got your password? Log in now</Link>
        </div>
    )
}
