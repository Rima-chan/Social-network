const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const SALT_ROUNDS = 10;

exports.signup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    // const avatar = `${req.protocol}://${req.get('host')}/images/avatar_user.png`;
    if (email === '' || username === '' || password === '') {
        return res.status(400).json({error: 'Missing parameters'});
    }
    if (username.length >= 13 || username.length < 2){
        return res.status(400).json({error: 'Pseudo must length between 2 and 13 characters'});
    }
    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({error: 'Email is not valid'});
    }
}