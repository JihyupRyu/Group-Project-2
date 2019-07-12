const getCommunityFunc = (req,res,next)=>{
    
    res.send('administration getCommunityFunc');
}

const createCommunityFunc = (req,res,next)=>{
    
    res.send('administration createCommunityFunc');
}

const editNameOfCommunityFunc = (req,res,next)=>{
    
    res.send('administration editNameOfCommunityFunc');
}

const deleteCommunityFunc = (req,res,next)=>{
    
    res.send('administration deleteCommunityFunc');
}


module.exports.getCommunityFunc = getCommunityFunc
module.exports.createCommunityFunc = createCommunityFunc
module.exports.editNameOfCommunityFunc = editNameOfCommunityFunc
module.exports.deleteCommunityFunc = deleteCommunityFunc
