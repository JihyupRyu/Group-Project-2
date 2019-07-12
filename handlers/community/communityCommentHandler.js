const SQLQuery = require('./SQLhandlers/communityComment/communityCommentSQLquery')
const PostSQLQuery = require('./SQLhandlers/communityFeed/communitySQLquery')


const getCommentFunc = async (req, res, next) => {

    let post_id = req.params.id 
    let commentArray = [post_id];
    let result = await SQLQuery.getComment(commentArray);


    res.send(result)

}

const postCommentFunc = async (req, res, next) => {
    let user_id = req.user.id
    let commentContent = req.query.data

    let post_id = req.query.id 

    let array = [];

        array.push(commentContent)
        array.push(user_id)
        array.push('TRUE')
        array.push('FALSE')
        array.push(post_id)
    
    SQLQuery.postComment(array)

    let getArray = [post_id]
    let result = await SQLQuery.getComment(getArray);

    res.send(array[0]);

}

const putCommentFunc = async (req, res, next) => {
    let editRightCommentId = req.params.id 

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
    
    
}

const deleteCommentFunc = async (req, res, next) => {

    let user_id = req.query.user
    let comment_id = await req.params.id  

    if (req.user.id == user_id) {    
        let array = [comment_id]
        SQLQuery.deleteComment(array)
        res.send('You deleted comment');

    } else {
            res.send('You have no authority to delete');
        
    }
}

module.exports.getCommentFunc = getCommentFunc;
module.exports.postCommentFunc = postCommentFunc;
module.exports.putCommentFunc = putCommentFunc;
module.exports.deleteCommentFunc = deleteCommentFunc;
