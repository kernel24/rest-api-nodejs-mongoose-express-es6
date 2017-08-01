var mongoose = require('mongoose')
var Schema = mongoose.Schema

var preferencesSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    localization: { language: String, time_zone: String, currency: String},
    privacy: { profile_visibility: Number, messages: Number  },
    content: { category_lists: Number}
})

module.exports = mongoose.model('Preferences', preferencesSchema)
