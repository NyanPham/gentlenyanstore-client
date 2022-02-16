import React from 'react'
import { useSelector } from 'react-redux'
import Toast from './Toast'

export default function ToastContainer() {
    const toasts = useSelector(state => state.toasts)

    return (
        <div className="fixed bottom-5 right-5 space-y-4 pointer-events-none">
          {toasts.length > 0 && (
            toasts.map((toast, index) => (
              <Toast key={`toast_${index}`} {...toast} />
            ))
          )}
        </div>
  )
}
