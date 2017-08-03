var mongoose = require('mongoose')
var Schema = mongoose.Schema

var preferencesSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    localization: { language: String, time_zone: String, currency: String},
    privacy: { profile_visibility: String, messages: String  },
    content: { category_lists: String}
})

module.exports = mongoose.model('Preferences', preferencesSchema)
