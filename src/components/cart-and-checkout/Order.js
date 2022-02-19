import React from 'react';
import { formatPriceToVND } from '../../helper';
import CheckoutProduct from './CheckoutProduct';

export default function Order({ createdAt, amount, items, orderId }) {
    const date = new Date(createdAt)
    const options = {
        year: 'numeric', month: 'long', day: 'numeric', hour12: false
    }
    return (
        <div className="w-4/5 p-6 mx-auto bg-white rounded-sm shadow-sm md:w-3/5 md:p-12">
            <h3 className="flex flex-col items-start font-bold text-gray-900 text-xl md:flex-row md:justify-between md:items-center">Order <span className="text-gray-500 text-sm font-thin hidden lg:inline-block">{orderId}</span></h3>
            <p className="mt-6">Time: <span className="text-gray-500">{date.toLocaleString(options)}</span></p>
            <p className="mt-6">Total: <span className="text-gray-500">{formatPriceToVND(amount)}</span></p>
            <div className="mt-8">
                {items.map((item, index) => (
                    <CheckoutProduct 
                        key={`ordered_item_${item.id}_${index}`}
                        imageURL={item.imageURL}
                        name={item.name}
                        color={item.chosenColor}
                        size={item.chosenSize}
                        amount={item.amount}
                        price={item.price}
                        isOnPayment={true}
                        disabled={true}
                    />
                ))}
            </div>
        </div>
    )
}
