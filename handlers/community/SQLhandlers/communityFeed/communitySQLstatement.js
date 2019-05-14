exports.getFeedSQL = 
`select id, user_id, content,CATEGORY_ID from post
WHERE category_id = $1
ORDER BY id ASC
`

exports.getFeedForEditSQL = 
`select id, user_id, content,CATEGORY_ID from post
WHERE category_id = $1 AND
USER_ID = $2
ORDER BY id ASC
`

exports.postFeedSQL = 
`INSERT INTO POST (CONTENT,USER_ID,CATEGORY_ID,PERSONAL,TXT,PHOTO)
VALUES($1,$2,$3,FALSE,$4,$5)
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