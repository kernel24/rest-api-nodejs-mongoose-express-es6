import React  from 'react'
import { Link } from 'react-router'
import Item from './Item'

import 'babel-polyfill'

const API_URL = 'http://localhost:8080/'
const USERID = 1

class Preferences extends React.Component {
  constructor() {
    super(...arguments)

    this.state = {
      'user_name':'',
      'location': '',
      'content': {'category_lists':''},
      'privacy': {'profile_visibility': '', 'messages': ''},
      'localization': {'language': '', 'time_zone': '', 'currency': ''}
    }

    this.getUserSession = this.getUserSession.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.saveValue = this.saveValue.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async updateValue(){
    const fetchData = {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })

    }

    await fetch(API_URL+'preferences/', fetchData)
    .then((response) => response.json())
    .then((responseData) => {
        this.setState(responseData);
        console.log(this.state)
        if(responseData.error) alert(responseData.error+" please refresh your page.")
    })
  }

  async saveValue(){
    const fetchData = {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(this.state)
    }

    await fetch(API_URL+'preferences/', fetchData)
    .then((response) => response.json())
    .then((responseData) => {
        this.setState(responseData);
        console.log(this.state)
        if(responseData.message) alert(responseData.message)
        if(responseData.error) alert(responseData.error+" please refresh your page.")
    })
  }

  async getUserSession() {
    const fetchData = {
        method: 'GET',
        credentials: 'include',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        })

    }

    await fetch(API_URL+'users/'+USERID, fetchData)
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData)
        this.setState(responseData)
    })
  }

  componentDidMount() {
        const fetchPreferences = async () => {
            await this.getUserSession()
            await this.updateValue()
        }
        fetchPreferences()

    }

    handleChange(event) {
      console.log("handleChange: "+event.target.name+" "+event.target.value)
      if(event.target.name == "language")
        this.state.localization.language = event.target.value
      else if(event.target.name === 'time_zone')
        this.state.localization.time_zone = event.target.value
      else if(event.target.name === 'currency')
        this.state.localization.currency = event.target.value
      else if(event.target.name == 'profile_visibility')
        this.state.privacy.profile_visibility = event.target.value
      else if(event.target.name == 'messages')
        this.state.privacy.messages = event.target.value
      else if(event.target.name === 'category_lists') {
        this.state.content.category_lists = event.target.value
      }
    }

    render() {

      const preferences = {
          language:
          {
                name: 'language',
                type: 'select',
                options: [
                    {
                        name: "English",
                        value: "en"
                    },
                    {
                        name: "한국어",
                        value: "ko"
                    },
                    {
                        name: "日本語",
                        value: "jp"
                    },
                    {
                        name: "简体中文",
                        value: "zh-cn"
                    }
                  ]
          },
          time_zone:
          {
                name: 'time_zone',
                type: 'select',
                options: [
                    {
                        name: "(UTC-07:00) America/Los_Angeles",
                        value: "America/Los_Angeles"
                    },
                    {
                        name: "(UTC+09:00) Asia/Seoul",
                        value: "Asia/Seoul"
                    },
                    {
                        name: "(UTC+09:00) Asia/Tokyo",
                        value: "Asia/Tokyo"
                    },
                    {
                        name: "(UTC+06:30) Indian/Cocos",
                        value: "Indian/Cocos"
                    }
                ]
          },
          currency:
          {
                name: 'currency',
                type: 'select',
                options: [
                    {
                        name: "Euros (€)",
                        value: "EUR"
                    },
                    {
                        name: "U.S. dollars ($)",
                        value: "USD"
                    },
                    {
                        name: "South Korean won (₩)",
                        value: "KRW"
                    },
                    {
                        name: "Japanese yen (¥)",
                        value: "JPY"
                    }
                ]
          },
          profile_visibility:
          {
                name: 'profile_visibility',
                type: 'radio',
                options: [
                    {
                        name: 'Everyone',
                        value: 'everyone',
                    },
                    {
                        name: 'Private',
                        value: 'private',
                        icon: 'lock'
                    }
                ]
          },
          messages:
          {
                name: 'messages',
                type: 'radio',
                options: [
                    {
                        name: 'Everyone',
                        value: 'everyone'
                    },
                    {
                        name: 'People you follow',
                        value: 'people'
                    },
                    {
                        name: 'No one',
                        value: 'noone',
                        icon: 'lock'
                    }
                ]
            },
            category_lists:
            {
                  name: 'category_lists',
                  type: 'radio',
                  options: [
                      {
                          name: 'Enable',
                          value: 'enable'
                      },
                      {
                          name: 'Disable',
                          value: 'disable'
                      }
                  ]
              }
        }

        return (
            <div>
              <div className="content main">
                <p className="content-font-head">Edit Preferences</p>
                <div className="divider"></div>
                <div className="row">
                     <div className="col s3">
                       <p className="content-font-title">Localization</p>
                     </div>
                     <div className="col s6">
                        <p />
                        <div className="content-font-bold">Language</div>
                        <Item items={preferences.language} selectedItem={this.state.localization.language} onUpdate={this.handleChange}/>
                        <div className="content-font">Interested in helping translate Fancy?<a href=""> Let us know.</a></div>
                        <p />
                        <div className="content-font-bold">Time zone</div>
                        <Item items={preferences.time_zone} selectedItem={this.state.localization.time_zone} onUpdate={this.handleChange}/>
                        <p />
                        <div className="content-font-bold">Currency</div>
                        <Item items={preferences.currency} selectedItem={this.state.localization.currency} onUpdate={this.handleChange}/>
                     </div>
                     <div className="col s3">
                       <p/>
                     </div>
                </div>

                 <div className="divider"></div>

                 <div className="row">

                      <div className="col s3">
                        <p className="content-font-title">Privacy</p>
                      </div>
                      <div className="col s9">
                        <p/>
                        <div className="content-font-bold">Profile visibility</div>
                        <div className="content-font">Manage who can see your activity, things you fancy, your followers, people you follow or in anyone’s search results.</div>

                        <p/>
                        <Item items={preferences.profile_visibility} selectedItem={this.state.privacy.profile_visibility} onUpdate={this.handleChange}/>
                        <p/>

                        <div className="content-font-bold">Messages</div>
                        <div className="content-font">Control who can send you messages.</div>
                        <p/>
                        <Item items={preferences.messages} selectedItem={this.state.privacy.messages} onUpdate={this.handleChange}/>
                        <p/><p/><p/>
                        <div className="content-font-bold">Recently viewed</div>
                        <div className="content-font">Manage your Fancy browsing history.</div>
                        <p/>
                        <div className="content-font"><a href="">Delete all items.</a></div>
                      </div>
                 </div>
                 <div className="divider"></div>

                 <div className="row">
                      <div className="col s3">
                        <p className="content-font-title">Content</p>
                      </div>
                      <div className="col s9">
                        <p/>
                        <div className="content-font-bold">Category lists</div>
                        <div className="content-font">Automatically add Fancy items to the Category list</div>
                        <p/>
                        <Item items={preferences.category_lists} selectedItem={this.state.content.category_lists} onUpdate={this.handleChange}/>
                      </div>
                 </div>
              </div>

              <div className="footer">
                <a className="right waves-effect waves-light btn light-blue darken-3 btn-font" onClick={this.saveValue}>
                  Save Preferences
                </a>
              </div>
            </div>

        )
    }
}

export default Preferences
