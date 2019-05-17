exports.getCommentSQL = 
`
SELECT comment.id, comment.user_id,comment.comment_content,post.comment_box, users.username, users.profilepic 
from comment                                                                                  
inner join post                                                                              
on comment.comment_box_id = post.comment_box
inner join users
on comment.user_id = users.id
where comment.comment_box_id = $1
ORDER BY id DESC
`

exports.postCommentSQL = 
`INSERT INTO COMMENT (COMMENT_CONTENT,USER_ID,TXT,PHOTO,COMMENT_BOX_ID)
VALUES($1,$2,$3,$4,$5)
`

exports.putCommentSQL = 
`UPDATE COMMENT
SET COMMENT_CONTENT = $1,
TXT = $2,
PHOTO = $3
WHERE ID = $4
`

exports.getCommentForEditSQL = 
`
SELECT comment.id, comment.user_id,comment.comment_content,post.comment_box 
from comment                                                                                  
inner join post                                                                             
on comment.comment_box_id = post.comment_box
where comment.comment_box_id = $1 and
comment.user_id = $2
ORDER BY id ASC
`

exports.deleteCommentSQL = 
`DELETE FROM COMMENT
WHERE ID = $1
`

exports.getCommendFeedSQL = 
`
SELECT USER_ID FROM POST
WHERE COMMENT_BOX = $1
ORDER BY id ASC
`
