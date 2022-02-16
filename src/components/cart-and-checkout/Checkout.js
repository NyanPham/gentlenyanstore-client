import React, { useState, useRef, useEffect } from 'react'
import CheckoutProduct from './CheckoutProduct'
import { useSelector, useDispatch } from 'react-redux'
import { getTotalBasket, formatPriceToVND } from '../../helper'
import TextInput from '../TextInput'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { useNavigate } from 'react-router-dom'
import { payTheOrder, fakePayTheOrder, resetPaymentStatus } from '../../redux/actions/paymentOrderActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../modals/Spinner'

const initialUserInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
}

const fields = {
    name: false,
    email: false,
    phone: false,
    address: false,
}

export default function Checkout() {
    const basket = useSelector(state => state.basket)
    const currentUser = useSelector(state => state.currentUser)
    const { loading, error, successMessage } = useSelector(state => state.paymentStatus)
    const submitBtnRef = useRef()
    const [userInfo, setUserInfo] = useState(initialUserInfo)
    const [validFields, setValidFields] = useState(fields)
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handlePayment(e) {
        e.preventDefault()
        if (!stripe) return

        let isValid = true
        const fields = [...Object.keys(validFields)]
        fields.forEach(field => {
            if (!validFields[field]) isValid = false
        })
        if (!isValid) return

        const checkoutItems = basket.map(item => {
            return {
                id: item.id,
                amount: item.amount, 
                price: item.price
            }
        })

        dispatch(fakePayTheOrder(currentUser.uid, basket, checkoutItems, stripe, elements, CardElement))
    }

    function handleInputChange(e) {
        setUserInfo(prevUserInfo => {
            return {
                ...prevUserInfo,
                [e.target.name]: e.target.value
            }
        })
    }
    
    useEffect(() => {
        if (error) {
            navigate('/checkout/payment-failure')
        } 
        if (successMessage) {
            navigate('/checkout/payment-success')
        }
        dispatch(resetPaymentStatus())
    }, [error, successMessage])

    return (
        <section className="p-8 bg-white flex flex-col gap-8 lg:flex-row motion-safe:animate-fadeIn">
            <div className="items-center lg:w-2/4 lg:sticky lg:top-0">
                <h2 className="text-2xl font-normal">Your Cart</h2>
                <p className="text-slate-500">
                    (
                        <span className="underline font-bold">
                            {basket.length}
                        </span> {basket.length === 1 ? 'item' : 'items'} in your cart
                    )
                </p>
                <form onSubmit={handlePayment}>
                    <div className="form-group">
                        <label className="label" htmlFor="name">Your name</label>
                        <TextInput 
                            placeholder="eg.Jack Shepherd"
                            type="text"
                            name="name"
                            value={userInfo.name}
                            handleInputChange={handleInputChange}
                            required={true}
                            validation={{
                                validate: (value) => value.length > 7 && value.length < 20,
                                errorMessage: 'Your name must be from 7 to 20 characters'
                            }}
                            setValidFields={setValidFields}
                        />
                    </div>
                    <div className="form-group flex flex-row gap-4">
                        <div className="grow">
                            <label className="label" htmlFor="email">Your email</label>
                            <TextInput 
                                placeholder="eg.you@website.com"
                                type="email"
                                name="email"
                                value={userInfo.email}
                                handleInputChange={handleInputChange}
                                required={true}
                                validation={{
                                    validate: (value) => value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
                                    errorMessage: 'Invalid email address'
                                }}
                                setValidFields={setValidFields}
                            />
                        </div>
                        <div className="grow">
                            <label className="label" htmlFor="phone">Your number</label>
                            <TextInput 
                                placeholder="eg.7777-777-777"
                                type="tel"
                                name="phone"
                                value={userInfo.phone}
                                handleInputChange={handleInputChange}
                                required={true}
                                validation={{
                                    validate: (value) => /[0-9]{4}-[0-9]{3}-[0-9]{3}/.test(value),
                                    errorMessage: 'Invalid phone number'
                                }}
                                setValidFields={setValidFields}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label" htmlFor="name">Your address</label>
                        <TextInput 
                            placeholder="eg.District 1, HCMC"
                            type="text"
                            name="address"
                            value={userInfo.address}
                            handleInputChange={handleInputChange}
                            required={true}
                            validation={{
                                validate: (value) => value.length > 10,
                                errorMessage: 'Please reenter your address'
                            }}
                            setValidFields={setValidFields}
                        />
                    </div>
                    <div className="mt-8 p-6 border border-slate-500 rounded-lg">
                        <label htmlFor='card-element mb-6'>Your card number</label>
                        <CardElement />
                    </div>
                    <button type="submit" ref={submitBtnRef} hidden={true} />
                </form>
            </div>
            <div className="flex flex-col space-y-4 lg:w-2/4">
                <div>
                    {basket?.map((item, index) => (
                        <CheckoutProduct 
                            key={`checkout_item${item.productId}_${index}`}
                            inBasketItemId={item.id}
                            imageURL={item.imageURL}
                            name={item.name}
                            color={item.chosenColor}
                            size={item.chosenSize}
                            amount={item.amount}
                            price={item.price}
                            isOnPayment={true}
                            onSale={item.onSale}
                            salePercent={item.salePercent}
                        />
                    ))}
                </div>
                <div className="flex justify-between font-bold text-gray-900">
                    <p>Gross total:</p>
                    <p>{formatPriceToVND(getTotalBasket(basket))}</p>
                </div>
                <button
                    className="submit-button"
                    onClick={() => submitBtnRef.current.click()}
                    disabled={loading || error || successMessage}
                >
                    Own now
                </button>
            </div>
            {loading && <Spinner />}
        </section>
    )
    
}