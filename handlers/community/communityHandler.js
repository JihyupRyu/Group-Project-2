const SQLQuery = require('./SQLhandlers/communityFeed/communitySQLquery')

const getFeedFunc = async (req, res, next) => {
    let community_id = await req.params.id
    let array = [community_id];
    let result = await SQLQuery.getFeedData(array);

    console.log(result);
    res.send(result);
}

const postFeedFunc = async (req, res, next) => {
    let user_id = req.user.id
    let feedContent = req.body.data
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
        array.push(req.params.id)
        array.push('FALSE')
        array.push('TRUE')
    } else {
        array.push(feedContent)
        array.push(user_id)
        array.push(req.params.id)
        array.push('TRUE')
        array.push('FALSE')
    }
    console.log(array)
    SQLQuery.postFeedData(array)

    let community_id = [req.params.id]
    let result = await SQLQuery.getFeedData(community_id);
    console.log(result);

    res.send(array)
}

const putFeedFunc = async (req, res, next) => {

    let community_id = await req.params.id
    let array = [community_id];
    let result = await SQLQuery.getFeedData(array);

    let contentId = result[req.query.id].id
    let content_user_id = result[req.query.id]['user_id']
    let contentIdArray = [contentId]
    console.log(contentId)
    console.log(content_user_id)
    console.log(contentIdArray)

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

        SQLQuery.putFeedData(array)
        res.send(array)

    } else {
        res.send('You have no authority to edit this post because you are not the post owner');
    }}




const deleteFeedFunc = async (req, res, next) => {
    let community_id = await req.params.id
    let array = [community_id];
    let result = await SQLQuery.getFeedData(array);

    let contentId = result[req.query.id].id
    let content_user_id = result[req.query.id]['user_id']
    let contentIdArray = [contentId]

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