const SQLQuery = require('./SQLhandlers/profileComment/profileCommentSQLquery')
const PostSQLQuery = require('./SQLhandlers/profileFeed/profileSQLquery')

const getCommentFunc = async (req, res, next) => {
    let user_id = req.user.id
    let array = [user_id];
    let feed = await PostSQLQuery.getFeedData(array);

    let post_id = req.params.id // comment_box_id
    console.log(post_id);
    let commentArray = [post_id];
    let result = await SQLQuery.getComment(commentArray);

    console.log(result);


    // let renderObject = {
    //     renderPostCommentProperty: result
    // }; //want to render the result' comment_content in main.js

    // res.render('post', renderObject
    // );

    // let data = renderObject.renderPostCommentProperty
    // res.json(result);
    console.log('go')

    res.send(result)
    // { id: 7, user_id: 1, content: 'cat', comment_content: }

}

const postCommentFunc = async (req, res, next) => {

    let user_id = req.user.id
    let commentContent = req.query.data
    // let postArray = [user_id];
    // let feed = await PostSQLQuery.getFeedData(postArray);

    let post_id = req.params.id // comment_box_id
    console.log(commentContent)

    let array = [];

        array.push(commentContent)
        array.push(user_id)
        array.push('TRUE')
        array.push('FALSE')
        array.push(post_id)

    console.log(array)
    SQLQuery.postComment(array)

    let getArray = [post_id]
    let result = await SQLQuery.getComment(getArray);
    console.log(result);

    res.send(array[0]);
}

const putCommentFunc = async (req, res, next) => {

    // let userEditArray = [req.params.id, user_id]  //for comment box for user_id//
    // // let result = await SQLQuery.getCommentForEdit(userEditArray); //flitering for the comment exclusively the user posted
    // // console.log(result);
    let grabbingCommentId = req.params.id //req.query.id should be the place equals to the user posted exclusively conmment


    let editRightCommentId = grabbingCommentId // grabbing the commentid
    console.log(editRightCommentId)

    if(req.user.id == req.query.user ){

    let array = [];

        array.push(req.query.data)
        array.push('TRUE')
        array.push('FALSE')
        array.push(editRightCommentId)


    SQLQuery.putComment(array)

    res.send(array[0]);
    } else {
        res.send('you have no authority to edit!')
    }
}

const deleteCommentFunc = async (req, res, next) => {
    // let grabPostOwnerID = await SQLQuery.getCommentFeed([req.params.id])
    // let postOwnerID = grabPostOwnerID[0]['user_id']
    // console.log(postOwnerID)
    // console.log(req.user.id)

    if (req.user.id == req.query.user) {
        let commentId = [req.params.id] //grabing for the comment inside the post
  

        SQLQuery.deleteComment(commentId)
        res.send('You deleted the comment');

    } else  {

        // let user_id = req.user.id
        // let userEditArray = [req.params.id, user_id]  //for comment box for user_id//
        // let result = await SQLQuery.getCommentForEdit(userEditArray); //flitering for the comment exclusively the user posted
        // console.log(result);

        // let contentId = req.params.id
        // let array = [contentId]

        // SQLQuery.deleteComment(array);

        res.send('Your have no authority to delete the comment');
    }

}

module.exports.getCommentFunc = getCommentFunc;
module.exports.postCommentFunc = postCommentFunc;
module.exports.putCommentFunc = putCommentFunc;
module.exports.deleteCommentFunc = deleteCommentFunc;
