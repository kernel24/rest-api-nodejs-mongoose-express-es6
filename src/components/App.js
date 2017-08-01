import React, { Component } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Preferences from './Preferences'

export default class App extends React.Component {
    render() {
        return (
          <div>
            <Header/>
            <Sidebar/>
            <Preferences />
          </div>
        )
    }
}
