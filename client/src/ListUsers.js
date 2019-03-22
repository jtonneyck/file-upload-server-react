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
      <div>
          {this.state.users.map((user)=> 
            <img src={`${config.baseUrl}/${user.profilePicture}`} alt="profile"/>
          )}
      </div>
    )
  }
}
