const AccountModel = require('../models/account');
const jwt = require('jsonwebtoken');

module.exports = {
    addAccount: async (req,res) => {
        try {
            const username = getUsernameFromToken(req);
            if(!username){
                return res.status(401).json({
                    message: 'error_parsing_jwt'
                });
            }
            const savedItem = await new AccountModel({
                website: req.body.website,
                username: req.body.username,
                password: req.body.password,
                user: username
            }).save();
            res.json(savedItem);
        } catch (err){
            res.status(500).json(err);
        }
    },

    getOneByUser: async (req, res) => {
        const username = getUsernameFromToken(req);
        if(!username){
            return res.status(401).json({
                message: 'error_parsing_jwt'
            });
        }

        try {
            const item = await AccountModel.findById(req.params.id);
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllByUser: async (req, res) => {
        const username = getUsernameFromToken(req);
        if(!username){
            return res.status(401).json({
                message: 'error_parsing_jwt'
            });
        }
        
        try {
            const accounts = await AccountModel.find({ user: username });
            return res.json(accounts);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                message: 'error_querying_accounts'
            });
        }

    },

    deleteById: async (req, res) =>{
        const username = getUsernameFromToken(req);
        if(!username){
            return res.status(401).json({
                message: 'error_parsing_jwt'
            });
        }

        try {
            await AccountModel.deleteOne({user: username, _id: req.params.id});
            res.json({ success: true });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateById: async (req, res) => {
        const username = getUsernameFromToken(req);
        if(!username){
            return res.status(401).json({
                message: 'error_parsing_jwt'
            });
        }

        try {
            const item = await AccountModel.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                {
                    new: true
                }
            );
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

function getUsernameFromToken(req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return null;

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded.username;
    } catch {
        return null;
    }
}