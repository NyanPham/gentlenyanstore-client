import ACTIONS from '../../actions/authenticationActions'

const initialState = {
    loading: false,
    error: '',
    message: ''
}

export function signUpReducer(state = initialState, { type, payload } = null) {
    switch (type) {
        case ACTIONS.SIGN_UP_START: {
            return {
                ...state,
                loading: true,
                error: ''
            }
        }
        case ACTIONS.SIGN_UP_SUCCESS: {
            return {
                ...state,
                error: '',
                message: '',
                loading: false
            }
        } 
        case ACTIONS.SIGN_UP_ERROR: {
            return {
                ...state,
                error: 'Failed to create account. Please try again later.',
                message: '',
                loading: false
            }
        }
        case ACTIONS.SET_SIGN_UP_ERROR: {
            return {
                ...state,
                error: payload.error
            }
        }
        default:
            return state
    }
}