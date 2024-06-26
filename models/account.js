const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    website: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},
    user: {type: String, ref: 'User', required: true}
}, {
    collection: 'accounts',
    timestamps: true,
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeoutMS: 30000
    },
    read: 'nearest'
});

const AccountModel = mongoose.model('Account', accountSchema);
module.exports = AccountModel;