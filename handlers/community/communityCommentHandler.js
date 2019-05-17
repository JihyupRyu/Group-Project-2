const SQLQuery = require('./SQLhandlers/communityComment/communityCommentSQLquery')
const PostSQLQuery = require('./SQLhandlers/communityFeed/communitySQLquery')


const getCommentFunc = async (req, res, next) => {
    // let community_id = await req.params.id  //community no.//
    // let array = [community_id];
    // let feed = await PostSQLQuery.getFeedData(array)

    let post_id = req.params.id // comment_box_id, req.parms.id = location
    console.log(post_id);
    let commentArray = [post_id];
    let result = await SQLQuery.getComment(commentArray);

    console.log(result);

    res.send(result)

}

const postCommentFunc = async (req, res, next) => {
    let user_id = req.user.id
    let commentContent = req.query.data

    // let community_id = await req.params.id  //community no.//
    // let communityArray = [community_id];
    // let feed = await PostSQLQuery.getFeedData(communityArray)

    let post_id = req.query.id // comment_box_id
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



    // let community_id = await req.params.id  //community no.//
    // let communityArray = [community_id];
    // let feed = await PostSQLQuery.getFeedData(communityArray)
    // let post_id = feed[req.query.id].id // comment_box_id, req.query.id = location of the post
    // let userEditArray = [post_id, user_id]  //for comment box for user_id//

    // let userComment = await SQLQuery.getCommentForEdit(userEditArray); //flitering for the comment exclusively the user posted
    // console.log(userComment);
    // let grabbingCommentId = req.query.commentId //req.query.commentId should be the place equals to the user posted exclusively conmment


    let editRightCommentId = req.params.id // grabbing the commentid
    console.log(editRightCommentId)


    if(req.user.id == req.query.user){

    let array = [];

        array.push(req.query.data)
        array.push('TRUE')
        array.push('FALSE')
        array.push(editRightCommentId)
    

    SQLQuery.putComment(array)

    res.send(array[0]);
} else{
    res.send('you have no authority to delete')

}
    //do remember, params.id = category_id || query.id = the post location(post's unique id = comment box id ) 
    //|| query.commentId = comment's unique id(use mousemove to deal with), data = input)
}

const deleteCommentFunc = async (req, res, next) => {

    let user_id = req.query.user
    let comment_id = await req.params.id  //community no.//
    // let communityArray = [community_id];
    // // let feed = await PostSQLQuery.getFeedData(communityArray)
    // let post_id = req.query.id //comment_box
    // let post_idArray = [post_id]

    // let grabPostOwnerID = await SQLQuery.getCommentFeed(post_idArray) //get the posr_ownerId //
    // let postOwnerID = grabPostOwnerID[0]['user_id']
    // console.log(postOwnerID)
    // console.log(req.user.id)

    if (req.user.id == user_id) {
        // let commentsBox = await SQLQuery.getComment(post_idArray) //grabing for the comment inside the post
        // console.log(commentsBox)
        // let CommentId = commentsBox[req.query.commentId].id //query.id = what the location you are clicking
        let array = [comment_id]
        SQLQuery.deleteComment(array)
        res.send('You deleted comment');

    } else {

        // let user_id = req.user.id
        // let userEditArray = [post_id, user_id]  //for comment box for user_id//
        // let result = await SQLQuery.getCommentForEdit(userEditArray); //flitering for the comment exclusively the user posted
        // console.log(result);

        //     let contentId = result[req.query.commentId].id
        //     let array = []
        //     array.push(contentId)

        //     SQLQuery.deleteComment(array);

            res.send('You have no authority to delete');
        
    }
}

module.exports.getCommentFunc = getCommentFunc;
module.exports.postCommentFunc = postCommentFunc;
module.exports.putCommentFunc = putCommentFunc;
module.exports.deleteCommentFunc = deleteCommentFunc;
