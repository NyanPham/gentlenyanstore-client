import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Spinner() {
    return (
        <div>
            {ReactDOM.createPortal(
                <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center z-80">
                    <FontAwesomeIcon icon={faSpinner} className="text-7xl text-sky-500 motion-safe:animate-spinner"/>
                </div>,
                document.getElementById('modal-container')
            )}
        </div>
    ) 
}
