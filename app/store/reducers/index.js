import { reducer as counterReducer } from "app/store/ducks/counter"
import { routerReducer } from "react-router-redux"

export default {
    router: routerReducer,
    counter: counterReducer,
}
