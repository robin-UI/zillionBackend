var express = require('express');
var router = express.Router();

const Admin = require("../model/Admin");
const bcrypt = require('bcryptjs');
const Products = require('../model/Products');

var superUser = {
  email: "superAdmin@mail.com",
  password: "123456789"
}

/* POST Login. */
router.post('/login', function (req, res) {
  if (req.body.email === superUser.email && req.body.password === superUser.password) {
    res.status(200).json({ state: true, message: "you login success-fully" })
  }
  res.status(400).json({ state: false, message: "your login fails" })
});

/* POST Create Admin. */
router.post('/createAdmin', async function (req, res) {
  try {
    let username = await Admin.findOne({ username: req.body.username });
    let email = await Admin.findOne({ email: req.body.email });

    if (email || username) {
      return res.status(400).json({
        state: false,
        message: "Usrname or Email already exists"
      });
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)

    let newAdmin = await Admin.create({
      username: req.body.username,
      email: req.body.email,
      password: secPass,
    })

    if (!newAdmin) {
      return res.status(400).json({ state: false, message: "Admin could not created" })
    }

    res.status(200).json({ state: true, message: "Admin created successfuly" })

  } catch (error) {
    console.log(error);
  }
})

router.get('/getAlluser', async function (req, res) {
  try {
    const users = await Admin.find();

    res.status(200).json({state: true, message: "This is message"})
  } catch (error) {

  }
})

router.put('/verifyproduct/:id', async function(req, res) {
  try {
    const prod = await Products.findById(req.params.id);
    const outs = await prod.update({ verified: req.body.approve })
    console.log(outs);
    res.status(200).json({stae: true, message: outs})
    console.log(req.params.id);
  } catch (error) {
    console.log(error);
  }

})

router.put('/unVerifyproduct/:id', async function(req, res) {
  console.log(req.params.id);
  try {
    const prod = await Products.findById(req.params.id);
    const outs = await prod.update({ verified: req.body.reject })
    console.log(outs);
    res.status(200).json({state: true, message: outs}) 
  } catch (error) {
    console.log(error);
  }
  
})

module.exports = router;
