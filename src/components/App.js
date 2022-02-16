import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { fetchBasket } from '../redux/actions/basketActions'
import { fetchOrders } from '../redux/actions/paymentOrderActions'
import ACTIONS from '../redux/actions/authenticationActions'
import { fetchProducts } from '../redux/actions/productActions'
import Header from "./header/Header";
import Home from "./main/Home";
import Footer from './footer/Footer';
import ProductDetails from './main/ProductDetails';
import Login from './authentication/Login';
import Signup from './authentication/Signup'
import ForgotPassword from './authentication/ForgotPassword'
import Cart from './cart-and-checkout/Cart'
import Checkout from './cart-and-checkout/Checkout'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentSuccess from './cart-and-checkout/PaymentSuccess'
import PaymentFailure from './cart-and-checkout/PaymentFailure'
import OrdersList from './cart-and-checkout/OrdersList'
import ToastContainer from './toasts/ToastContainer'
import ProductsShowroom from './main/ProductsShowroom'
import About from './main/About'
import Contact from './main/Contact'
import Blogs from './Blog/Blogs'
import BlogArticleDetails from './Blog/BlogArticleDetails'
import CreateArticle from './Blog/CreateArticle'
import { getArticles } from '../redux/actions/articleActions'

const stripePromise = loadStripe('pk_test_51KPg5nHUOdMFaBHmnqMPEALXISXFyDNA6Fq2xYB6rfdVBkfgGDo2VCcq3jllLPKUMOD9SpJvYepxB3kCWYpmEDLH00o0vEdn9h')
function App() {
	const dispatch = useDispatch()

	useEffect(() => {
        dispatch(fetchProducts())
		dispatch(getArticles())
    }, [dispatch])

	onAuthStateChanged(auth, user => {
		if (user) {
			dispatch({
				type: ACTIONS.LOG_IN,
				payload: { currentUser: user }
			})
			dispatch(fetchBasket(user.uid))
			dispatch(fetchOrders(user.uid))
		} else {
			dispatch({
				type: ACTIONS.LOG_OUT
			})
		}
	})

	return (
		<>
			<div className="w-full min-h-screen bg-gray-200 relative">
				<Router>
					<Routes>
						<Route path="/" element={ ( <><Header /><Home /><Footer /></>)} />
						<Route path="/product/:productId" element={ <><Header/><ProductDetails /><Footer /></>} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/forgot-password" element={<ForgotPassword />} />
						<Route path="/cart" element={<><Header /><Cart /><Footer /></>} />
						<Route path="/checkout" element={ <Elements stripe={stripePromise}><Checkout /></Elements>}/>
						<Route path="/checkout/payment-success" element={<PaymentSuccess />}/>
						<Route path="/checkout/payment-failure" element={<PaymentFailure />}/>
						<Route path="/orders" element={<><Header /><OrdersList /><Footer/></>}/>
						<Route path="/items/:tag" element={<><Header /><ProductsShowroom /><Footer/></>}/>
						<Route path="/about-us" element={<><Header /><About /><Footer/></>}/>
						<Route path="/contact" element={<Contact />}/>
						<Route path="/blog" element={<><Header /><Blogs /><Footer/></>}/>
						<Route path="/blog/:articleId" element={<><Header /><BlogArticleDetails /><Footer/></>}/>
						<Route path="/blog/create-article" element={<CreateArticle />}/>
					</Routes>
				</Router>
			</div>
			<div id="toasts-container">
				<ToastContainer />
			</div>
			<div id="modal-container"></div>
		</>
	);
}

export default App;
