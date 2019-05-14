const express = require('express');
const homeCommentHandler = require('../handlers/home/homeCommentHandler') 
const homeCommentRouter = express.Router();


homeCommentRouter.get('/', homeCommentHandler.getCommentFunc)
homeCommentRouter.post('/:id', homeCommentHandler.postCommentFunc);
homeCommentRouter.put('/:id', homeCommentHandler.putCommentFunc);
homeCommentRouter.delete('/:id', homeCommentHandler.deleteCommentFunc);



module.exports = homeCommentRouter;