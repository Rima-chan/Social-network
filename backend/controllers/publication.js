require('dotenv').config();
const Publication = require('../models/publication');
const fs = require('fs');

exports.createNewPublication = (req, res) => {
    const content = req.body.content;
    const attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    const userId = req.user[0].id;

    if (!content && !attachment) {
        return res.status(400).json({error: 'Missing parameters'});
    }
    if (!userId) {
        return res.status(500).json({error: 'Cannot identify user'});
    }

    const newPublication = new Publication({
        userId: userId,
        content: content,
        attachment: attachment,
    });
    Publication.create([newPublication.userId, newPublication.content, newPublication.attachment, newPublication.comments, newPublication.likes])
        .then(response => res.status(201).json({response}))
        .catch(err => {
            console.log(err);
            res.status(400).json({error: 'Cannot create publication'})
        });
}

exports.getOnePublication = (req, res) => {
    const publicationId = parseInt(req.params.id, 10);
    Publication.findById(publicationId)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({err}))
}

exports.updatePublication = async (req, res) => {
    const publicationId = parseInt(req.params.id, 10);
    const userId = parseInt(req.user[0].id, 10);
    if (!req.body.content && !req.file) {
        return res.status(400).json({error: 'Missing parameters'});
    }
    try {
        const publication = await Publication.findById(publicationId);
        if (publication.length === 0) {
            return res.status(404).json({error: 'Publication not found'})
        }
        if (userId !== publication[0]?.user_id) {
            return res.status(403).json({error: 'Unauthorized request'});
        }
        const content = req.body.content ? req.body.content : publication[0].content; 
        let attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
        const deleteOldImage = req.body.deleteImage ? parseInt(req.body.deleteImage, 10) : null;

        if (attachment) {
            if (publication[0].image_url) {
                const filename = publication[0].image_url?.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                })
            }
        } else {
            if (publication[0].image_url && deleteOldImage === 1) {
                const filename = publication[0].image_url?.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                })
            } else {
                attachment = publication[0].image_url;
            }
        }

        Publication.update([content, attachment, publicationId])
            .then(response => {
                console.log(response);
                res.status(200).json({message: 'Publication successfully updated'})
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'Cannot update publication'});
            })
    } catch (err) {
        console.log(err);
    }
    
}

exports.deletePublication = async (req, res) => {
    const publicationId = parseInt(req.params.id, 10);
    const userId = parseInt(req.user[0].id, 10);
    const isAdmin = req.user[0].isAdmin;

    try {
        const publication = await Publication.findById(publicationId);
        if (publication.length === 0) {
            return res.status(404).json({error: 'Publication not found'})
        }
        if (userId === publication[0]?.user_id || isAdmin === 1) {
            Publication.delete(publicationId)
                .then( (response) => {
                    if (publication[0].image_url) {
                        const filename = publication[0].image_url?.split('/images/')[1];
                        fs.unlink(`images/${filename}`, (error) => {
                            if (error) throw error;
                        })
                    }
                    return res.status(200).json({message: 'Publication successfully deleted'})
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({error: 'Cannot delete publication'});
                })
        } else {
            return res.status(403).json({error: 'Unauthorized request'});
        }
    } catch(err) {
        console.log(err);
    }
}

exports.getAllPublications = (req, res) => {
    Publication.getAll()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({error: 'Cannont find publications'}))
}