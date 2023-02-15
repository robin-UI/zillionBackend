var express = require('express');
var router = express.Router();

const Admine = require("../model/Admin");
const AdmineUser = require("../model/AdminUser");
const { uploadPhoto } = require("../middleware/uploadFile")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Products = require('../model/Products');

const JWT_SCRET = 'admin';

/* POST Login. */
router.post('/login', async function (req, res) {
    let success = false;
    try {
        let user = await Admine.findOne({ email: req.body.email })

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

/* POST Create Admin. */
router.post('/createAdminUser',  async function (req, res) {
    try {

        let username = await AdmineUser.findOne({ adminname: req.body.adminname });
        let email = await AdmineUser.findOne({ email: req.body.email });

        if (email || username) {
            return res.status(400).json({
                state: false,
                message: "Usrname or Email already exists"
            });
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        let newAdmin = await AdmineUser.create({
            adminname: req.body.adminname,
            number: req.body.number,
            email: req.body.email,
            photo: req.body.photo,
            password: secPass,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            myAdmin: req.body.myAdmin,
        })


        if (!newAdmin) {
            return res.status(400).json({ state: false, message: "Admin could not created" })
        }

        res.status(200).json({ state: true, message: "Admin created successfuly" })

    } catch (error) {
        console.log(error);
    }
})

/* POST Upload Image to Server. */
router.post('/adminImageUpload', uploadPhoto.single('file'), (req, res) => {
    res.status(200).json({ message: "file uploded successfuly"})
} )

/*GET Get only your admn-user detail */
router.get('/getAllAdminUser', async function (req, res) {
    try {
        const users = await AdmineUser.find();

        res.status(200).json({ state: true, message: users })
    } catch (error) {

    }
})

/* PUT Approve your admin-user producct */
router.put('/approveproduct/:id', async function(req, res) {
    console.log(req.params.id);
    const prod = await Products.findById(req.params.id);
    const outs = await prod.update({ approve: req.body.approve })
    console.log(outs);
    res.status(200).json({stae: true, message: outs})
})

/* PUT Reject your admin-user producct */
router.put('/rejectproduct/:id', async function(req, res) {
    console.log(req.params.id);
    try {
        const prod = await Products.findById(req.params.id);
        const outs = await prod.update({ approve: req.body.reject })
        console.log(outs);
        res.status(200).json({stae: true, message: outs}) 
    } catch (error) {
        console.log(error);
    }
    
})

/* Show all my admin user products */
router.get('/showAdminUserProducts/:id', async function(req, res){
    try {
        // const adminUser = await AdmineUser.find({myAdmin: req.params.id})
        // let productArr = [];
        // // let product =[]
        // adminUser.map( async (admin) => {
        //     let ids = admin._id.toString()
        //     let prod = await Products.find({adminId: ids})
        //     // productArr.push(prod)
        //     console.log(prod);
        //     // productArr.push(Products.find({adminId: ids}))
        // })
        // console.log(productArr);
        // res.status(200).json(productArr)

        const aggregate = AdmineUser.aggregate([{ $match: { firstName: "Robin"}}])
        console.log(aggregate);

        res.status(200).json({gd: "good"})

    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;