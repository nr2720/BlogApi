const prisma = require('../db/prisma')


const postCreateComm = async(req, res) => {
    try {
     const userId = req.user.id;
     const comments = req.body.comments;
     const postId = req.body.post_id;
     
    //  create
     await prisma.createComments(comments, postId, userId);

    res.json({
        success: true
    })
    return;
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error
        })
    }
}

const getComm = async(req, res) => {
    try {
        const post_id = parseInt(req.query.post_id);
        console.log(req.query.post_id);
        const comments = await prisma.getAllCommentsFromPost(post_id);
        res.json({
            success: true,
            data: comments
        });
        return;
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}


module.exports = {
    postCreateComm,
    getComm
}