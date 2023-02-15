var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdmineUser = require("../model/AdminUser");
const Products = require("../model/Products");
const Category = require("../model/Category");
const { uploadPhoto } = require("../middleware/uploadFile");

let JWT_SCRET = "AdminUser"

/* POST Login. */
router.post('/login', async function (req, res) {
    let success = false;
    try {
        let user = await AdmineUser.findOne({ email: req.body.email })

        if (!user) {
            return res.json({
                success: false,
                message: "You dosent exist hear"
            })
        }

        const passwordCompair = await bcrypt.compare(req.body.password, user.password)
        if (!passwordCompair) {
            console.log("I am hear");
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


/* POST Create Product. */
router.post('/createProducts', async function (req, res) {
    try {
        console.log(req.body);
        let prod = await Products.create({
            productName: req.body.productName,
            adminId: req.body.adminId,
            desc: req.body.desc,
            price: req.body.price,
            photo: req.body.photo,
            category: req.body.category,
            subCategory: req.body.subCategory
        })

        if (!prod) {
            return res.status(400).json({ state: false, message: "Admin could not created" })
        }

        res.status(200).json({ state: true, message: "Product created successfuly" })

    } catch (error) {
        console.log(error);
    }
})

/* GET Show All Post */
router.get('/getallproducts', async function (req, res) {
    const prod = await Products.find()
    res.status(200).json({ state: true, messaage: prod })
})

/* POST Create Categor */
router.post('/createCategories', async function (req, res) {
    try {
        console.log(req.body);
        let isCategory = await Category.findOne({ category: req.body.category })

        if (isCategory) {
            return res.status(400).json({ state: false, message: "Category already exist" })
        }

        let newCategory = await Category.create({
            category: req.body.category,
            subCategory: req.body.subCategory
        })

        if (!newCategory) {
            return res.status(400).json({ state: false, message: "Category created fail" })
        }

        res.status(200).json({ state: true, message: "Category created succesfully" })

    } catch (error) {
        console.log(error);
    }
})

/* GET Show all Category */
router.get('/getallcategory', async function (req, res) {
    try {
        let category = await Category.find();

        if (!category) {
            return res.status(400).json({ state: false, message: "could not find any category" })
        }

        res.status(200).json({ state: true, message: category })
    } catch (error) {

    }
})

router.get('/getuserDetails/:id', async function (req, res) {
    let userDetails = await AdmineUser.findById(req.params.id);
    res.status(200).json({ state: true, data: userDetails });
})

module.exports = router;