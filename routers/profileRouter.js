const express = require('express');
const profileHandler = require('../handlers/profile/profileHandler.js');
const profileRouter = express.Router();
const profileCommentRouter = require('./profileCommentRouter')

profileRouter.use('/comment', profileCommentRouter)
profileRouter.get('/', profileHandler.getFeedFunc);
profileRouter.post('/', profileHandler.postFeedFunc);
profileRouter.put('/:id', profileHandler.putFeedFunc);
profileRouter.delete('/:id', profileHandler.deleteFeedFunc);




module.exports = profileRouter;
