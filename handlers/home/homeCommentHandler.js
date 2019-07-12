const getCommentFunc = (req,res,next)=>{
    
    res.send('home getCommentFunc');
}

const postCommentFunc = (req,res,next)=>{
    
    res.send('home postCommentFunc');
}

const putCommentFunc = (req,res,next)=>{
    
    res.send('home putCommentFunc');
}

const deleteCommentFunc = (req,res,next)=>{
    
    res.send('home deleteCommentFunc');
}

module.exports.getCommentFunc = getCommentFunc;
module.exports.postCommentFunc = postCommentFunc;
module.exports.putCommentFunc = putCommentFunc;
module.exports.deleteCommentFunc = deleteCommentFunc;
