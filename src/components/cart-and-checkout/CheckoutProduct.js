import React from 'react';
import { adjustItemAmountInBasket, removeItemFromBasket } from '../../redux/actions/basketActions';
import { useSelector, useDispatch } from 'react-redux'
import { formatPriceToVND  } from '../../helper';

export default function CheckoutProduct(props) {
    const {
        inBasketItemId = null,
        imageURL,
        name,
        color,
        size,
        amount, 
        price,
        onSale,
        salePercent,
        disabled = false,
        isOnPayment = false
    } = props

    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()

    function handleAmountChange(e) {
        if (disabled) return 
        if (e.target.name === 'increment') return dispatch(adjustItemAmountInBasket(inBasketItemId, currentUser?.uid, amount + 1))
        if (e.target.name === 'decrement' && amount - 1 >= 1) return dispatch(adjustItemAmountInBasket(inBasketItemId, currentUser.uid, amount - 1))
        if (e.target.value < 1) return 
        dispatch(adjustItemAmountInBasket(inBasketItemId, currentUser.uid, parseInt(e.target.value)))
    }

    function handleRemoveItemClick() {
        if (disabled) return
        dispatch(removeItemFromBasket(inBasketItemId, currentUser?.uid))
    }

    return (
        <div className={`mb-7 grid grid-cols-2 grid-rows-1 items-start gap-1 mt-4 ${isOnPayment ? '' : 'md:grid-cols-5 md:grid-rows-1 md:justify-between md:items-center md:gap-6'}`}>
            <div className={`h-36 w-36 row-span-2 ${isOnPayment ? 'md:row-span-0': ''}`}>
                <img className="max-w-full max-h-full" src={imageURL} alt={name}/>
            </div>
            <div className={`${isOnPayment ? '': 'md:col-span-2'}`}>
                <p className="text-gray-700 text-base">{name} - {color} - {size} </p>
                <button 
                    className="py-1 px-2 bg-white border border-gray-700 text-sm text-gray-900 rounded-md mt-3 hover:bg-gray-900 hover:text-white transition active:ring active:ring-gray-700"
                    onClick={handleRemoveItemClick}
                    hidden={disabled}
                >
                    Remove from cart
                </button>
            </div>
            <div className="flex space-x-2">
                <button className="text-lg" onClick={handleAmountChange} name="decrement" hidden={disabled}>-</button>
                {disabled
                    ? <p className="p-1 flex bg-gray-200 justify-center items-center rounded-sm outline-none">&times; {amount}</p>
                    : (
                        <input 
                            className="w-8 flex bg-gray-200 border border-gray-900 text-center rounded-sm outline-none focus:ring focus:ring-sky-300"
                            type="text" 
                            value={amount} 
                            onChange={handleAmountChange}
                        />
                    )
                } 
                <button className="text-lg" onClick={handleAmountChange} name="increment" hidden={disabled}>+</button>
            </div>
            <p className="text-sky-800 text-base">
                {onSale && salePercent
                    ?   <span>{formatPriceToVND((price - price * salePercent / 100) * amount)}</span>
                    :   <span>{formatPriceToVND(price * amount)}</span>
                }
            </p>
        </div>
    )
}
