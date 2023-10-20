import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    email: String,
    password: String,
    token: String,
    favoriteTeams: [{
        type: String,
    }],
    favoritePlayers: [{
        type: String,
    }],
});

const AccountModel = mongoose.model('Account', accountSchema);

export default AccountModel;
