import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { db } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'

const BOOLEAN_FIELDS = ['inNewArrival', 'inNewCollection', 'onSale', 'outOfStock']
const NUMBER_FIELDS = ['leftInStock', 'price', 'rating', 'salePercent', 'soldNumber']
const ARRAY_FIELDS = ['colors', 'sizes', 'tags']

export default function AddProductButton() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [newItem, setNewItem] = useState({
        name: '',
        code: '',
        imageURL: '',
        category: '',
        tags: [],
        colors: [],
        sizes: [],
        inNewArrival: false,
        inNewCollection: false,
        leftInStock: 0,
        onSale: false,
        outOfStock: false,
        price: 0,
        rating: 0,
        salePercent: 0,
        soldNumber: 0,
        visibility: 'public',
    })

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function handleInputChange(e) {
        if (NUMBER_FIELDS.includes(e.target.name)) {
            setNewItem(prevItem => {
                return {
                    ...prevItem,
                    [e.target.name]: parseFloat(e.target.value)
                }
            })
        } else {
            setNewItem(prevItem => {
                return {
                    ...prevItem,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    function handleModalClick(e) {
        if (e.target.id !== 'modal') return
        closeModal()
    }

    async function handleAddItem(e) {
        e.preventDefault()
        const item = {...newItem}
        fields.forEach(field => {
            if (BOOLEAN_FIELDS.includes(field)) {
                if (item[field] === 'true') {
                    item[field] = true
                } else {
                    item[field] = false
                }
            } else if (ARRAY_FIELDS.includes(field)) {
                item[field] = Array.from(item[field].split(', '))
            }
        })
        
        try {
            setLoading(true)
            setError('')
            await addDoc(collection(db, 'items'), item)
            closeModal()
        } catch {
            setError('Failed to add item to database. Check values then try again later')
        }
        
        setLoading(false)
    }

    const fields = Object.keys(newItem)

    return (
        <>
            <button 
                className="p-3 h-64 w-60 bg-white shadow-lg rounded-lg overflow-hidden relative text-3xl hover:opacity-50 transition"
                onClick={openModal}
            >
                +
            </button>
            {open && ReactDOM.createPortal(
                <div className="fixed inset-0 bg-gray-900/50 flex justify-center items-center" id="modal" onClick={handleModalClick}>
                    <form className="w-2/5 h-4/5 p-7 bg-white rounded-lg overflow-y-scroll" onSubmit={handleAddItem}>
                        <h3 className="text-xl font-semibold text-center">Add new item</h3>
                        {error && <p className="text-red-500">{error}</p>}
                        {fields.map((field, index) => (
                            <div className="form-group" key={index}>
                                <label htmlFor={field}>{field.toUpperCase()}</label>
                                {BOOLEAN_FIELDS.includes(field)
                                    ?   (
                                            <select
                                                className="py-1 px-2 border border:gray-500 rounded-md"
                                                name={field} 
                                                value={newItem[field]}
                                                onChange={handleInputChange}
                                            >
                                                <option value={true}>True</option>
                                                <option value={false}>False</option>
                                            </select>
                                        )
                                    :   (
                                        <input 
                                            className="py-1 px-2 border border:gray-500 rounded-md"
                                            type={NUMBER_FIELDS.includes(field) ? 'number' : 'text'}
                                            name={field} 
                                            value={newItem[field]}
                                            onChange={handleInputChange}
                                        />
                                    )
                                }       
                            </div>
                        ))}
                        <button
                            className="submit-button"
                            type="submit"
                            disabled={loading}
                        >Add Item</button>
                    </form>
                </div>,
                document.getElementById('modal-container')
            )}
        </>
    )
}
