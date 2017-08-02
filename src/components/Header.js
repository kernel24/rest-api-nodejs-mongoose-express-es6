import React, { Component }  from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {
    constructor() {
      super(...arguments)
    }

    render() {
        return (

          <nav className="header z-depth-1">
              <div className="navbar-fixed">
                  <ul className="input-field left">
                    <i className="material-icons md-24 md-dark">search</i>
                  </ul>

                  <a href="" className="center brand-logo logo">FANCY</a>
                  <ul className="right hide-on-med-and-down">
                    <a href=""><i className="active material-icons md-24 md-dark">shopping_cart</i></a>
                    <a href=""><i className="material-icons md-24 md-dark">message</i></a>
                    <a href=""><i className="material-icons md-24 md-dark">announcement</i></a>
                    <a href=""><i className="dropdown-button material-icons md-24 md-dark">account_box</i></a>
                  </ul>
              </div>
          </nav>
        )
    }
}
