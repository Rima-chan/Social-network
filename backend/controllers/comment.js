require('dotenv').config();
const Comment = require('../models/comment');
const Publication = require('../models/publication');
const User = require('../models/user');
const fs = require('fs');

exports.createNewComment = async (req, res) => {
    if (!req.body.content && !req.file) {
        return res.status(400).json({error: 'Missing parameters'});
    }
    const userId = parseInt(req.user[0].id, 10);
    const publicationId = parseInt(req.params.publicationId, 10);
    try {
         // Check if user and publication exist
        const user = await User.findById(userId);
        const publication = await Publication.findById(publicationId);
        if (user && user.length === 0) {
            return res.status(404).json({error: 'User not found'});
        }
        if (publication && publication.length === 0) {
            return res.status(404).json({error: 'Pulication not found'});
        }
        const content = req.body.content;
        const attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;

        const newComment = new Comment({
            userId: userId,
            publicationId: publicationId,
            content: content,
            attachment: attachment,
        });

        Comment.create([newComment.userId, newComment.publicationId, newComment.content, newComment.attachment])
            .then(() => {
                const nbComments = publication[0].comments + 1;
                Publication.updateComment([nbComments, publicationId])
                    .then(() => res.status(200).json({message: 'Comment successfully created'}))
                    .catch(err => res.status(500).json({error: 'Cannot add nb of comments in publication' + err}))
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'Cannot create new comment'});
            });
    } catch(err) {
        console.log(err);
    }
}

exports.updateComment =  async (req, res) => {
    if (!req.body.content && !req.file) {
        return res.status(400).json({error: 'Missing parameters'});
    }
    const publicationId = parseInt(req.params.publicationId, 10);
    const commentId = parseInt(req.params.commentId, 10);
    const userId = parseInt(req.user[0].id);
    try {
        const publication = await Publication.findById(publicationId);
        const comment = await Comment.findById(commentId);
        if (comment.length === 0) {
            return res.status(404).json({error: 'Comment doesn\'t exist'});
        }
        if(userId !== comment[0].user_id) {
            return res.status(403).json({error: 'Unauthorized request'});
        }
    
        const content = req.body.content ? req.body.content : comment[0].content;
        let attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
        const deleteOldImage = req.body.deleteImage ? parseInt(req.body.deleteImage, 10) : null;
    
        if (attachment) {
            if (comment[0].image_url) {
                const filename = comment[0].image_url?.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                })
            }
        } else {
            if (comment[0].image_url && deleteOldImage === 1) {
                const filename = comment[0].image_url?.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                })
            } else {
                attachment = comment[0].image_url;
            }
        }
        Comment.update([content, attachment, commentId])
            .then(() => res.status(200).json({message: 'Comment successfully updated'}))
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'Cannot update comment'});
            })
    } catch(err) {
        console.log(err);
    }
}

exports.deleteComment = async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);
    const publicationId = parseInt(req.params.publicationId, 10);
    const userId = req.user[0].id;
    const isAdmin = req.user[0].isAdmin;
    try {
        const publication = await Publication.findById(publicationId);
        const comment = await Comment.findById(commentId);
        if (comment.length === 0 || publication.length === 0) {
            return res.status(404).json({error: 'Comment not found comment or publication'})
        } else if (userId === comment[0]?.user_id || isAdmin === 1) {
            Comment.delete(commentId)
                .then(() => {
                    const nbComments = publication[0].comments - 1;
                    if (comment[0].image_url) {
                        const filename = comment[0].image_url?.split('/images/')[1];
                        fs.unlink(`images/${filename}`, (error) => {
                            if (error) throw error;
                        })
                    }
                    Publication.updateComment([nbComments, publicationId])
                        .then(() => res.status(200).json({message: 'Comment successfully deleted'}))
                        .catch(err => res.status(500).json({error: 'Cannot update nb of comments in publication'}))
                    })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: 'Cannot delete comment'});
                })
        } else {
            return res.status(403).json({error: 'Unauthorized request'})
        }
    } catch(err) {
        console.log(err);
    }
   
}

exports.getAllComments = async (req, res) => {
    const publicationId = parseInt(req.params.publicationId, 10);

    try {
        const publication = await Publication.findById(publicationId);
        if (publication.length === 0) {
            return res.status(404).json({error: 'Publication not found'});
        }
        Comment.getAll(publicationId)
            .then(response => res.status(200).json(response))
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'Cannot find comments'});
            })
    } catch(err) {
        console.log(err);
    }
}