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
    const publication = await Publication.findById(publicationId);
    if (!publication) {
        return res.status(404).json({error: 'Publication not found'})
    }
    if (userId !== publication[0].user_id) {
        return res.status(403).json({error: 'Unauthorized request'});
    }
    if (!req.body.content && !req.file) {
        return res.status(400).json({error: 'Missing parameters'});
    }
    const content = req.body.content ? req.body.content : publication[0].content; 
    let attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
    if (attachment) {
        const filename = publication[0].image_url?.split('/images')[1];
        fs.unlink(`images/${filename}`, (err) => {
            if (err) throw err;
        })
    } else {
        attachment = publication[0].image_url;
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
}

exports.deletePublication = async (req, res) => {
    const publicationId = parseInt(req.params.id, 10);
    const userId = parseInt(req.user[0].id, 10);
    const isAdmin = req.user[0].isAdmin;
    const publication = await Publication.findById(publicationId);
    console.log(publication);
    console.log(userId);
    if (publication.length === 0) {
        return res.status(404).json({error: 'Publication not found'})
    }
    if (userId === publication[0]?.user_id || isAdmin === 1) {
        Publication.delete(publicationId)
            .then( (response) => res.status(200).json({message: 'Publication successfully deleted'}))
            .catch(err => {
                console.log(err);
                res.status(500).json({error: 'Cannot delete publication'});
            })
    } else {
        return res.status(403).json({error: 'Unauthorized request'});
    }
}

exports.getAllPublications = (req, res) => {
    Publication.getAll()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({error: 'Cannont find publications'}))
}