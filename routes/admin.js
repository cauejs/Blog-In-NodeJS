const express = require('express');
const router = express.Router();

// Admin Routes

router.get('/', (req, res) => {
    res.render('admin/index')
});

router.get('/posts', (req, res) => {
    res.send("Posts Page");
})

router.get('/categories', (req, res) => {
    res.render('admin/categories');
})

router.get('/categories/add', (req, res) => {
    res.render('admin/categoriesAdd');
})

module.exports = router;