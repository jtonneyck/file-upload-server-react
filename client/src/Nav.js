import React, { Component } from 'react'
import {Link} from "react-router-dom"
export default class Nav extends Component {

  state = {

  }
  render() {
    return (

      <div className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-item">
          <div className="field is-grouped ">
            <p className="control">
              <Link className="button" to="/signup/">Sign up</Link>
            </p>
            <p className="control">
              <Link className="button" to="/users/">Users</Link>
            </p>
          </div>
        </div>
        
      </div>

    )
  }
}