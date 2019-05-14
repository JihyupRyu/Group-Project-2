exports.getFeedSQL = 
`select id, user_id, content,category_id from post
WHERE user_id = $1 OR
category_id IS NOT NULL
ORDER BY id ASC
`

exports.postFeedSQL = 
`INSERT INTO POST (CONTENT,USER_ID,CATEGORY_ID,PERSONAL,TXT,PHOTO)
VALUES($1,$2,$3,$4,$5,$6)
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