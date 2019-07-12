const SQLQuery = require('./SQLhandlers/profileComment/profileCommentSQLquery')
const PostSQLQuery = require('./SQLhandlers/profileFeed/profileSQLquery')

const getCommentFunc = async (req, res, next) => {
    let user_id = req.user.id
    let array = [user_id];
    let feed = await PostSQLQuery.getFeedData(array);

    let post_id = req.params.id 
    let commentArray = [post_id];
    let result = await SQLQuery.getComment(commentArray);

    res.send(result)
    

}

const postCommentFunc = async (req, res, next) => {

    let user_id = req.user.id
    let commentContent = req.query.data
    
    

    let post_id = req.params.id 

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

    
    
    
    let grabbingCommentId = req.params.id 


    let editRightCommentId = grabbingCommentId 

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
    
    
    
    

    if (req.user.id == req.query.user) {
        let commentId = [req.params.id] 
  

        SQLQuery.deleteComment(commentId)
        res.send('You deleted the comment');

    } else  {

        
        
        
        

        
        

        

        res.send('Your have no authority to delete the comment');
    }

}

module.exports.getCommentFunc = getCommentFunc;
module.exports.postCommentFunc = postCommentFunc;
module.exports.putCommentFunc = putCommentFunc;
module.exports.deleteCommentFunc = deleteCommentFunc;
