const Util = require('../utils');

const util = new Util();

module.exports = (server, db) => {
    server.get('/posts/', async (req, res, next) => {
        try {
            result = await db.Post.findAll()
        }
        catch (error) {
            return util.send(res, 'error', error.message, 400)
        }

        return util.send(res, 'success', 'Fetched all posts.', 200, result)
    })

    server.post('/posts/', async (req, res) => {
        try {
            const post = db.Post.create({
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

    server.put('/posts/:id', async (req, res) => {
        try {
            const post = db.Post.update({
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

    server.delete('/posts/:id', async (req, res) => {
        try {
            const post = db.Post.destroy({ where: {id: req.params.id} })

            if (!post)
                throw `Could not find post with id ${req.params.id}`
        }
        catch (error) {
            return util.send(res, 'error', error.message, 404)
        }

        return util.send(res, 'success', 'Deleted post', 200, post)
    })

    server.get('/posts/:id', async (req, res) => {
        var post;
        try {
            post = db.Post.findOne({ where: {id: req.params.id} }).then( (result) => res.json(result))

            if (!post)
                throw `Could not find post with id ${req.params.id}`
        }
        catch (error) {
            return util.send(res, 'error', error.message, 404)
        }

        console.log("hello")
        return util.send(res, 'success', 'Fetched post.', 200, post)
    })
}
