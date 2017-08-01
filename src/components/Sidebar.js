import React, { Component }  from 'react'

export default class Sidebar extends Component {
  constructor() {
    super(...arguments);
  }

    render() {
        return (
          <div className="sidebar collection">
            <ul>
                <li><a className="collection-item sidebar-font"><i className="material-icons">account_circle</i>&nbsp; Edit Profile</a></li>
                <li><a className="collection-item active sidebar-font"><i className="material-icons">settings</i>&nbsp; Preferences</a></li>
                <li><a className="collection-item sidebar-font"><i className="material-icons">lock</i>&nbsp; Password</a></li>
                <li><a className="collection-item sidebar-font"><i className="material-icons">notifications</i>&nbsp; Notification</a></li>
                <li><a className="collection-item sidebar-font"><i className="material-icons">supervisor_account</i>&nbsp;  Connected Accounts</a></li>
                <li><a className="collection-item sidebar-font"><i className="material-icons">receipt</i>&nbsp;  Order</a></li>
                <li><a className="collection-item sidebar-font"><i className="material-icons">payment</i>&nbsp;  Payment</a></li>
                <li><a className="collection-item sidebar-font"><i className="material-icons">local_shipping</i>&nbsp;  Shipping</a></li>
                <li><a className="collection-item sidebar-font"><i className="material-icons">euro_symbol</i>&nbsp;  Credits & Referrals</a></li>
            </ul>
          </div>
        )
    }
}
