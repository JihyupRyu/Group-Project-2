const express = require('express');
const communityCommentHandler = require('../handlers/community/communityCommentHandler') 
const communityCommentRouter = express.Router();


communityCommentRouter.get('/:id', communityCommentHandler.getCommentFunc)
communityCommentRouter.post('/:id', communityCommentHandler.postCommentFunc);
communityCommentRouter.put('/:id', communityCommentHandler.putCommentFunc);
communityCommentRouter.delete('/:id', communityCommentHandler.deleteCommentFunc);



module.exports = communityCommentRouter;