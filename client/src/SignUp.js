import React, { Component } from 'react'
import axios from "axios"
import config from "./config"
export default class SignUp extends Component {
  
  constructor(props) {
      super(props)
      this.form = React.createRef() //Creating a ref (new!)
  }  

  state = {
    username: "",
    password: "",
    err: "",
    success: ""
  }

  change = (event)=> {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleSubmit = (e)=> {
    e.preventDefault()
    // passing all values from the form  to FormData using a 'ref' (this is new!)
    let formData = new FormData(this.form.current) 
    axios({
        method: "post",
        url: `${config.baseUrl}/users`,
        config: { headers: {'Content-Type': 'multipart/form-data' }}, //New! This is a different encoding type, because we're uploading files
        data: formData,
        withCredentials: true
    })
    .then((response)=> {
  
        this.setState({success: "user succesfully created"})
    })
    .catch((err)=> {
  
        this.setState({err: err.message})
    })
  }

  render() {

    return (
      <div className="section container column is-half">
        {/* binding the ref (new!) */}
        <form className="" ref={this.form} onSubmit={this.handleSubmit} >

          <div className="field">
            <label className="label is-pulled-left">Username</label>
            <div className="control has-icons-left">
              <input className="input" onChange={this.change} type="text" name="username" value={this.state.username} placeholder="username"/>
              <span className="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label is-pulled-left">Password</label>
            <div className="control has-icons-left">
              <input className="input" onChange={this.change} type="password" name="password" value={this.state.password} placeholder="password"/>
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <div className="file">
              <label className="file-label">
                <input className="file-input" type="file" name="profile-picture" /> 
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">
                    Choose a profile picture
                  </span>
                </span>
              </label>
            </div>
          </div>

          
          {/* file is not a "controlled" component */}
          {/* the name of the file input field has the be alligned with multer in the back-end:  upload.single('profile-picture') */}
        
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" type="submit">Submit</button>
            </div>
          </div>
          <p style={{color: "red"}}>{this.state.err? this.state.err:""}</p>
          <p style={{color: "green"}}>{this.state.success? this.state.success:""}</p>
        </form>
        
        
      
      </div>
    )
  }
}
