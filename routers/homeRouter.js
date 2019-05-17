const express = require('express');
const homeHandler = require('../handlers/home/homeHandler');
const homeRouter = express.Router();
const homeCommentRouter = require('./homeCommentRouter')

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

homeRouter.get('/', isLoggedIn, homeHandler.getFeedFunc);
homeRouter.post('/', homeHandler.postFeedFunc);
homeRouter.put('/:id', homeHandler.putFeedFunc);
homeRouter.delete('/:id', homeHandler.deleteFeedFunc);


homeRouter.use('/comment', homeCommentRouter)


module.exports = homeRouter;
