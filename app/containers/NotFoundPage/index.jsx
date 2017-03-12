import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { goBack } from "react-router-redux"

const Button = styled.button`
    color: blue;
    background: black;
`

@connect()
export default class NotFoundPage extends React.Component {
    onClick = () => {
        const { dispatch } = this.props
        dispatch(goBack())
    }

    render() {
        return (
            <div>
                <h1>Not found :(</h1>
                <Button onClick={this.onClick}>Go back</Button>
            </div>
        )
    }
}
