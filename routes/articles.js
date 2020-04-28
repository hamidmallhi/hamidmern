const express = require('express');

const router = express.Router();

const Articles = require('../models/articles');


// Routes
// get all articles
router.get('/', (req, res) => {

    Articles.find({  })
        .then(article => res.json(article))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

// add new article

router.post('/add', (req, res) => {

    const newArticle = new Articles({
       title: req.body.title,
       article: req.body.article,
       author: req.body.author 
    })

    newArticle.save()
    .then(() => res.json('The new article posted successfully'))
    .catch(err => res.status(400).json(`Error: ${err}`))

})

// find article by id 

router.get('/:id', (req, res) => {

    Articles.findById(req.params.id)
    .then(article => res.json(article))
    .catch(err => res.status(400).json(`Error: ${err}`)) 
})


// find article by id and UPDATE

router.put('/update/:id', (req, res) => {

    Articles.findById(req.params.id)
    .then(article => {
        article.title = req.body.title,
        article.article = req.body.article,
        article.author= req.body.author

        article.save()
        .then(() => res.json('Article is updated successfully'))
        .catch(err => res.status(400).json(`Error: ${err}`))
    })
    .catch(err => res.status(400).json(`Error: ${err}`)) 
})

// find article by id and DELETE

router.delete('/:id', (req, res) => {

    Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json('The article is deleted!'))
    .catch(err => res.status(400).json(`Error: ${err}`)) 
})

module.exports = router;
