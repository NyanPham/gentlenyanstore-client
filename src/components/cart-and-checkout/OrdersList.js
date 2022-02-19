import React from 'react';
import Order from './Order';
import { useSelector } from 'react-redux';

export default function OrdersList() {
    const orders = useSelector(state => state.orders)
    return (
        <section className='space-y-8 pb-8 min-h-max motion-safe:animate-fadeIn'>
            <h2 className="text-center text-2xl text-gray-900 uppercase tracking-wide font-bold my-7 sm:text-3xl">Your Orders</h2>
            {orders?.map((order, index) => (
                <Order 
                    key={`order_history_${index}`}
                    {...order}
                />
            ))}
            {orders?.length === 0 && (
                <p className="text-lg text-gray-900 text-center pb-24">You have made no orders</p>
            )}
        </section>
    )
}
