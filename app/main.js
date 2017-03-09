import "babel-polyfill"
import "react-hot-loader/patch"
import { AppContainer } from "react-hot-loader"
import React from "react"
import ReactDOM from "react-dom"
import { ApolloProvider } from "react-apollo"

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
