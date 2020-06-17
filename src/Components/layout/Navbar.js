import React, { Component } from 'react'
import styled from 'styled-components';


export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{
                    backgroundColor: "#ffd700"
                }}>
                    <a className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">Gold Pokedex</a>
                </nav>
            </div>
        )
    }
}
