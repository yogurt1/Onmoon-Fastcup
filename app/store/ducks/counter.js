export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const RESET = "RESET"

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })
export const reset = () => ({ type: RESET })

const initialState = 0
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT: return state + 1
        case DECREMENT: return state - 1
        case RESET: return 0
        default: return state
    }
}
