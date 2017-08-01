import React  from 'react'
import { Link } from 'react-router'

const API_URL = 'http://localhost:8080/'
const USERID = 4

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
    this.handleChange = this.handleChange.bind(this)
    this.getInitialState()
  }

  getInitialState() {
    return {
        done: false
    }
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

      fetch(API_URL+'users/'+USERID, fetchData)
      .then((response) => response.json())
      .then((responseData) => {
          console.log(responseData)
          this.setState(responseData)
          this.updateValue()
      })

    }

    handleChange(event) {
      console.log(event.target.name+" "+event.target.value)

      if(event.target.name === 'languange')
        this.state.localization.language = event.target.value
      if(event.target.name === 'time_zone')
        this.state.localization.time_zone = event.target.value
      if(event.target.name === 'currency')
        this.state.localization.currency = event.target.value
      if(event.target.name === 'profile_visibility')
        this.state.privacy.profile_visibility = event.target.value
      if(event.target.name === 'messages')
        this.state.privacy.messages = event.target.value
      if(event.target.name === 'category_lists')
        this.state.content.category_lists = event.target.value
    }

    render() {
        return (
            <div>
              <div className="content main">
                <p className="content-font">Edit Preferences</p>
                <div className="divider"></div>
                <div className="row">
                     <div className="col s3">
                       <p>Localization</p>
                     </div>
                     <div className="col s6">
                        <p />
                        <div className="content-font">Language</div>
                        <select className="browser-default" name="languange" onChange={this.handleChange}>
                          <option value="eng" selected={this.state.localization.language === "eng"}>English</option>
                          <option value="ko" selected={this.state.localization.language === "ko"}>한국어</option>
                          <option value="jp" selected={this.state.localization.language === "jp"}>日本語</option>
                          <option value="zh-cn" selected={this.state.localization.language === "zh-cn"}>简体中文</option>
                        </select>
                        <div className="content-font">Interested in helping translate Fancy?<a href=""> Let us know.</a></div>
                        <p />
                        <div className="content-font">Time zone</div>
                        <select className="browser-default" name="time_zone" onChange={this.handleChange}>
                          <option value="America/Los_Angeles" selected={this.state.localization.time_zone === "America/Los_Angeles"}>(UTC-07:00) America/Los_Angeles</option>
                          <option value="Asia/Seoul" selected={this.state.localization.time_zone === "Asia/Seoul"}>(UTC+09:00) Asia/Seoul</option>
                          <option value="Asia/Tokyo" selected={this.state.localization.time_zone === "Asia/Tokyo"}>(UTC+09:00) Asia/Tokyo</option>
                          <option value="Indian/Cocos" selected={this.state.localization.time_zone === "Indian/Cocos"}>(UTC+06:30) Indian/Cocos</option>
                        </select>
                        <p />

                        <div className="content-font">Currency</div>
                        <select className="browser-default" name="currency" onChange={this.handleChange}>
                          <option value="EUR" selected={this.state.localization.currency === "EUR"}>Euros (€)</option>
                          <option value="USD" selected={this.state.localization.currency === "USD"}>U.S. dollars ($)</option>
                          <option value="KRW" selected={this.state.localization.currency === "KRW"}>South Korean won (₩)</option>
                          <option value="JPY" selected={this.state.localization.currency === "JPY"}>Japanese yen (¥)</option>
                        </select>

                     </div>
                     <div className="col s3">
                       <p/>
                     </div>
                </div>

                 <div className="divider"></div>

                 <div className="row">

                      <div className="col s3">
                        <p>Privacy</p>
                      </div>
                      <div className="col s9">
                        <p/>
                        <div className="content-font">Profile visibility</div>
                        <div className="content-font">Manage who can see your activity, things you fancy, your followers, people you follow or in anyone’s search results.</div>

                        <p/>
                        <div className="row" onChange={this.handleChange}>
                            <div className="col s3">
                              <input className="with-gap" name="profile_visibility" type="radio" id="profile_visibility_everyone" value="0" defaultChecked={this.state.privacy.profile_visibility == 0} />
                              <label htmlFor="profile_visibility_everyone" className="content-font">Everyone</label>
                            </div>

                            <div className="col s9">
                              <input className="with-gap" name="profile_visibility" type="radio" id="profile_visibility_private" value="1" defaultChecked={this.state.privacy.profile_visibility == 1} />
                              <label htmlFor="profile_visibility_private"><i className="material-icons md-dark">lock</i> Private</label>
                            </div>
                        </div>
                        <p/>

                        <div className="content-font">Messages</div>
                        <div className="content-font">Control who can send you messages.</div>
                        <p/>
                        <div className="row" onChange={this.handleChange}>
                            <div className="col s3">
                              <input className="with-gap" name="messages" type="radio" id="messages_everyone" value='0' defaultChecked={this.state.privacy.messages == 0} />
                              <label htmlFor="messages_everyone" className="content-font">Everyone</label>
                            </div>
                            <div className="col s4">
                              <input className="with-gap" name="messages" type="radio" id="messages_people" value='1' defaultChecked={this.state.privacy.messages == 1} />
                              <label htmlFor="messages_people" className="content-font">People you follow</label>
                            </div>
                            <div className="col s5">
                              <input className="with-gap" name="messages" type="radio" id="messages_nobody" value='2'  defaultChecked={this.state.privacy.messages == 2} />
                              <label htmlFor="messages_nobody"><i className="material-icons md-dark">lock</i>No one</label>
                            </div>
                        </div>
                        <p/><p/><p/>
                        <div className="content-font">Recently viewed</div>
                        <div className="content-font">Manage your Fancy browsing history.</div>
                        <p/>
                        <div className="content-font"><a href="">Delete all items.</a></div>
                      </div>
                 </div>
                 <div className="divider"></div>

                 <div className="row">
                      <div className="col s3">
                        <p>Content</p>
                      </div>
                      <div className="col s9">
                        <p/>
                        <div className="content-font">Category lists</div>
                        <div className="content-font">Automatically add Fancy items to the Category list</div>
                        <p/>
                        <div className="row" onChange={this.handleChange}>
                            <div className="col s3">
                              <input className="with-gap" name="category_lists" type="radio" id="category_lists_enable" value="1" defaultChecked={this.state.content.category_lists == 0} />
                              <label htmlFor="category_lists_enable" className="content-font">Enable</label>
                            </div>
                            <div className="col s9">
                              <input className="with-gap" name="category_lists" type="radio" id="category_lists_disable" value="0" defaultChecked={this.state.content.category_lists == 1} />
                              <label htmlFor="category_lists_disable">Disable</label>
                            </div>
                        </div>
                      </div>
                 </div>
              </div>

              <div className="footer">
                <a className="right waves-effect waves-light btn" onClick={this.saveValue}>
                  <i className="material-icons left">settings</i>Save Preferences
                </a>
              </div>
            </div>

        )
    }
}

export default Preferences
