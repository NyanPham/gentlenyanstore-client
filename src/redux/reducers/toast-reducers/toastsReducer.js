import ACTIONS from '../../actions/toastActions'

export function toastsReducer(state = [], { type, payload }) {
    switch (type) {
        case ACTIONS.ADD_TOAST:
            return [
                ...state,
                payload.newToast
            ]
        case ACTIONS.DELETE_TOAST:
            const remainingToasts = state.filter(toast => toast.toastedAt !== payload.toastedAt)
            return remainingToasts
        default:
            return state
    }
}
