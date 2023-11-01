import mongoose from "mongoose";

const LeagueSchema = new mongoose.Schema({});

const LeagueModel = mongoose.model('League', LeagueSchema);
export default LeagueModel;
