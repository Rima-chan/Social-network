require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require('fs');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const SALT_ROUNDS = 10;

exports.signup = async (req, res) => {
    const email = req.body.email;
    let password = req.body.password;
    const username = req.body.username;
    console.log(password)
    // Check user inputs validity
    if (email === '' || username === '' || password === '') {
        return res.status(400).json({error: 'Missing parameters'});
    }
    if (username.length >= 13 || username.length < 2){
        return res.status(400).json({error: 'Pseudo must length between 2 and 13 characters'});
    }
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({error: 'Email is not valid'});
    }

    try {
        // Check if user infos (email or pseudo) already taken
        const isEmailExist = await User.findByEmail('email', email);
        const isPseudoTaken = await User.findByPseudo(username);
        if (isEmailExist.length > 0) {
            return res.status(401).json({error: 'Email already taken'});
        } else if (isPseudoTaken.length > 0) {
            return res.status(401).json({error: 'Pseudo already taken'})
        } else {
            // create new user
            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                if (err) {
                    return res.status(500).json({err});
                }
                const newUser = new User({
                    email: email,
                    password: hash,
                    username: username,
                    avatar: `${req.protocol}://${req.get('host')}/images/avatar_user.png`
                })
                User.create([newUser.email, newUser.password, newUser.username, newUser.avatar, newUser.isAdmin])
                    .then(response => {
                        console.log(response);
                        res.status(201).json(response);
                    })
                    .catch(err => res.status(400).json({err}))
            })
        }
    } catch (err) {
        console.log(err);
    }
}

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Check if user inputs are not empty
    if (email === '' || password === '') {
        return res.status(400).json({error: 'Missing parameters'});
    }

    try {
        const result = await User.findByEmail(email);
        // Check if user exists with email
        if (result.length === 0) {
            return res.status(400).json({error: 'Wrong email'})
        } else {
            // Compare passwords and generate data for authentification
            bcrypt.compare(password, result[0].password, (errBcrypt, resBcrypt) => {
                if (resBcrypt) {
                    const xsrfToken = crypto.randomBytes(64).toString('hex');
                    const accessToken = jwt.sign({
                        userId: result[0].id,
                        isAdmin: result[0].isAdmin,
                        xsrfToken: xsrfToken },
                        process.env.RANDOM_TOKEN_KEY,
                        {expiresIn: '8h'}
                    );
                    res.cookie('access_token', accessToken, {
                        httpOnly: true,
                        maxAge: 300000000000,
                        // "Secure: true" with http for production
                    })
                    return res.status(200).json({
                        // faut-il envoyer toutes ces infos de connexion ? Ou juste le token ? Je crois juste le token
                        'userId': result[0].id,
                        'username': result[0].username,
                        'isAdmin': result[0].isAdmin,
                        'avatar': result[0].avatar,
                        xsrfToken,
                    })
                } else {
                    return res.status(403).json({error: 'Incorrrect password'});
                }
            })
        }
    } catch (err) {
        console.log(err);
    }
}

exports.getOne = (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        return res.status(400).json({error: 'Invalid parameters'});
    }
    User.findById(userId)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => res.status(404).json({error: 'User not found ' + err}))
}

exports.updateProfil = async (req, res) => {
    // Check auth parameters
    const userId = parseInt(req.params.id, 10);
    const userIdConnected = parseInt(req.user[0].id, 10);
    if (userId !== userIdConnected) {
        return res.status(401).json({error: 'Unauthorized request'})
    } 
    try {
        const user = await User.findById(userId);
        console.log(user)
        // Check if user exists
        if (user.length === 0) {
            return res.status(404).json({error: 'User doesn\'t exist in DB'});
        }

        // Check if email is valid + Check if email and pseudo are not already taken
        if (req.body.email && !EMAIL_REGEX.test(req.body.email)) {
            return res.status(400).json({error: 'Email is not valid'});
        }
        const isEmailExist = await User.findByEmail('email', req.body.email);
        const isPseudoTaken = await User.findByPseudo(req.body.username);
        if (isEmailExist.length > 0) {
            return res.status(403).json({error: 'Email already taken'});
        }
        if (isPseudoTaken.length > 0) {
            return res.status(403).json({error: 'Pseudo already taken'});
        }

        // Update profil 
        const username = req.body.username ? req.body.username : user[0].username;
        const email = req.body.email ? req.body.email : user[0].email;
        let avatar = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
        if (avatar !== null) {
            const filename = user[0].avatar?.split('/images/')[1];
            if (!filename.includes('avatar')) {
                fs.unlink(`images/${filename}`, (err) => {
                    if (err) throw err;
                })
            }
        } else {
            avatar = user[0].avatar;
        }
        User.updateProfil([email, username, avatar, userId])
            .then(() => {
                res.status(200).json({message: 'Profil successfully updated'})
            })
            .catch(err => {
                res.status(500).json({error: 'Cannot update user ' + err})
            });

    } catch(err) {
        console.log(err)
    }   
}

exports.deleteProfil = (req, res) => {
    // Check auth parameters
    const userId = parseInt(req.params.id, 10);
    const userIdConnected = parseInt(req.user[0].id, 10);
    const isAdmin = req.user[0].isAdmin;

    if (userId === userIdConnected || isAdmin === 1) {
        User.deleteProfil(userId)
            .then(() => res.status(200).json({message: 'User successfully deleted'}))
            .catch(err => {
                res.status(500).json({error: 'Cannot delete user ' + err});
            });
    } else {
        res.status(403).json({error: 'Unauthorized request'});
    }
}

exports.getAll = async (req, res) => {
    User.getAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            return res.status(404).json({error: 'Cannont find users ' + err});
        })
}