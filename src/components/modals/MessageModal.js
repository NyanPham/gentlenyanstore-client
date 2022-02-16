import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

export default function MessageModal({ message, isError }) {
    const [open, setOpen] = useState(true)

    function closeModal() {
        setOpen(false)
    }

    return (
        <div>
            {ReactDOM.createPortal(
                <div 
                    className={`
                        ${open ? 'opacity-100 scale-100 pointer-events-auto motion-safe:animate-modalShow' : 'opacity-0 scale-0 pointer-events-none motion-safe:animate-modalHide'}
                        p-5 mx-auto bg-white flex flex-col justify-center items-center gap-4 fixed top-3 left-1/2 -translate-x-1/2 z-70 rounded-lg shadow-lg md:flex-row transform transition`
                }>                
                    <div className={`${isError ? 'bg-red-500 py-3 px-4' : 'bg-green-500 p-4'} rounded-full flex justify-center items-center`}>
                        <FontAwesomeIcon icon={isError ? faTimes : faCheck} className="text-3xl text-white"/>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-bold">{isError ? 'Error' : 'Success'}</h2>
                        <p>
                            {message}
                        </p>
                    </div>
                    <button 
                        className='absolute top-3 right-3 w-5 h-5 text-xl flex justify-center items-center bg-transparent border-none outline-none hover:bg-gray-200 transition'
                        onClick={closeModal}
                    >&times;</button>
                </div>,
                document.getElementById('modal-container')
            )}
        </div>
    )    
}
