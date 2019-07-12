exports.getFeedSQL = 
`select post.id, post.user_id, post.content,users.username,users.profilepic
from post
inner join users
on post.user_id = users.id
WHERE user_id = $1 and
category_id is null
ORDER BY id DESC
`

exports.identifyUserSQL = 
`
SELECT profilepic, username FROM USERS
WHERE id = $1
`

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
















