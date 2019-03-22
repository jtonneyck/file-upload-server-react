var express = require('express');
var router = express.Router();
var User = require("../models/user")
var multer = require("multer")
var bcrypt = require("bcrypt")
var upload = multer({ dest: 'public/images' })

 /* the name of the file input field has the be alligned with multer on the front-end: 
  <input type="file" name="profile-picture" /> 
 */
router.post("/users", upload.single('profile-picture'), (req, res)=> {
    debugger
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if(err) res.status(500).json({message: err}) //500 is a server error status code and will trigger catch in axios
      else {
        let newUser = req.body
        if(req.file) newUser.profilePicture = req.file.path
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

router.get("/users", (req, res)=> {
  debugger
  User.find({})
  .then((result)=>
    res.status(200).json(result)
  )
  .catch((err)=> {
    res.status(500).json({message: err})
  })
})

router.post("/user/login", (req, res)=> {
  //do it yourself. :p
})

module.exports = router;
