require('dotenv').config();
const User = require('../models/user');
const Publication = require('../models/publication');
const Like = require('../models/publicationLikes');

exports.handleLikes = async (req, res) => {
    const userId = parseInt(req.user[0].id, 10);
    const publicationId = parseInt(req.params.id, 10);
    try {
        const user = await User.findById('id', userId);
        const publication = await Publication.findById(publicationId);
        const isLiked = await Like.isLiked([userId, publicationId]);
        let likes;
        if (user.length === 0 || publication.length === 0) {
            return res.status(404).json({error: 'Cannot found user or publication'});
        }
        const like = new Like({
            userId: userId,
            publicationId: publicationId
        });
        if (isLiked.length === 0) {
            likes = publication[0].likes + 1;
            Like.add([like.userId, like.publicationId])
                .then(() => {
                    Publication.updateLike([likes, publicationId])
                        .then(() => res.status(200).json({message: 'Like successfully added'}))
                        .catch(err => res.status(500).json({error: 'Cannot add like'}));
                })
                .catch(err => res.status(500).json({err}));
        } else if (isLiked.length === 1) {
            console.log('dislike');
            likes = publication[0].likes - 1;
            Like.remove([like.userId, like.publicationId])
                .then(() => {
                    Publication.updateLike([likes, publicationId])
                        .then(() => res.status(200).json({message: 'Like successfully deleted'}))
                        .catch(err => res.status(500).json({error: 'Cannot delete like'}));
                })
                .catch(err => res.status(500).json({err}));
        } else {
            return res.status(400).json({error: 'Wrong parameters'});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Cannot handle like'})
    }
}