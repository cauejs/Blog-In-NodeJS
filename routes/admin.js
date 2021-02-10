const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Category")
const Category = mongoose.model("categories");

// Admin Routes

router.get('/', (req, res) => {
    res.render('admin/index')
});

router.get('/posts', (req, res) => {
    res.send("Posts Page");
});

router.get('/categories', (req, res) => {
    res.render('admin/categories');
});

router.get('/categories/add', (req, res) => {
    res.render('admin/categoriesAdd');
});

router.post("/categories/new", (req, res) => {

    var errors = [];

    if(!req.body.name || typeof req.body.name == undefined || req.body.name == null) {
        errors.push({text: "Name invalid!"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        errors.push({text: "Slug invalid!"})
    }

    if(req.body.name.length < 2) {
        errors.push({text: "The name entered is too small!"})
    }

    if(/\s/g.test(req.body.slug)) {
        errors.push({text: "Slug Cannot Contain Spaces!"});
    }
    
    if(/[A-Z]/gm.test(req.body.slug)) {
        errors.push({text: "Slug Cannot Contain Capital Letters!"});
    }

    if(errors.length > 0) {
        res.render("admin/categoriesAdd", {errors})
    } else {
        const newCategory = {
            name: req.body.name,
            slug: req.body.slug
        }
    
        new Category(newCategory).save().then(() => {
            req.flash("success_msg", "Category created successfully!")
            res.redirect("/admin/categories")
        }).catch(err => {
            req.flash("error_msg", "There was an error saving the category, try again!")
            res.redirect("/admin")
        })
    }
});

module.exports = router;