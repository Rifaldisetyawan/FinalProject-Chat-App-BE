const messageModel = require("../Model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text, message },
            users: { from, to },
            sender: from,
        });
        if (data) return res.json({ message: "Message added succes" });
        return res.json({ message: "Failed to add message to the database" });
    } catch (next) {
        next(ex);
    }
};

module.exports.getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({
            users: { 
                $all: [from, to], },
            sender: from,
        });
        if (data) return res.json({ message: "Message added succes" });
        return res.json({ message: "Failed to add message to the database" });
    } catch (next) {
        next(ex);
    }
}