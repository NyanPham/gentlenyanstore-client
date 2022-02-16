import ACTIONS from '../../actions/authenticationActions'

const initialState = {
    loading: false,
    error: '',
    successMessage: ''
}

export function resetPasswordReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.RESET_PASSWORD_START:
            return {
                loading: true,
                error: '',
                successMessage: ''
            }
        case ACTIONS.RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                error: '',
                successMessage: 'We\'ve sent you an email. Check your inbox for further instruction'
            }
        case ACTIONS.RESET_PASSWORD_ERROR:
            return {
                loading: false,
                error: 'Failed to reset password. Check your email address then try again later',
                successMessage: ''
            }
        default:
            return state
    }
}