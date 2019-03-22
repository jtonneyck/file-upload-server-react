import React, { Component } from 'react'
import axios from 'axios';
import config from './config'
export default class ListUsers extends Component {
 state = {
     users: []
 }
 componentDidMount() {
     axios({
         method: "get",
         withCredentials: "true",
         url: `${config.baseUrl}/users`
     })
     .then((response)=> {
         this.setState({users: response.data})
     })
 }
  render() {
    return (
      <div className="section container column is-half">
          {this.state.users.map((user)=>
          <div className="section is-full">
            <h1 className="title is-1 has-text-right">{user.username}</h1>
            <img src={`${config.baseUrl}/${user.profilePicture}`} alt="profile"/>
          </div> 
          )}
      </div>
    )
  }
}
