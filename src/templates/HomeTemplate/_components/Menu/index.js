import React from 'react';
import { NavLink } from 'react-router-dom'

export default function Menu() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require('../../../../assets/img/download.jfif')} alt="logo" />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card mr-1" />
          <NavLink exact to="/home" activeClassName="active">Cyber Board</NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-1" />
          <NavLink to="/create-project" activeClassName="active">Create Project</NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck mr-1" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-filter mr-1" aria-hidden="true"></i>
          <span> Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste mr-1" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow mr-1" />
          <span> Reports</span>
        </div>
        <div>
        <i className="fa fa-archive mr-1" aria-hidden="true"></i>
          <span>Components</span>
        </div>
      </div>
    </div>
  )
}
