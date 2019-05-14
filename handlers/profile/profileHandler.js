const SQLQuery = require('./SQLhandlers/profileFeed/profileSQLquery')


const getFeedFunc = async (req, res, next) => {
    let user_id = req.user.id //user authentication
    let array = [user_id];
    let result = await SQLQuery.getFeedData(array);

    console.log(result);


    let renderObject = { renderPostProperty: result};

    // res.render('post', renderObject)
    res.render('ji_post', renderObject)
    // res.send(result); //user's feed in a format of array object
}

const postFeedFunc = async (req, res, next) => {

    let user_id = req.user.id
    let feedContent = req.query.data
    console.log(feedContent)
    var chars = feedContent.split('');
    var last = chars[chars.length - 1]
    var last1 = chars[chars.length - 2]
    var last2 = chars[chars.length - 3]
    var last3 = chars[chars.length - 4]

    var word = last3 + last2 + last1 + last
    console.log(word)
    let array = [];
    if (word === '.jpg') {
        array.push(feedContent)
        array.push(user_id)
        array.push('FALSE')
        array.push('TRUE')
    } else {
        array.push(feedContent)
        array.push(user_id)
        array.push('TRUE')
        array.push('FALSE')
    }
    console.log(array)
    SQLQuery.postData(array)

    let getArray = [user_id]
    let result = await SQLQuery.getFeedData(getArray);
    console.log(result);

    res.redirect('/profile')
}

const putFeedFunc = async (req, res, next) => {

    let userIdArray = [req.user.id]
    let result = await SQLQuery.getFeedData(userIdArray);
    console.log(result);
    let contentId = result[req.params.id].id /* req.params.id should follow the order of the handlebar each looping method's feed box
    to select the position of element of the grabing array*/
    // 0 is the starting position cuz its an array//

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
    console.log(newResult)

    res.send(array);
}

const deleteFeedFunc = async (req, res, next) => {
    let userIdArray = [req.user.id]
    let result = await SQLQuery.getFeedData(userIdArray);
    let contentId = result[req.params.id].id
    let array = []
    array.push(contentId)
    console.log(contentId)

    SQLQuery.deleteFeedCommentData(array) //the order is important! comment must be first cuz comment is the foregin key of the post table//
    SQLQuery.deleteData(array);


    let newResult = await SQLQuery.getFeedData(userIdArray);
    console.log(newResult)
    // res.redirect('/profile')
    res.send('deleted');
}


module.exports.getFeedFunc = getFeedFunc
module.exports.postFeedFunc = postFeedFunc
module.exports.putFeedFunc = putFeedFunc
module.exports.deleteFeedFunc = deleteFeedFunc