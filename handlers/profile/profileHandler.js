const SQLQuery = require('./SQLhandlers/profileFeed/profileSQLquery')


const getFeedFunc = async (req, res, next) => {
    let user_id = req.user.id 
    let array = [user_id];
    let result = await SQLQuery.getFeedData(array);

    
    let identityUser = await SQLQuery.identifyUser(array)


    let renderObject = {
        renderPostProperty: result,
        username: [{ username: result[0]['username'] }],
        profilepic: [{ profilepic: result[0]['profilepic'] }],
        identityUser: [{ identityUserPic: identityUser[0]['profilepic'] }],
        identityUsername: [{ identityUsername: identityUser[0]['username'] }],
    };
    
    

    
    res.render('ji_post', renderObject)
    
}

const getProfileFeedFunc = async (req, res, next) => {
    let profile_id = req.params.id 
    let array = [profile_id];
    let result = await SQLQuery.getFeedData(array);

    let userIdArray = [req.user.id]
    let identityUser = await SQLQuery.identifyUser(userIdArray)

    let renderObject = {
        renderPostProperty: result,
        username: [{ username: result[0]['username'] }],
        profilepic: [{ profilepic: result[0]['profilepic'] }],
        identityUser: [{ identityUserPic: identityUser[0]['profilepic'] }],
        identityUsername: [{ identityUsername: identityUser[0]['username'] }],
        layout: 'viewProfile'
    };

    res.render('ji_post', renderObject)
    
}

const postFeedFunc = async (req, res, next) => {

    let user_id = await req.user.id
    let feedContent = req.query.data

    let array = [];

    
        array.push(feedContent)
        array.push(user_id)
        array.push('TRUE')
        array.push('FALSE')

        SQLQuery.postData(array)

        let getArray = [user_id]
        let result = await SQLQuery.getFeedData(getArray);

        let sentArray = [{ 'content': feedContent }]

        res.send(sentArray);
    
    
    

}

const putFeedFunc = async (req, res, next) => {

    let userIdArray = [req.user.id]
    let user_id = req.user.id
    let result = await SQLQuery.getFeedData(userIdArray);
    let contentId = req.params.id
    

    var feedContent = req.query.data
    
    
    
    
    

    

    if (user_id == req.query.userId) {
        let array = [];

        array.push(feedContent)
        array.push('TRUE')
        array.push('FALSE')
        array.push(contentId)


        SQLQuery.putData(array)

        let newResult = await SQLQuery.getFeedData(userIdArray);

        res.send(array);
    } else {
        res.send('gg')
    }
}

const deleteFeedFunc = async (req, res, next) => {
    let userIdArray = [req.user.id]
    let result = await SQLQuery.getFeedData(userIdArray);
    let contentId = req.params.id
    let user_id = req.user.id

    if (user_id == req.query.userId) {
        let array = []
        array.push(contentId)

        SQLQuery.deleteFeedCommentData(array) 
        SQLQuery.deleteData(array);


        let newResult = await SQLQuery.getFeedData(userIdArray);
        
        res.send('deleted');
    } else {
        res.send('you cannot delete')
    }

}


module.exports.getFeedFunc = getFeedFunc
module.exports.getProfileFeedFunc = getProfileFeedFunc
module.exports.postFeedFunc = postFeedFunc
module.exports.putFeedFunc = putFeedFunc
module.exports.deleteFeedFunc = deleteFeedFunc