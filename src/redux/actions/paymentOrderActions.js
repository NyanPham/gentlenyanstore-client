import { db } from '../../firebase'
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    onSnapshot, 
    orderBy, 
} from 'firebase/firestore' 
import { formatDoc, getTotalBasket } from '../../helper'
import { emptyBasket } from './basketActions'

const ACTIONS = {
    GET_ORDERS: 'get-order',
    PAYMENT_START: 'payment-start',
    PAYMENT_SUCCESSS: 'payment-success',
    PAYMENT_FAILURE: 'payment-failure',
    RESET_PAYMENT_STATUS: 'reset-payment-status'
}

export function fetchOrders(userId) {
    return async function (dispatch) {
        const q = query(collection(db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
        onSnapshot(q, snapshot => {
            const orders = snapshot.docs.map(formatDoc)
            
            if (orders?.length === 0) return dispatch({
                type: ACTIONS.GET_ORDERS,
                payload: {
                    orders: []
                }
            })

            dispatch({
                type: ACTIONS.GET_ORDERS,
                payload: {
                    orders
                }
            })
        })
    }
}

export function createAnOrder({ basket, created, amount, orderId, userId }) {
    return async function (dispatch) {
        const orderDoc = collection(db, 'orders')
        await addDoc(orderDoc, {
            userId,
            orderId,
            amount, 
            createdAt: created,
            items: basket
        })
    }
}

export function fakePayTheOrder(userId, basket, checkoutItems, stripe,  elements, CardElement) {
    return async function (dispatch) {
        dispatch({
            type: ACTIONS.PAYMENT_START
        })

        const promise = new Promise((resolve, reject) => {
            const randNum = Math.random()
            setTimeout(() => {
                if (randNum < 0.5) return reject('Failed to make payment')
                resolve({
                    id: `${randNum}_${Date.now().toString()}`,
                    created: Date.now(),
                    amount: getTotalBasket(basket)
                })
            }, 5000)
        })
        
        promise.then((paymentIntent) => {
            dispatch(createAnOrder({
                basket,
                userId, 
                orderId: paymentIntent.id,
                created: paymentIntent.created,
                amount: paymentIntent.amount, 
            }))
            dispatch(emptyBasket(userId))
            dispatch({type: ACTIONS.PAYMENT_SUCCESSS})
            console.log('succeeded')
        }).catch(err => {
            console.log(err)
            dispatch({type: ACTIONS.PAYMENT_FAILURE})
        })
    }
}

export function payTheOrder(userId, basket, checkoutItems, stripe,  elements, CardElement) {
    return async function (dispatch) {
        dispatch({
            type: ACTIONS.PAYMENT_START
        })

        const response = await fetch('http://localhost:4242/make-payment-intent', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({checkoutItems})
        })
        const {clientSecret} = await response.json()

        if (!clientSecret) return dispatch({ type: ACTIONS.PAYMENT_FAILURE })
        
        stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            dispatch(createAnOrder({
                basket,
                userId, 
                orderId: paymentIntent.id,
                created: paymentIntent.created,
                amount: paymentIntent.amount, 
            }))
            dispatch(emptyBasket(userId))
            dispatch({type: ACTIONS.PAYMENT_SUCCESSS})

        }).catch((err) => {
            console.error(err.error)
            dispatch({type: ACTIONS.PAYMENT_FAILURE})
        })
    }
}

export function resetPaymentStatus() {
    return {
        type: ACTIONS.RESET_PAYMENT_STATUS
    }
}


export default ACTIONS