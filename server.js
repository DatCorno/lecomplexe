const express = require('express');
const path = require('path');
const next = require('next');
const Sequelize = require('sequelize');
const finale = require('finale-rest');
const bodyParser = require('body-parser');

const db = require('./models');

const apiPosts = require(__dirname + "/api/post")

// Get constants from the environment variables
const dev = process.env.NODE_DEV !== 'production';
const connection_string = process.env.CONNECTION_STRING;

// Do Next.JS magic to setup own server
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
    // Init Express server
    const server = express()

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: false }))

    var sequelize = setupDatabase()

    apiPosts(server, db)

    // Forward all requests to pages to the Next.JS handler
    server.get('*', (req, res) => {
        return handle(req, res)
    })

    db.sequelize.sync({ force: false })
    .then(() => {
            server.listen(3000, (err) => {
                if (err) throw err
                console.log("> Ready on http://localhost:3000")
            })
        });
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
});

setupDatabase = () => {

}
