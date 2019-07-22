const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect('mongodb+srv://warbler:warbler@warbler-d5iad.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	keepAlive:true
});


module.exports.User = require("./user");
module.exports.Message = require("./message");