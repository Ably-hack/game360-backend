import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favoriteTeams: [{
        type: String,
    }],
    favoritePlayers: [{
        type: String,
    }],
});

const AccountModel = mongoose.model('Account', accountSchema);

export default AccountModel;
