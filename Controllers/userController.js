const User = require('../Model/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username })
        if (usernameCheck)
            return res.json({ msg: 'Username already', status: false })
        const emailCheck = await User.findOne({ email })
        if (emailCheck)
            return res.json({ msg: 'Email already', status: false })
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username, email, password: hashedPassword
        })
        // delete user.password
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }

}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.status(400).json({ msg: 'Username Not Found', status: false })
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).json({ msg: 'Password is wrong', status: false })
        // delete user.password;
        return res.status(200).json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageset: true,
            avatarImage: '111'
        });
        return res.status(200).json({
            isSet: userData.isAvatarImageset,
            image: userData.avatarImage,
            // msg: "avatar is update"
        });
    } catch (ex) {
        next(ex);
    }
};