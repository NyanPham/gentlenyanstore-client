import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logIn } from '../../redux/actions/authenticationActions';
import { resetValue } from '../../helper';

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { error, loading } = useSelector(state => state.logInStatus) 
    const currentUser = useSelector(state => state.currentUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleLogIn(e) {
        e.preventDefault()
        dispatch(logIn(emailRef.current.value, passwordRef.current.value))

    }

    useEffect(() => {
        if (currentUser?.email) {
            resetValue([emailRef.current, passwordRef.current])
            navigate(-1)
        }
    }, [currentUser])

    return (
        <div className="py-8 px-16 bg-white h-screen text-center motion-safe:animate-fadeIn">
            <div className="flex justify-between items-center">
                <Link to="/"><h2 className="text-3xl text-gray-500 text-slate-500">GentleNyan</h2></Link>
                <Link to="/signup" className="py-1.5 px-2.5 bg-sky-500 text-sm text-white rounded-sm hover:bg-sky-400 hover:-translate-y-2 hover:shadow-xl transform transition">
                    Sign Up
                </Link>
            </div>
            <form className="text-center max-w-lg mx-auto mt-6" onSubmit={handleLogIn}>
                <h2 className="text-3xl text-gray-900 font-bold">Welcome!</h2>
                <h3 className="text-slate-500 mt-6">Enter your info below to login</h3>
                {error && <p className="text-red-500">{error}</p>}
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
                
                <button 
                    className="submit-button"
                    type="submit"
                    disabled={loading}
                >
                    Login
                </button>
            </form>
            <Link to="/forgot-password" className="text-slate-700 text-gray-600 hover:text-gray-500 focus:text-gray-700 disabled:bg-slate-300" disabled={true}>Forgot your password?</Link>
        </div>
    )
}
