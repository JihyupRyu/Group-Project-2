const express = require('express');
const profileCommentHandler = require('../handlers/profile/profileCommentHandler') 
const profileCommentRouter = express.Router();


profileCommentRouter.get('/:id', profileCommentHandler.getCommentFunc)
profileCommentRouter.post('/:id', profileCommentHandler.postCommentFunc);
profileCommentRouter.put('/:id', profileCommentHandler.putCommentFunc);
profileCommentRouter.delete('/:id', profileCommentHandler.deleteCommentFunc);



module.exports = profileCommentRouter;



// let feeds = renderPostProperty
// let comments = renderCommentProperty
// for (let i = 0; i < feeds.length; i++) {
//     console.log(feeds[i]);
//     for (let j = 0; comments.length; j++) {
//         console.log(comments[j]);
//     }
// }

// {{#each renderPostProperty}}
// <textarea>
// {{content}}
// </textarea>
// {{#each renderCommentProperty}}
// <textarea>
// {{comment_content}}
// </textarea>
// {{/each}}
// {{/each}}


// {{#each renderPostProperty}}
//     <textarea>{{content}}</textarea>
//     {{#each renderCommentProperty}}
//     <textarea>{{comment_content}}</textarea>
//     {{/each}}
// {{/each}}