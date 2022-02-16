import ACTIONS from '../../actions/articleActions'

const initialState = {
    loading: false,
    addError: '',
    successMessage: ''
}

export function addArticleReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTIONS.CREATE_ARTICLE_START:
            return {
                loading: true,
                addError: '',
                successMessage: ''
            }
        case ACTIONS.CREATE_ARTICLE_SUCCESS:
            return {
                loading: false,
                addError: '',
                successMessage: 'The article has been created'
            }
        case ACTIONS.CREATE_ARTICLE_FAILURE:
            return {
                loading: false,
                addError: 'Failed to create article. Please try again later',
                successMessage: ''
            }
        default:
            return state
    }
}