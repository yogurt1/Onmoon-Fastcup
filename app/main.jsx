import "babel-polyfill"
import "react-hot-loader/patch"
import React from "react"
import ReactDOM from "react-dom"
import ApolloClient, { createNetworkInterface } from "apollo-client"
import { AppContainer } from "react-hot-loader"
import { ConnectedRouter as Router } from "react-router-redux"
import { ApolloProvider } from "react-apollo"
import createHistory from "history/createBrowserHistory"
import configureStore from "./store"

const history = createHistory()
const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: "/graphql"
    }),
    connectToDevTools: process.env.NODE_ENV !== "production",
    dataIdFromObject(res) {
        return res.id && res.__typename
            ? res.__typename + res.id
            : null
    },
})
const store = configureStore({ client, history })
    
const renderApp = Component =>
    ReactDOM.render(
        <ApolloProvider store={store} client={client}>
            <Router history={history}>
                <Component />
            </Router>
        </ApolloProvider>
    )

if (module.hot) {
    modue.hot.accept("./containers/App", () => {
        renderApp(App)
    })
}
