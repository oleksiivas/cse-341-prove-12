const express = require('express')
const router = express.Router()

const users = ['admin'] // Dummy array for users

router.get('/', (req, res, next) => {
    res.render('pages/pr12-login', {
        title: 'Prove Activity 12',
        path: '/proveActivities/12'
    })
})

// Verify login submission to access chat room.
router.post('/login', (req, res, next) => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/

    const username = req.body.username.trim()

    if (!username || username === '')
        return res.status(400).send({
            error: 'Username is empty!'
        })

    if (users.includes(username))
        return res.status(409).send({
            error: 'Username is taken!'
        })

    users.push(username)

    console.log(users)
    console.log(username)

    req.session.user = username

    console.log(req.session.user)

    res.status(200).send({
        username: username
    })
})

// Render chat screen.
router.get('/chat', (req, res, next) => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/

    res.render('../views/pages/pr12-chat.ejs', {
        title: 'New Title :D',
        path: '/prove12',
        user: req.session.user
    })
})

module.exports = router