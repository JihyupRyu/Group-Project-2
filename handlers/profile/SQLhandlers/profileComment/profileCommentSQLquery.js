var pg = require('pg');
var SQLStatement = require('./profileCommentSQLStatement')
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

function getComment(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.getCommentSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function getCommentForEdit(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.getCommentForEditSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function getCommentFeed(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.getCommendFeedSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function postComment(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.postCommentSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function putComment(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.putCommentSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

function deleteComment(array) {
    return new Promise(function (resolve, reject) {
        client.query(SQLStatement.deleteCommentSQL,array, function (err, results) {
            if (err) {
            }

            resolve(results.rows);
        })
    })
}

module.exports.getComment = getComment;


module.exports.getCommentForEdit = getCommentForEdit
module.exports.getCommentFeed = getCommentFeed
module.exports.postComment = postComment;
module.exports.putComment = putComment;
module.exports.deleteComment = deleteComment;