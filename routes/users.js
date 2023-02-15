var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Products = require("../model/Products");
const User = require("../model/Users");
const Category = require("../model/Category");

/* GET users listing. */
router.post('/signupuser', async function (req, res) {
  try {

    let username = await User.findOne({ username: req.body.username });
    let email = await User.findOne({ email: req.body.email });

    if (email || username) {
      return res.status(400).json({
        state: false,
        message: "Usrname or Email already exists"
      });
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)

    let newAdmin = await AdmineUser.create({
      username: req.body.adminname,
      number: req.body.number,
      email: req.body.email,
      photo: req.body.photo,
      password: secPass,
    })

    if (!newAdmin) {
      return res.status(400).json({ state: false, message: "Admin could not created" })
    }

    res.status(200).json({ state: true, message: "Admin created successfuly" })

  } catch (error) {
    console.log(error);
  }
});


router.post('/loginuser', async function (req, res) {
  let success = false;
  try {
    let user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.json({ 
          success: false, 
          message: "You dosent exist hear" 
      })
    }

    const passwordCompair = await bcrypt.compare(req.body.password, user.password)
    if (!passwordCompair) {
        success = false;
        return res.status(400).json({ 
            success, 
            error: "Pleace login with correct credintials"
        });
    }

    const data = {
      user: {
        id: user.id
      }
    }

    const authTocken = jwt.sign(data, JWT_SCRET)
    success = true;
    res.json({ success, authTocken })

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Some error occured")
  }
 
});

/* GET All Product */
router.get("/getallproduct", async function (req, res) {
  try {
    let allProduct = await Products.find({approve: true, verified: true})

    if(!allProduct){
      return res.status(400).json({ state: false, message: "product could not find" })
    }
    console.log(allProduct);
    res.status(200).json({ state: true, message: allProduct})
  } catch (error) {
    console.log(error);
  }
})

/* GET Show all Category */
router.get('/getallcategory', async function (req, res) {
  try {
    let category = await Category.find();

    if(!category){
      return res.status(400).json({state: false, message: "could not find any category"})
    }

    res.status(200).json({state: true, message: category});

  } catch (error) {
    console.log(error);
  }
})


module.exports = router;
