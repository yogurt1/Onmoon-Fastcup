import React from "react"
import { Route } from "react-router"
import HomePage from "./HomePage"
import NotFoundPage from "./NotFoundPage"

export default class App extends React.Component {
    render() {
        return (
            <Container>
                <Route exact path="/" component={HomePage} />
                <Route component={NotFoundPage} />
            </Container>
        )
    }
}
