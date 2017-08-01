import React  from 'react';
import { Link } from 'react-router';

const API_URL = 'http://localhost:8080/';

class Preferences extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      'user_name':'',
      'location': '',
      'content': {'category_lists':0},
      'privacy': {'profile_visibility': 0, 'messages': 0},
      'localization': {'language': '', 'time_zone': '', 'currency': ''}
    }
    this.updateValue = this.updateValue.bind(this)
    this.saveValue = this.saveValue.bind(this)
  }

  updateValue(){
    const fetchData = {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })

    }

    fetch(API_URL+'preferences/', fetchData)
    .then((response) => response.json())
    .then((responseData) => {
        this.setState(responseData);
        console.log(this.state)
    })
  }

  saveValue(){
    const fetchData = {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(this.state)
    }

    fetch(API_URL+'preferences/', fetchData)
    .then((response) => response.json())
    .then((responseData) => {
        this.setState(responseData);
        console.log(this.state)
    })
  }

  componentDidMount() {
      const fetchData = {
          method: 'GET',
          credentials: 'include',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          })

      }

      fetch(API_URL+'users/3', fetchData)
      .then((response) => response.json())
      .then((responseData) => {
          console.log(responseData)
          this.setState(responseData)
          this.updateValue()
      })

    }

    render() {
        return (
            <div>
              <div className="content">
                <h3>Edit Preferences</h3>
              </div>
              <div className="footer">
                <a className="right waves-effect waves-light btn" onClick={this.saveValue}>
                  <i className="material-icons left">settings</i>Save Preferences
                </a>
              </div>
            </div>

        );
    }
}

export default Preferences
