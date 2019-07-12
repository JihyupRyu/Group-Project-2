var pg = require('pg');
var SQLStatement = require('./homeSQLstatement')
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


function getFeedData() {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.getFeedSQL, function (err, results) {
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

function postData(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.postFeedSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function putData(array) {
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
module.exports.postData = postData;
module.exports.putData = putData;
module.exports.deleteFeedData = deleteFeedData;
module.exports.deleteFeedCommentData = deleteFeedCommentData;