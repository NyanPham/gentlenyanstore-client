const ACTIONS = {
    SET_SEARCH_ITEMS: 'set-search-items',
    RESET_SEARCH_ITEMS: 'reset-search-items'
}

export function setSearchItems(items, terms) {
    return {
        type: ACTIONS.SET_SEARCH_ITEMS,
        payload: {
            items,
            terms
        }
    }
}

export function resetSearchItems() {
    return {
        type: ACTIONS.RESET_SEARCH_ITEMS,
    }
}

export default ACTIONS