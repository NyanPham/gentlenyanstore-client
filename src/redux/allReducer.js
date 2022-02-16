import { combineReducers } from 'redux'
import { productsReducer } from './reducers/productsReducer'
import { basketReducer } from './reducers/basketReducer'
import { userReducer } from './reducers/auth-reducers/userReducer'
import { signUpReducer } from './reducers/auth-reducers/signUpReducer'
import { logInReducer } from './reducers/auth-reducers/logInReducer'
import { resetPasswordReducer } from './reducers/auth-reducers/resetPasswordReducer'
import { paymentReducer } from './reducers/payment-order-reducers/paymentReducer'
import { ordersReducer } from './reducers/payment-order-reducers/ordersReducer'
import { toastsReducer } from './reducers/toast-reducers/toastsReducer'
import { addArticleReducer } from './reducers/articleReducers/addArticleReducer'
import { articlesReducer } from './reducers/articleReducers/articlesReducer'
import { searchItemsReducer } from './reducers/searchItemsReducer'

const allReducers = combineReducers({
    products: productsReducer,
    signUpStatus: signUpReducer,
    logInStatus: logInReducer,
    resetPasswordStatus: resetPasswordReducer,
    basket: basketReducer,
    currentUser: userReducer,
    orders: ordersReducer,
    toasts: toastsReducer,
    paymentStatus: paymentReducer,
    addArticleStatus: addArticleReducer,
    articles: articlesReducer,
    searchedItems: searchItemsReducer,
})


export default allReducers