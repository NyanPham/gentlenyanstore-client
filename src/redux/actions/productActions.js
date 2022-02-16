import { db } from '../../firebase'
import { 
    collection, 
    getDocs, 
    query, 
    where, 
} from 'firebase/firestore' 
import { formatDocs } from '../../helper'


const ACTIONS = {
    FETCH_PRODUCTS: 'fetch-products',
    ADD_PRODUCT_TO_STORE: 'add-item-to-store'
}

export function fetchProducts() {
    return async function (dispatch) {

        const itemsQuery = query(collection(db, 'items'), where('visibility', '==', 'public')) 

        getDocs(itemsQuery).then(res => {
            dispatch({
                type: ACTIONS.FETCH_PRODUCTS,
                payload: {
                    products: formatDocs(res.docs)
                }
            })
        })
    }
}

export function fetchProductsFromServer() {
    return async function (dispatch) {
        const response = await fetch('http://localhost:4242/get-items', {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        })
        const items = await response.json()
        dispatch({
            type: ACTIONS.FETCH_PRODUCTS,
                payload: {
                    products: items.items
            }
        })
    }
}

export default ACTIONS