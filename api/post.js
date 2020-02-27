module.exports = (server, db) => {
    server.get('/posts/', (req, res) => {
        db.Post.findAll().then( (result) => res.json(result))
    })

    server.post('/posts/', (req, res) => {
        db.Post.create({
            title: req.body.title,
            content: req.body.content,
            draft: req.body.draft,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    })

    server.put('/posts/:id', (req, res) => {
        db.Post.update({
            title: req.body.title,
            content: req.body.content,
            draft: req.body.draft,
            updatedAt: new Date()
        },
        {
            where: {
                id: req.params.id
            }
        })
    })

    server.delete('/posts/:id', (req, res) => {
        db.Post.destroy({ where: {id: req.params.id} })
    })

    server.get('/posts/:id', (req, res) => {
        db.Post.findOne({ where: {id: req.params.id} }).then( (result) => res.json(result))
    })
}
