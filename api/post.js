const express = require('express');
const router = express.Router();
const util = require('../utils');
const db = require('../models');


router.get('/', (req, res) => {
        db.Post.findAll({}, { where: { draft: false }})
        .then(( result ) => {
            util.send(res, 'success', 'Fetched all posts.', 200, result)
        })
        .catch(( error ) => {
            util.send(res, 'error', error.message, 400)
        })
})

router.get('/author/:id', (req, res) => {
        const id = req.params.id;

        db.Post.findAll({}, { where: { draft: false, id: id }})
        .then(( result ) => {
            util.send(res, 'success', `Fetched all posts for authour ${id}`, 200, result)
        })
        .catch(( error ) => {
            util.send(res, 'error', error.message, 400)
        })
})

// TODO Change authentification
router.post('/', (req, res) => {
    if (!req.session.passport) {
        return util.send(res, 'failure', 'You need to be authenticated to do this.', 401)
    }

    db.Post.create({
        title: req.body.title,
        content: req.body.content,
        draft: req.body.draft,
    })
    .then(( post ) => {
        util.send(res, 'success', 'Created post.', 201, post)
    })
    .catch(( error ) => {
        util.send(res, 'error', error.message, 400)
    })
})

router.put('/:id', (req, res) => {
    if (!req.session.passport) {
        return util.send(res, 'failure', 'You need to be authenticated to do this.', 401)
    }

    db.Post.update({
        title: req.body.title,
        content: req.body.content,
        draft: req.body.draft,
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(( post ) => {
        if (!post)
            throw `Could not find post with id ${req.params.id}`
        util.send(res, 'success', 'Updated post.', 200, post) 
    })
    .catch(( error ) => {
        util.send(res, 'error', error.message, 404)
    })
})

router.delete('/:id', (req, res) => {
    if (!req.session.passport) {
        return util.send(res, 'failure', 'You need to be authenticated to do this.', 401)
    }

    db.Post.destroy({ where: {id: req.params.id} })
    .then(( post ) => {
        if (!post)
            throw `Could not find post with id ${req.params.id}`
        util.send(res, 'success', 'Deleted post', 200, post)
    })
    .catch(( error ) => {
        util.send(res, 'error', error.message, 404)
    })
})

router.get('/:id', (req, res) => {
    db.Post.findOne({ where: {id: req.params.id} })
    .then(( posts ) => {
        if (!post)
            throw `Could not find post with id ${req.params.id}`
               util.send(res, 'success', 'Fetched post.', 200, post)
    })
    .catch(( error ) => {
        util.send(res, 'error', error, 404)
    })
})

module.exports = router
