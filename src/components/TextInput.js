import React, { useState, useEffect } from 'react';

export default function TextInput(props) {
    const { 
        placeholder, 
        type, 
        name, 
        value, 
        handleInputChange, 
        required, 
        validation = null,
        setValidFields
    } = props

    const [touched, setTouched] = useState(false)
    const [error, setError] = useState('')
    
    useEffect(() => {
        if (!touched) return
        const errorMessage = validation.validate(value) ? '' : validation.errorMessage
        setError(errorMessage)
        if (!errorMessage) return setValidFields(prevFields => {
            return {
                ...prevFields,
                [name]: true
            }
        }) 
        setValidFields(prevFields => {
            return {
                ...prevFields,
                [name]: false
            }
        }) 
    }, [value, touched])

    function onInputChange(e) {
        handleInputChange(e)
    }

    return (
        <>
            <input 
                className={`text-input ${touched ? 'invalid:border invalid:border-red-500' : ''}`}
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                required={required}
                onChange={onInputChange}
                onBlur={() => setTouched(true)} 
            />
            {error && <p className="text-red-500">{error}</p>}
        </>
    )
}
