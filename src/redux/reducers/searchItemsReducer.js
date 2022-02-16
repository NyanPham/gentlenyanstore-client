import ACTIONS from '../actions/searchActions'

const initialState = {
    terms: '',
    items: []
}

export function searchItemsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.SET_SEARCH_ITEMS:
            return {
                terms: payload.terms,
                items: payload.items
            }
        case ACTIONS.RESET_SEARCH_ITEMS:
            return {
                terms: '',
                items: []
            }
        default:
            return state
    }
}