import express from 'express'
import { auth } from '../middleware/auth.js'
import { donateValidator } from '../middleware/validate.js'
import db from '../database/connect.js'

const Router = express.Router()

Router.post('/', auth, async (req, res) => {
    try {

        req.body.userId = req.session.user.id
        await db.Donation.create(req.body)
        res.send('Komentaras sėkmingai išsaugotas')
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko serverio klaida')
    }
})

export default Router