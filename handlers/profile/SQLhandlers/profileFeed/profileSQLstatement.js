exports.getFeedSQL = 
`select id, user_id, content from post
WHERE user_id = $1
ORDER BY id ASC
`

// exports.getTextFeedSQL = 
// `SELECT CONTENT FROM CONTENT
// WHERE PERSONAL = TRUE AND
// FEED = TRUE AND
// TXT = TRUE AND
// USER_ID = $1
// `

// exports.getPhotoFeedSQL = 
// `SELECT CONTENT FROM CONTENT
// WHERE PERSONAL = TRUE AND
// FEED = TRUE AND
// PHOTOANDTEXT = TRUE AND
// USER_ID = $1
// `

exports.postFeedSQL = 
`INSERT INTO POST (CONTENT,USER_ID,PERSONAL,TXT,PHOTO)
VALUES($1,$2,TRUE,$3,$4)
`

exports.putFeedSQL = 
`UPDATE POST
SET CONTENT = $1,
TXT = $2,
PHOTO = $3
WHERE ID = $4
`

exports.deleteFeedSQL = 
`DELETE FROM POST
WHERE ID = $1
`
exports.deleteFeedCommentSQL = 
`DELETE FROM COMMENT
WHERE comment_box_id = $1
`
