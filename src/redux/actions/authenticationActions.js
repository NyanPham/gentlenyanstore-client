import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail 
} from 'firebase/auth'

import { auth } from '../../firebase'


const ACTIONS = {
    SIGN_UP: 'sign-up',
    LOG_IN: 'sign-in',
    LOG_OUT: 'sign-out',

    SIGN_UP_START: 'sign-up-start',
    SIGN_UP_SUCCESS: 'sign-up-success',
    SIGN_UP_ERROR: 'sign-up-error',
    SET_SIGN_UP_ERROR: 'set-sign-up-error',

    LOG_IN_START: 'start-login-in',
    LOG_IN_SUCCESS: 'logged-in',
    LOG_IN_ERROR: 'failed-log-in',
    SET_LOG_IN_ERROR: 'set-log-in-error',

    
    RESET_PASSWORD_START: 'start-reset-password',
    RESET_PASSWORD_SUCCESS: 'success-reset-password',
    RESET_PASSWORD_ERROR: 'failed-reset-password',
}



export function signUp(email, password) {
    return async function (dispatch) {    
        try {
            dispatch({
                type: ACTIONS.SIGN_UP_START
            })
            await createUserWithEmailAndPassword(auth, email, password)
            dispatch({
                type: ACTIONS.SIGN_UP_SUCCESS
            })
        } catch {
            dispatch({
                type: ACTIONS.SIGN_UP_ERROR
            })
        }
    }
}

export function setSignUpError(errorMessage) {
    return {
        type: ACTIONS.SET_SIGN_UP_ERROR,
        payload: { error: errorMessage }
    }
}

export function logIn(email, password) {
    return async function (dispatch) {
        try {
            dispatch({
                type: ACTIONS.LOG_IN_START
            })
            await signInWithEmailAndPassword(auth, email, password)
            dispatch({
                type: ACTIONS.LOG_IN_SUCCESS
            })
        } catch {
            dispatch({
                type: ACTIONS.LOG_IN_ERROR
            })
        }
    }
}

export function logOut() {
    return async function (dispatch) {
        await signOut(auth)
    }
}

export function resetPassword(email) {
    return async function (dispatch) {
        try {
            dispatch({ type: ACTIONS.RESET_PASSWORD_START })
            await sendPasswordResetEmail(auth, email)
            dispatch({ type: ACTIONS.RESET_PASSWORD_SUCCESS })
        } catch {
            dispatch({ type: ACTIONS.RESET_PASSWORD_ERROR })
        }
    }
}



export default ACTIONS