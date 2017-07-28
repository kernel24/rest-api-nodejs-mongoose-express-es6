import express from 'express'
import User from '../models/user'
import Preferences from '../models/preferences'
const router = express.Router(Preferences)

/* GET user preferences. */
router.get('/:user_id', async function(req, res, user) {
    var user = await User.findOne({user_id:req.params.user_id})
    if (!user) return res.status(404).json({error: 'user not found'})
    var preferences = await Preferences.findOne({user: user})
    if (!preferences) return res.status(404).json({error: 'preferences not found'});
    res.json(preferences)
})

/* CREATE user preferences. */
router.post('/:user_id', async function(req, res, next) {
    var user = await User.findOne({user_id: req.params.user_id})
    if (!user) return res.status(404).json({error: 'user not found'})
    console.log(req.body);
    var preferences = await Preferences.findOne({user: user})
    if (preferences) preferences = await Preferences.update({user: user}, {$set: req.body})
    else {
      preferences = new Preferences(req.body);
      console.log(preferences);
      preferences.user = user
      await preferences.save()
    }
    res.json({message: "Preferences successfully added!"})
})

/* Update user preferences. */
router.put('/:user_id', async function(req, res, next) {
    var user = await User.findOne({user_id: req.params.user_id})
    if (!user) return res.status(404).json({error: 'user not found'})
    var preferences = await Preferences.findOne({user: user})
    if (!preferences) return res.status(404).json({error: 'preferences not found'})
    preferences = await Preferences.update({user: user}, {$set: req.body})
    res.json({message: 'Preferences successfully updated!'});
});

/* Delete user preferences. */
router.delete('/:user_id', async function(req, res, next) {
    var user = await User.findOne({user_id: req.params.user_id})
    if (!user) return res.status(404).json({error: 'user not found'})
    var preferences = await Preferences.remove({user: user})
    res.status(204).end()
});

module.exports = router;
