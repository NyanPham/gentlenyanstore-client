import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { formatDoc } from '../../helper'
import { useSelector, useDispatch } from 'react-redux'  
import { addToBasket } from '../../redux/actions/basketActions';
import { formatPriceToVND } from '../../helper';

export const COLOR_MAP = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    gray: 'bg-gray-500',
    green: 'bg-green-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500',
    sky: 'bg-sky-500',
    white: 'bg-white',
    brown: 'bg-amber-800',
    black: 'bg-gray-900',
    amber: 'bg-amber-500'
}

export default function ProductDetails() {
    const [currentProduct, setCurrentProduct] = useState({})
    const [currentColor, setCurrentColor] = useState('')
    const [currentSize, setCurrentSize] = useState('')
    const [currentAmount, setCurrentAmount] = useState(1)
    const [messages, setMessages] = useState([])
    const { productId } = useParams()
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        //  if firebase failed, switch to nodejs below
        const itemRef = doc(db, 'items', productId)
        getDoc(itemRef).then(doc => {
            setCurrentProduct(formatDoc(doc))
        })

        // const getProductFromServer = async () => {
        //     const response = await fetch('/retrieve-item', {
        //         method: 'POST',
        //         headers: { "Content-Type": "application/json"},
        //         body: JSON.stringify({productId})
        //     })
        //     const item = await response.json()
        //     setCurrentProduct(item)
        // }

        // getProductFromServer()

    }, [productId])
    
    useEffect(() => {
        resetMessages()
    }, [currentColor, currentSize])
    
    function handleAmountChange(e) {
        if (isNaN(e.target.value)) return
        if (e.target.value < 1) return 
        setCurrentAmount(e.target.value)
    }

    function amountDecrement(e) {
        e.preventDefault()
        if (currentAmount - 1 < 1) return 
        setCurrentAmount(prevAmount => prevAmount - 1)
    }

    function amountIncrement(e) {
        e.preventDefault()
        setCurrentAmount(prevAmount => prevAmount + 1)
    }

    function resetMessages() {
        if (currentColor) setMessages(prevMessages => {
            return {
                ...prevMessages,
                colorError: ''
            }
        })
        if (currentSize) setMessages(prevMessages => {
            return {
                ...prevMessages,
                sizeError: ''
            }
        })
    }

    function validateSubmit() {
        let isValid = true
        if (!currentColor) {
            setMessages(prevMessages => {
                return {
                    ...prevMessages,
                    colorError: 'Please choose a color'
                }
            })
            isValid = false
        }
        if (!currentSize) {
            setMessages(prevMessages => {
                return {
                    ...prevMessages,
                    sizeError: 'Please choose a size'
                }
            })
            isValid = false
        }

        if (currentSize && currentColor) isValid=true
        return isValid
    }

    function handleAddToCart(e) {
        e.preventDefault()
        if (!validateSubmit()) return
        // Logic to add to basket
        if (!currentUser) return navigate('/login')
        dispatch(addToBasket(currentUser?.uid, productId, currentProduct, currentColor, currentSize, currentAmount))
    }

    return (
        <>
            <div className="p-12 flex flex-col items-start gap-12 bg-gray-200 sm:flex-row">
                <div className="w-full h-96 flex justify-center items-center sm:w-2/4">
                    {currentProduct?.imageURL && (
                        <img 
                        className="w-auto max-h-full"
                        src={currentProduct.imageURL}
                        alt={currentProduct.name}
                    />
                    )} 
                </div>
                <div className="w-full sm:w-2/4">
                    <h3 className="text-gray-900 text-2xl">{currentProduct?.name}</h3>
                    {currentProduct?.outOfStock 
                        ? <p className="text-red-500 mt-2">Out of stock</p>
                        : <p className="text-green-500 mt-2">In stock</p>
                    }
                    <div className="mt-2 pb-4 flex w-full border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <span className="font-bold underline">{currentProduct?.rating}</span>
                            <div className="flex pr-8 border-r-2 border-gray-800 gap-0.5 sm:pr-16">
                                {currentProduct?.rating && (
                                    Array(currentProduct.rating).fill().map((_, index) => 
                                        <FontAwesomeIcon 
                                            key={`yellow_${index}`} 
                                            icon={faStar}
                                            className="text-yellow-500"
                                        />
                                    ).concat(Array(5 - currentProduct.rating).fill().map((_, index) => (
                                        <FontAwesomeIcon 
                                            key={`gray_${index}`}
                                            icon={faStar}
                                            className="text-gray-500"
                                        />
                                    )))
                                )}
                            </div>
                        </div>
                        <div className="ml-8 sm:ml-16">
                            <span className="font-bold underline mr-2">{currentProduct?.soldNumber}</span>
                            <span>sold</span>
                        </div>
                    </div> 
                    <div className="mt-4 space-y-4">
                        <h3 className="text-red-500 text-2xl">
                            {
                                currentProduct?.price 
                                    ? (
                                        currentProduct?.onSale && currentProduct?.salePercent
                                            ? (
                                                <>
                                                    <span className="text-gray-900 text-sm line-through">{formatPriceToVND(currentProduct.price)}</span>
                                                    <span className="ml-2">{formatPriceToVND(currentProduct.price - currentProduct.price * currentProduct.salePercent / 100)}</span>
                                                    <span className="text-sm ml-2">(-{currentProduct.salePercent}%)</span>
                                                </>
                                            )
                                            :   (
                                                    <span>{formatPriceToVND(currentProduct.price)}</span>
                                                )
                                    )
                                    : null
                            }
                        </h3>
                        <div className='space-y-2'>
                            <h4>Color</h4>
                            {currentProduct.colors?.map((color, index) => {
                                return (
                                    <div 
                                        className={`${COLOR_MAP[color]} ${currentColor === color ? ' border-2 border-black' : ''} w-7 h-7 rounded-full inline-block mr-2 cursor-pointer`} 
                                        key={`color_${index}`}
                                        onClick={() => {setCurrentColor(color)}}
                                    />
                                )
                            })}
                        </div>
                        <div className="space-y-2">
                            <h4>Size</h4>
                            <div className="flex">
                                {currentProduct?.sizes?.map((size, index) => {
                                    return (
                                        <div 
                                            className={`${currentSize === size ? 'border-2 border-gray-900' : null} w-8 h-8 rounded-sm uppercase bg-gray-400 flex justify-center items-center mr-2 cursor-pointer`}
                                            key={`size${index}`}
                                            onClick={() => {setCurrentSize(size)}}
                                        >
                                            {size}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <form className="pt-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={amountDecrement}
                                >-</button>
                                <input 
                                    className="w-8 py-0.5 px-2 text-center outline-none border border-gray-700 rounded-sm"
                                    type="text" 
                                    inputMode="numeric" 
                                    value={currentAmount} 
                                    onChange={handleAmountChange}
                                />
                                <button
                                    onClick={amountIncrement}
                                >+</button>
                            </div>
                            <button 
                                className="py-2 px-3 bg-gray-900 text-gray-200 mt-8 mb-2 outline-none rounded-sm hover:bg-gray-700 transition disabled:bg-slate-500" 
                                type="submit"
                                onClick={handleAddToCart}
                                disabled={currentProduct?.outOfStock}
                            >
                                Add to Cart
                            </button>
                            {[...Object.keys(messages)].map(error => {
                                return <div key={error} className="text-red-500">{messages[error]}</div>
                            })}
                        </form>
                    </div>
                </div>
            </div>
         </>
     )
}
