import * as Redux from "redux"
import * as R from "ramda"
import { routerMiddleware } from "react-router-redux"
import thunkMiddleware from "redux-thunk"
import promiseMiddleware from "redux-promise"
import reducersRegistry from "./reducers"

const composeWithDevTools = (
    global["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] ||
    Redux.compose
)
const injectApolloClient = R.set(R.lensProp("apollo"))

export default ({ initialState, client, history }) => {
    const middleware = Redux.applyMiddleware(
        thunkMiddleware,
        promiseMiddleware,
        routerMiddleware(history),
        client.middleware()
    )
    
    const finalCombineReducers = R.pipe(
        injectApolloClient(client.reducer()),
        Redux.combineReducers,
    )

    const finalCreateStore = composeWithDevTools(
        middleware
    )(Redux.createStore)
    
    const reducer = finalCombineReducers(reducersRegistry)
    const store = finalCreateStore(reducer, initialState)

    if (module.hot) {
        module.hot.accept("./reducers", () => {
            import("./reducers")
                .then(ns => {
                    const nextReducersRegistry = ns.default
                    const nextReducer = finalCombineReducers(nextReducersRegistry)
                    store.replaceReducer(nextReducer)
                })
        })
    }

    return store
}
