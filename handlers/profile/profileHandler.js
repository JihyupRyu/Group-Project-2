const SQLQuery = require('./SQLhandlers/profileFeed/profileSQLquery')


const getFeedFunc = async (req, res, next) => {
    let user_id = req.user.id //user authentication
    console.log('here' + user_id)
    let array = [user_id];
    let result = await SQLQuery.getFeedData(array);

    // console.log(result);
    let identityUser = await SQLQuery.identifyUser(array)


    let renderObject = {
        renderPostProperty: result,
        username: [{ username: result[0]['username'] }],
        profilepic: [{ profilepic: result[0]['profilepic'] }],
        identityUser: [{ identityUserPic: identityUser[0]['profilepic'] }],
        identityUsername: [{ identityUsername: identityUser[0]['username'] }],
    };
    // console.log(renderObject)
    // res.render('post', renderObject)
    console.log(result[0]['profilepic'])

    // res.send(result)
    res.render('ji_post', renderObject)
    // res.send(result); //user's feed in a format of array object
}

const getProfileFeedFunc = async (req, res, next) => {
    let profile_id = req.params.id //user authentication
    let array = [profile_id];
    let result = await SQLQuery.getFeedData(array);

    let userIdArray = [req.user.id]
    let identityUser = await SQLQuery.identifyUser(userIdArray)

    console.log(result);

    console.log(identityUser)

    let renderObject = {
        renderPostProperty: result,
        username: [{ username: result[0]['username'] }],
        profilepic: [{ profilepic: result[0]['profilepic'] }],
        identityUser: [{ identityUserPic: identityUser[0]['profilepic'] }],
        identityUsername: [{ identityUsername: identityUser[0]['username'] }],
        layout: 'viewProfile'
    };

    res.render('ji_post', renderObject)
    // res.send(result)
}

const postFeedFunc = async (req, res, next) => {

    let user_id = await req.user.id
    let feedContent = req.query.data
    console.log(feedContent)

    let array = [];

    // if (user_id === req.params.id) {
        array.push(feedContent)
        array.push(user_id)
        array.push('TRUE')
        array.push('FALSE')

        console.log(array)
        SQLQuery.postData(array)

        let getArray = [user_id]
        let result = await SQLQuery.getFeedData(getArray);
        console.log(result);

        let sentArray = [{ 'content': feedContent }]

        res.send(sentArray);
    // } else {
    //     res.send('You do not have the authority to post!')
    // }

}

const putFeedFunc = async (req, res, next) => {

    let userIdArray = [req.user.id]
    console.log(userIdArray)
    let user_id = req.user.id
    let result = await SQLQuery.getFeedData(userIdArray);
    console.log(result);
    let contentId = req.params.id /* req.params.id should follow the order of the handlebar each looping method's feed box
    to select the position of element of the grabing array*/
    // 0 is the starting position cuz its an array//

    var feedContent = req.query.data
    // var chars = feedContent.split('');
    // var last = chars[chars.length - 1]
    // var last1 = chars[chars.length - 2]
    // var last2 = chars[chars.length - 3]
    // var last3 = chars[chars.length - 4]

    // var word = last3 + last2 + last1 + last

    if (user_id == req.query.userId) {
        console.log(req.user.id)
        let array = [];

        array.push(feedContent)
        array.push('TRUE')
        array.push('FALSE')
        array.push(contentId)


        SQLQuery.putData(array)

        let newResult = await SQLQuery.getFeedData(userIdArray);
        console.log(newResult)

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
        console.log(contentId)

        SQLQuery.deleteFeedCommentData(array) //the order is important! comment must be first cuz comment is the foregin key of the post table//
        SQLQuery.deleteData(array);


        let newResult = await SQLQuery.getFeedData(userIdArray);
        console.log(newResult)
        // res.redirect('/profile')
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