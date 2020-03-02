const util = require('../utils');

module.exports = (server, db) => {
    server.get('/api/posts/', async (req, res, next) => {
        try {
            result = await db.Post.findAll({}, { where: { draft: false }})
        }
        catch (error) {
            return util.send(res, 'error', error.message, 400)
        }

        return util.send(res, 'success', 'Fetched all posts.', 200, result)
    })

    server.get('/api/posts/author/:id', async (req, res, next) => {
        try {
            result = await db.Post.findAll({}, { where: { draft: false, id: req.params.id }})
        }
        catch (error) {
            return util.send(res, 'error', error.message, 400)
        }

        return util.send(res, 'success', 'Fetched all posts.', 200, result)
    })

    server.post('/api/posts/', async (req, res) => {
        if (!req.session.passport) {
            return util.send(res, 'failure', 'You need to be authenticated to do this.', 401)
        }

        try {
            post = await db.Post.create({
                title: req.body.title,
                content: req.body.content,
                draft: req.body.draft,
            })
        }
        catch (error) {
            return util.send(res, 'error', error.message, 400)
        }

        return util.send(res, 'success', 'Created post.', 201, post)
    })

    server.put('/api/posts/:id', async (req, res) => {
        if (!req.session.passport) {
            return util.send(res, 'failure', 'You need to be authenticated to do this.', 401)
        }

        try {
            post = await db.Post.update({
                title: req.body.title,
                content: req.body.content,
                draft: req.body.draft,
            },
            {
                where: {
                    id: req.params.id
                }
            })

            if (!post)
                throw `Could not find post with id ${req.params.id}`
        }
        catch (error) {
            return util.send(res, 'error', error.message, 404)
        }

        return util.send(res, 'success', 'Updated post.', 200, post) 
    })

    server.delete('/api/posts/:id', async (req, res) => {
        if (!req.session.passport) {
            return util.send(res, 'failure', 'You need to be authenticated to do this.', 401)
        }

        try {
            post = await db.Post.destroy({ where: {id: req.params.id} })

            if (!post)
                throw `Could not find post with id ${req.params.id}`
        }
        catch (error) {
            return util.send(res, 'error', error.message, 404)
        }

        return util.send(res, 'success', 'Deleted post', 200, post)
    })

    server.get('/api/posts/:id', async (req, res) => {
        try {
            post = await db.Post.findOne({ where: {id: req.params.id} })

            if (!post)
                throw `Could not find post with id ${req.params.id}`
        }
        catch (error) {
            return util.send(res, 'error', error, 404)
        }

        return util.send(res, 'success', 'Fetched post.', 200, post)
    })
}
