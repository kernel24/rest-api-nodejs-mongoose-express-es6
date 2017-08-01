var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

var userSchema = new Schema({
    user_id: { type:Number,required: true},
    user_name: String,
    location: String
}, { user_id: false });

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'user_id',
    startAt: 1,
    incrementBy: 1
});
module.exports = mongoose.model('User', userSchema);
