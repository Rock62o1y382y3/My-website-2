const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bot-dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

const serverSchema = new Schema({
    serverName: String
});

const botSchema = new Schema({
    botPrefix: String
});

const Server = mongoose.model('Server', serverSchema);
const Bot = mongoose.model('Bot', botSchema);

module.exports = { Server, Bot };
