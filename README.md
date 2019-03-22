# Uploading Images to your own Server with React

## Introduction
This is a tutorial about how to upload files to your server with React. You upload a file by uploading it to the server on the harddisk and storing a reference in the database. You don't upload the file itself to the database.

 On the front-end you need a form with a special input tag of type 'file', a React feature called [refs](https://reactjs.org/docs/refs-and-the-dom.html), the [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) constructor and [axios](https://www.npmjs.com/package/axios) that encodes the content in the multipart/form-data format. On the backend you need a parser for multipart/form-data forms called [Multer](https://www.npmjs.com/package/multer). 


## Front-end

### Refs
React doesn't like it when other things than React are in control of dom elements. That's why you don't use jQuery with React or try to manipulate the dom directly in other ways. Normally, dom manipulation is done indirectly through state and props. You change the state which causes React to rerender the components with different html/jsx. However, there are some situations wherein you do wan't to refer to the dom directly. In that case you use 'refs'. We want to access the form directly, because you can not let `<input type="file" name"profile-pic" />` be controlled by the state in a smooth way. Here we go!

```jsx
// SignUp.js
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
    ...
  }

  render() {

    return (
      <div>
        {/* binding the ref (new!) */}
        <form ref={this.form} onSubmit={this.handleSubmit} >
            <input onChange={this.change} type="text" name="username" value={this.state.username} placeholder="username"/>
            <input onChange={this.change} type="password" name="password" value={this.state.password} placeholder="password"/>
            <input type="file" name="profile-picture" /> 
            {/* file is not a "controlled" component */}
            {/* the name of the file input field has the be alligned with Multer in the back-end:  upload.single('profile-picture') */}
            <button type="submit">Submit</button>
        </form>
        {/*the user will receive feedback in case of success and in case of an error*/}
        <p style={{color: "red"}}>{this.state.err? this.state.err:""}</p>
        <p style={{color: "green"}}>{this.state.success? this.state.success:""}</p>
      </div>
    )
  }
}
```
To establish a ref, you first make one with `React.createRef()` and assign it to a field in the class. Check the constructor in the code above. Second, you bind the ref to the html node you want to refer to. Check the opening tag of `<Form>`

## FormData and Axios
After we've established the ref, we can implement the submit handler. Instead of getting all form data from the state, we're passing the ref to the form to `FormData`. FormData knows how to get all the values out, including the value of `<input type="file" />`. 

After we've collected all the FormData, we can send it to our back-end with axios. Since this is a form containing a file, we've to use another encoding type called 'multipart/form-data'. We've also to enable cors, because we're sending data from another location/origin than the backend (localhost:3000 vs localhost:3001).

``` jsx
// SignUp.js
...
handleSubmit = (e)=> {
    e.preventDefault()
    // passing all values from the form  to FormData using a 'ref' (this is new!)
    let formData = new FormData(this.form.current) 
    axios({
        method: "post",
        url: `${config.baseUrl}/users`,
        config: { headers: {'Content-Type': 'multipart/form-data' }}, //New! This is a different encoding/content-type type, because we're uploading files
        data: formData,
        withCredentials: true
    })
    .then((response)=> {
        // notifying the user
        this.setState({success: "user succesfully created"})
    })
    .catch((err)=> {
        // notifying the user
        this.setState({err: err.message})
    })
}

...
```

### Back-end
If everything went alright, we're receiving the formdata on the 'users' route on the backend correctly. You should check this with a debugger. On the back-end we're going to use Multer to parse the data. Multer is like Bodyparser,but Bodyparser can't handle file uploads. Multer can. We're assuming you've set up the API with express generator.

!Important the argument in `upload.single('profile-picture')` has to match the name field in `<input type="file" name="profile-picture" />`

``` javascript
// router/users.js
var express = require('express');
var router = express.Router();
var User = require("../models/user")
var multer = require("multer")
var bcrypt = require("bcrypt")
var upload = multer({ dest: 'public/images' })

 /* the name of the file input field has the be alligned with multer on the front-end: <input type="file" name="profile-picture" /> 
 */
router.post("/users", upload.single('profile-picture'), (req, res)=> {
    debugger
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if(err) res.status(500).json({message: err}) //500 is a server error status code and will trigger catch in axios on the front-end
      else {
        let newUser = req.body
        newUser.profilePicture = req.file.path
        newUser.password = hash
        User.create(newUser)
        .then((response)=> {
          res.status(200).json(response) //200 is a OK status code
        })
        .catch((err)=> {
          res.status(500).json({message: err}) 
        })
      }
    })
})

```

`var upload = multer({ dest: 'public/images' })` configures in what directory multer should put the file. Multer will give the file a new name that looks like a hash. This is to prevent naming collision in case multiple users upload, for example, a file called "profile.jpeg". After the upload, multer will attach .file to the req object. In req.file you'll find information about the uploaded file, like its complete path. The rest of the user creation goes like usual.

## Back to the Front-end (hihi)

Let's say you want to create a list of users with their profile pictures. How would you go about now? Simple, in a React component you send out a request for all users. Now you loop of them and return an `<img>` with the source matching the profil-picture path. Here's an example:

``` jsx
// ListUsers.js
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
```

config.baseUrl holds the url of the backend. In this case http://localhost:3000. Check out the [repo](https://github.com/Piepongwong/file-upload-server-react) for the working code. 

## To Run working Demo Code

In the root directory execute `npm run install-all` followed by `npm start`.

