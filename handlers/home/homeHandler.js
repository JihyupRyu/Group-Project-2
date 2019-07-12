const SQLQuery = require('./SQLhandlers/homeFeed/homeSQLquery')

const getFeedFunc = async(req,res,next)=>{
    let user_id = req.user.id 
    let array = [user_id];
    let result = await SQLQuery.getFeedData(array);
    
    
    let userProfilePic = await SQLQuery.identifyUser(array)

    let renderPostObject = { renderPostProperty: result,
         username: [{ username: result[0]['username'] }],
         identityUser: [{ identityUserPic: userProfilePic[0]['profilepic'] }],
         identityUsername: [{ identityUsername: userProfilePic[0]['username'] }],
    layout:'homeMain'};

    res.render('ji_home', renderPostObject);
}

const postFeedFunc = async(req,res,next)=>{
    
    let user_id = req.user.id
    let feedContent = req.body.data
    var chars = feedContent.split('');
    var last = chars[chars.length - 1]
    var last1 = chars[chars.length - 2]
    var last2 = chars[chars.length - 3]
    var last3 = chars[chars.length - 4]

    var word = last3 + last2 + last1 + last
    let array = [];
    if (word === '.jpg') {
        array.push(feedContent)
        array.push(user_id)
        array.push(req.query.category)
        array.push(req.query.personal)
        array.push('FALSE')
        array.push('TRUE')
    } else {
        array.push(feedContent)
        array.push(user_id)
        array.push(req.query.category)
        array.push(req.query.personal)
        array.push('TRUE')
        array.push('FALSE')
    }
    SQLQuery.postData(array)

    let getArray = [user_id]
    let result = await SQLQuery.getFeedData(getArray);

    res.send(array);
}

const putFeedFunc = async(req,res,next)=>{

    let userIdArray = [req.user.id]
    let result = await SQLQuery.getFeedData(userIdArray);
    let contentId = result[req.params.id].id
    
    let content_user_id = result[req.params.id]['user_id']

    if (content_user_id == req.user.id) {

    var feedContent = req.query.data
    var chars = feedContent.split('');
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
        array.push(contentId)
    } else {
        array.push(req.query.data)
        array.push('TRUE')
        array.push('FALSE')
        array.push(contentId)
    }

    SQLQuery.putData(array)

    let newResult = await SQLQuery.getFeedData(userIdArray);

    res.send(array);

}else{
    res.send('You have no authority to edit this post because you are not the post owner');
}}

const deleteFeedFunc = async(req,res,next)=>{

    let userIdArray = [req.user.id]
    let result = await SQLQuery.getFeedData(userIdArray);
    let contentId = result[req.params.id].id
    let content_user_id = result[req.params.id]['user_id']

    let contentIdArray = []
    contentIdArray.push(contentId)

    if (content_user_id == req.user.id) {
        SQLQuery.deleteFeedCommentData(contentIdArray)
        SQLQuery.deleteFeedData(contentIdArray)
        res.send('deleted')
    } else {
        res.send('You have no authority to delete this post because you are not the post owner');
    }
}


module.exports.getFeedFunc = getFeedFunc
module.exports.postFeedFunc = postFeedFunc
module.exports.putFeedFunc = putFeedFunc
module.exports.deleteFeedFunc = deleteFeedFunc
