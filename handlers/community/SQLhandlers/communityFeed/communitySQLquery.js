var pg = require('pg');
var SQLStatement = require('./communitySQLStatement')
var config = {
    user: 'Ann',
    database: 'social_media',
    password: 'postgres', 
    host: 'localhost',
    port: 5432,
    max: 10, 
    idleTimeoutMillis: 30000, 
}

var client = new pg.Client(config);

client.connect();

function getFeedData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.getFeedSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function identifyUser(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.identifyUserSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function getFeedForEditData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.getFeedSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function postFeedData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.postFeedSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function putFeedData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.putFeedSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function deleteFeedData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.deleteFeedSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function deleteFeedCommentData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.deleteFeedCommentSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}


module.exports.getFeedData = getFeedData;
module.exports.identifyUser = identifyUser
module.exports.getFeedForEditData = getFeedForEditData;
module.exports.postFeedData = postFeedData;
module.exports.putFeedData = putFeedData;
module.exports.deleteFeedData = deleteFeedData;
module.exports.deleteFeedCommentData = deleteFeedCommentData;
