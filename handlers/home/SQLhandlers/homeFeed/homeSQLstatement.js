// exports.getFeedSQL = 
// `select id, user_id, content,category_id from post
// WHERE user_id = $1 OR
// category_id IS NOT NULL
// ORDER BY id ASC
// `

exports.getFeedSQL = 
`select post.id, post.user_id, post.content,users.username, users.profilepic,post.category_id,category.category_name
from post
inner join users
on post.user_id = users.id
full outer join category
on post.category_id = category.id
ORDER BY id DESC
`
exports.identifyUserSQL = 
`
SELECT profilepic, username FROM USERS
WHERE id = $1
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
