/*const User = require("../models/User")

exports.uploadFiles = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
  
    try {
      
  
      const newUser = new User({
        
        password: hash
      })
  
      const savedUser = await newUser.save()
      if (!savedUser) throw Error("Error saving user")
  
      res.status(200).json({ message: "User created successfully" })
    } catch (e) {
      res.status(400).json({ error: e.message })
    }
  }*/