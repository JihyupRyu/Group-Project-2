const getCommentFunc = (req,res,next)=>{
    // console.log(req.originalUrl)
    res.send('home getCommentFunc');
}

const postCommentFunc = (req,res,next)=>{
    // console.log(req.originalUrl)
    res.send('home postCommentFunc');
}

const putCommentFunc = (req,res,next)=>{
    // console.log(req.originalUrl)
    res.send('home putCommentFunc');
}

const deleteCommentFunc = (req,res,next)=>{
    // console.log(req.originalUrl)
    res.send('home deleteCommentFunc');
}

module.exports.getCommentFunc = getCommentFunc;
module.exports.postCommentFunc = postCommentFunc;
module.exports.putCommentFunc = putCommentFunc;
module.exports.deleteCommentFunc = deleteCommentFunc;
