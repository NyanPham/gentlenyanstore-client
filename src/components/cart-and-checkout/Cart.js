import React from 'react';
import CheckoutProduct from './CheckoutProduct';
import { getTotalBasket, formatPriceToVND} from '../../helper';
import { BENEFITS } from '../main/IntroGrid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Cart() {
    const basket = useSelector(state => state.basket)
    const currentUser = useSelector(state => state.currentUser)

    return (
        <section className="bg-white p-5 sm:p-8">
            <div className="flex flex-row gap-3 items-center">
                <h2 className="text-xl font-normal sm:text-2xl">Your Cart</h2>
                <p className="text-slate-500 text-sm  sm:text-base">
                    (
                        <span className="underline font-bold">
                            {basket.length}
                        </span> {basket.length === 1 ? 'item' : 'items'} in your cart
                    )
                </p>
            </div>
            <div className="mt-4 flex flex-col gap-10 lg:flex-row">
                <div className="grow">
                    {basket.map((item, index) => (
                        <CheckoutProduct 
                            key={`cart-item_${item.productId}_${index}`}
                            inBasketItemId={item.id}
                            imageURL={item.imageURL}
                            name={item.name}
                            color={item.chosenColor}
                            size={item.chosenSize}
                            price={item.price}
                            amount={item.amount}
                            onSale={item.onSale}
                            salePercent={item.salePercent}
                        />
                    ))}
                </div>
                <div className="">
                    <div className="py-4 px-6 bg-gray-400 rounded-sm">
                        <h3 className="uppercase text-gray-900 text-lg">Your order</h3>
                        <p className="text-slate-700 mt-1">Vat included</p>
                        <div className="mt-2 flex justify-between items-center font-bold text-lg text-gray-900">
                            Total:
                            <span>{formatPriceToVND(getTotalBasket(basket))}</span>
                        </div>
                        <Link to={`${currentUser ? '/checkout' : '/login'}`}>
                            <button 
                                className="w-full mt-2 py-2 text-center text-gray-200 bg-gray-900 rounded-md hover:bg-gray-800 active:ring active:ring-gray-200 transition disabled:opacity-50 disabled:hover:bg-gray-900"
                                disabled={basket?.length === 0}
                            >Proceed to checkout</button>
                        </Link>
                    </div>
                    <div className="mt-4 flex flex-col items-start">
                        {BENEFITS.map((benefit, index) => {
                            return <SmallBenefit key={`smallBenefit_${index}`} {...benefit} />
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

function SmallBenefit({ icon, name, description }) {
    return (
        <div className="p-2 flex justify-center items-center gap-4">
            <FontAwesomeIcon icon={icon} className="text-xl text-gray-500" />
            <div>
                <h3 className="text-gray-500 font-bold text-sm">{name}</h3>
                <p className="text-gray-500 text-normal font-xs">{description}</p>
            </div>
        </div>
    )
}

