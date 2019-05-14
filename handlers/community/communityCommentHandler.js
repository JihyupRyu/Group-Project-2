const SQLQuery = require('./SQLhandlers/communityComment/communityCommentSQLquery')
const PostSQLQuery = require('./SQLhandlers/communityFeed/communitySQLquery')


const getCommentFunc = async (req, res, next) => {
    let community_id = await req.params.id  //community no.//
    let array = [community_id];
    let feed = await PostSQLQuery.getFeedData(array)

    let post_id = feed[req.query.id].id // comment_box_id, req.parms.id = location
    console.log(post_id);
    let commentArray = [post_id];
    let result = await SQLQuery.getComment(commentArray);

    console.log(result);

    res.send(result)

}

const postCommentFunc = async (req, res, next) => {
    let user_id = req.user.id
    let commentContent = req.query.data

    let community_id = await req.params.id  //community no.//
    let communityArray = [community_id];
    let feed = await PostSQLQuery.getFeedData(communityArray)

    let post_id = feed[req.query.id].id // comment_box_id
    console.log(commentContent)

    var chars = commentContent.split('');
    var last = chars[chars.length - 1]
    var last1 = chars[chars.length - 2]
    var last2 = chars[chars.length - 3]
    var last3 = chars[chars.length - 4]

    var word = last3 + last2 + last1 + last
    console.log(word)
    let array = [];
    if (word === '.jpg') {
        array.push(commentContent)
        array.push(user_id)
        array.push('FALSE')
        array.push('TRUE')
        array.push(post_id)
    } else {
        array.push(commentContent)
        array.push(user_id)
        array.push('TRUE')
        array.push('FALSE')
        array.push(post_id)
    }
    console.log(array)
    SQLQuery.postComment(array)

    let getArray = [post_id]
    let result = await SQLQuery.getComment(getArray);
    console.log(result);

    res.send(array[0]);

}

const putCommentFunc = async (req, res, next) => {

    let user_id = req.user.id

    let community_id = await req.params.id  //community no.//
    let communityArray = [community_id];
    let feed = await PostSQLQuery.getFeedData(communityArray)
    let post_id = feed[req.query.id].id // comment_box_id, req.query.id = location of the post
    let userEditArray = [post_id, user_id]  //for comment box for user_id//

    let userComment = await SQLQuery.getCommentForEdit(userEditArray); //flitering for the comment exclusively the user posted
    console.log(userComment);
    let grabbingCommentId = req.query.commentId //req.query.commentId should be the place equals to the user posted exclusively conmment


    let editRightCommentId = userComment[grabbingCommentId].id // grabbing the commentid
    console.log(editRightCommentId)
    var commentContent = req.query.data
    var chars = commentContent.split('');
    var last = chars[chars.length - 1]
    var last1 = chars[chars.length - 2]
    var last2 = chars[chars.length - 3]
    var last3 = chars[chars.length - 4]

    var word = last3 + last2 + last1 + last

    let array = [];
    if (word === '.jpg') {
        array.push(req.query.data)
        array.push('FALSE')
        array.push('TRUE')
        array.push(editRightCommentId)
    } else {
        array.push(req.query.data)
        array.push('TRUE')
        array.push('FALSE')
        array.push(editRightCommentId)
    }

    SQLQuery.putComment(array)

    res.send(array[0]);
    //do remember, params.id = category_id || query.id = the post location(post's unique id = comment box id ) 
    //|| query.commentId = comment's unique id(use mousemove to deal with), data = input)
}

const deleteCommentFunc = async (req, res, next) => {

    let community_id = await req.params.id  //community no.//
    let communityArray = [community_id];
    let feed = await PostSQLQuery.getFeedData(communityArray)
    let post_id = feed[req.query.id].id //comment_box
    let post_idArray = [post_id]

    let grabPostOwnerID = await SQLQuery.getCommentFeed(post_idArray) //get the posr_ownerId //
    let postOwnerID = grabPostOwnerID[0]['user_id']
    console.log(postOwnerID)
    console.log(req.user.id)

    if (req.user.id == postOwnerID) {
        let commentsBox = await SQLQuery.getComment(post_idArray) //grabing for the comment inside the post
        console.log(commentsBox)
        let CommentId = commentsBox[req.query.commentId].id //query.id = what the location you are clicking
        let array = [CommentId]
        console.log(CommentId)
        SQLQuery.deleteComment(array)
        res.send('You deleted comment');

    } else {

        let user_id = req.user.id
        let userEditArray = [post_id, user_id]  //for comment box for user_id//
        let result = await SQLQuery.getCommentForEdit(userEditArray); //flitering for the comment exclusively the user posted
        console.log(result);

            let contentId = result[req.query.commentId].id
            let array = []
            array.push(contentId)

            SQLQuery.deleteComment(array);

            res.send('Your comment deleted');
        
    }
}

module.exports.getCommentFunc = getCommentFunc;
module.exports.postCommentFunc = postCommentFunc;
module.exports.putCommentFunc = putCommentFunc;
module.exports.deleteCommentFunc = deleteCommentFunc;
