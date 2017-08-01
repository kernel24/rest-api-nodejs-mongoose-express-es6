import React  from 'react'
import { Link } from 'react-router'

const API_URL = 'http://localhost:8080/'

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
                        <select className="browser-default" defaultValue={this.state.localization.language}>
                          <option value="eng">English</option>
                          <option value="ko">한국어</option>
                          <option value="jp">日本語</option>
                          <option value="zh-cn">简体中文</option>
                        </select>
                        <div className="content-font">Interested in helping translate Fancy?<a href=""> Let us know.</a></div>
                        <p />
                        <div className="content-font">Time zone</div>
                        <select className="browser-default" defaultValue={this.state.localization.time_zone}>
                          <option value="America/Los_Angeles">(UTC-07:00) America/Los_Angeles</option>
                          <option value="Asia/Seoul">(UTC+09:00) Asia/Seoul</option>
                          <option value="Asia/Tokyo">(UTC+09:00) Asia/Tokyo</option>
                          <option value="Indian/Cocos">(UTC+06:30) Indian/Cocos</option>
                        </select>
                        <p />

                        <div className="content-font">Currency</div>
                        <select className="browser-default" defaultValue={this.state.localization.currency}>
                          <option value="EUR">Euros (€)</option>
                          <option value="USD">U.S. dollars ($)</option>
                          <option value="KRW">South Korean won (₩)</option>
                          <option value="JPY">Japanese yen (¥)</option>
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
                        <div className="row">
                            <div className="col s3">
                              <input className="with-gap" name="group1" type="radio" id="everyone" defaultChecked={this.state.privacy.profile_visibility === 0} />
                              <label htmlFor="everyone" className="content-font">Everyone</label>
                            </div>

                            <div className="col s9">
                              <input className="with-gap" name="group1" type="radio" id="private" defaultChecked={this.state.privacy.profile_visibility === 1} />
                              <label htmlFor="private"><i className="material-icons md-dark">lock</i> Private</label>
                            </div>
                        </div>
                        <p/>

                        <div className="content-font">Messages</div>
                        <div className="content-font">Control who can send you messages.</div>
                        <p/>
                        <div className="row">
                            <div className="col s3">
                              <input className="with-gap" name="group2" type="radio" id="everyone" defaultChecked={this.state.privacy.messages == "0"}/>
                              <label htmlFor="everyone" className="content-font">Everyone</label>
                            </div>
                            <div className="col s4">
                              <input className="with-gap" name="group2" type="radio" id="people" defaultChecked={this.state.privacy.messages == "1"}/>
                              <label htmlFor="people" className="content-font">People you follow</label>
                            </div>
                            <div className="col s5">
                              <input className="with-gap" name="group2" type="radio" id="nobody"  defaultChecked={this.state.privacy.messages == "2"}/>
                              <label htmlFor="nobody"><i className="material-icons md-dark">lock</i>No one</label>
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
                        <div className="row">
                            <div className="col s3">
                              <input className="with-gap" name="group3" type="radio" id="enable" defaultChecked={this.state.content.category_lists === 0} />
                              <label htmlFor="enable" className="content-font">Enable</label>
                            </div>
                            <div className="col s9">
                              <input className="with-gap" name="group3" type="radio" id="disable" defaultChecked={this.state.content.category_lists === 1} />
                              <label htmlFor="disable">Disable</label>
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
