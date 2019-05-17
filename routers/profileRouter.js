const express = require('express');
const profileHandler = require('../handlers/profile/profileHandler.js');
const profileRouter = express.Router();
const profileCommentRouter = require('./profileCommentRouter')

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

profileRouter.use('/comment', isLoggedIn, profileCommentRouter)
profileRouter.get('/', isLoggedIn, profileHandler.getFeedFunc);
profileRouter.get('/:id', isLoggedIn, profileHandler.getProfileFeedFunc);
profileRouter.post('/', profileHandler.postFeedFunc);
profileRouter.put('/:id', profileHandler.putFeedFunc);
profileRouter.delete('/:id', profileHandler.deleteFeedFunc);




module.exports = profileRouter;
