import ACTIONS from '../../actions/authenticationActions'

const initialState = {
    loading: false,
    error: ''
}

export function logInReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.LOG_IN_START:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case ACTIONS.LOG_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: ''
            }
        case ACTIONS.LOG_IN_ERROR:
            return {
                ...state,
                loading: false,
                error: 'Failed to log in. Check your email address and password then try again later'
            }
        case ACTIONS.SET_LOG_IN_ERROR: 
            return {
                ...state,
                error: payload.error
            }
        default:
            return state
    }
}