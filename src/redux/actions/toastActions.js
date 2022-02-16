const ACTIONS = {
    ADD_TOAST: 'add-toast',
    DELETE_TOAST: 'delete-toast',
}

export function addToast(name, imageURL, chosenColor, chosenSize, amount, price) {
    return {
        type: ACTIONS.ADD_TOAST,
        payload: {
            newToast: {
                name,
                imageURL,
                chosenColor,
                chosenSize,
                amount, 
                price,
                toastedAt: Date.now()
            }
        }
    }
}

export default ACTIONS