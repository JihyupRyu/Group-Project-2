const express = require('express');
const profileCommentHandler = require('../handlers/profile/profileCommentHandler') 
const profileCommentRouter = express.Router();


profileCommentRouter.get('/:id', profileCommentHandler.getCommentFunc)
profileCommentRouter.post('/:id', profileCommentHandler.postCommentFunc);
profileCommentRouter.put('/:id', profileCommentHandler.putCommentFunc);
profileCommentRouter.delete('/:id', profileCommentHandler.deleteCommentFunc);



module.exports = profileCommentRouter;





























