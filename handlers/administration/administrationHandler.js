const getCommunityFunc = (req,res,next)=>{
    // console.log(req.originalUrl)
    res.send('administration getCommunityFunc');
}

const createCommunityFunc = (req,res,next)=>{
    // console.log(req.originalUrl)
    res.send('administration createCommunityFunc');
}

const editNameOfCommunityFunc = (req,res,next)=>{
    // console.log(req.originalUrl)
    res.send('administration editNameOfCommunityFunc');
}

const deleteCommunityFunc = (req,res,next)=>{
    // console.log(req.originalUrl)
    res.send('administration deleteCommunityFunc');
}


module.exports.getCommunityFunc = getCommunityFunc
module.exports.createCommunityFunc = createCommunityFunc
module.exports.editNameOfCommunityFunc = editNameOfCommunityFunc
module.exports.deleteCommunityFunc = deleteCommunityFunc
