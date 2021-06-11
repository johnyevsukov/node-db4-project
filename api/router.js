const express = require('express')
const Recipe = require('./model')
const { checkRecipeId } = require('./middleware')

const router = express.Router()

router.get('/:recipe_id', checkRecipeId, (req, res, next) => {
    res.status(200).json(req.recipe)
})

module.exports = router