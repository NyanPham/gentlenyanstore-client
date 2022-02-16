import { db } from '../../firebase'
import { 
    collection, 
    getDocs, 
    addDoc, 
    doc, 
    updateDoc, 
    query, 
    where, 
    onSnapshot, 
    orderBy, 
    serverTimestamp, 
    deleteDoc
} from 'firebase/firestore' 
import { formatDoc } from '../../helper'
import { addToast } from './toastActions'

const ACTIONS = {
    FETCH_BASKET: 'add-to-basket',
    EMPTY_BASKET: 'empty-basket',

}

export function addToBasket(userId, productId, {name, imageURL, price, onSale, salePercent}, chosenColor, chosenSize, amount) {
    return async function (dispatch) {
        const addBasketDoc = collection(db, 'baskets')
        await addDoc(addBasketDoc, {
            userId,
            productId,
            name: name,
            imageURL: imageURL,
            chosenColor,
            chosenSize,
            amount,
            price,
            onSale,
            salePercent,
            createdAt: serverTimestamp()
        })
        dispatch(fetchBasket(userId))
        dispatch(addToast(name, imageURL, chosenColor, chosenSize, amount, price))
    }
}

export function fetchBasket(userId) {
    return async function (dispatch) {
        const q = query(collection(db, 'baskets'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
        onSnapshot(q, snapshot=> {
            const basket = snapshot.docs.map(formatDoc)
            dispatch({
                type: ACTIONS.FETCH_BASKET,
                payload: { basket }
            })
        })
    }
}

export function adjustItemAmountInBasket(inBasketItemId, userId, newAmount) {
    return async function (dispatch) {
        const itemInBasketRef = doc(db, 'baskets', inBasketItemId)
        await updateDoc(itemInBasketRef, {
            amount: newAmount
        })
        dispatch(fetchBasket(userId))
    }
}

export function removeItemFromBasket(inBasketItemId, userId) {
    return async function (dispatch) {
        const itemInBasketRef = doc(db, 'baskets', inBasketItemId)
        await deleteDoc(itemInBasketRef)
        dispatch(fetchBasket(userId))
    }
}

export function emptyBasket(userId) {
    return async function (dispatch) {
        const itemsInBasketQuery = query(collection(db, 'baskets'), where('userId', '==', userId))
        const snapshot = await getDocs(itemsInBasketQuery)
        const itemsInBasket = snapshot.docs.map(formatDoc)
        
        for (let item of itemsInBasket) {
            const docRef = doc(db, 'baskets', item.id)
            await deleteDoc(docRef)
        }

        dispatch({
            type: ACTIONS.EMPTY_BASKET
        })
    }
}

export default ACTIONS
