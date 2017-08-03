import express from 'express'
import User from '../models/user'
import Preferences from '../models/preferences'
const router = express.Router(Preferences)

/* You should call /users/:user_id for login for test */

/* GET user preferences. */
router.get('/', async function(req, res, user) {
    if(typeof req.session.sess_id === 'undefined')
      return res.status(403).json({error: "user not logged in"})

    var user = await User.findOne({_id:req.session.sess_id})
    if (!user) return res.status(404).json({error: 'user not found'})
    var preferences = await Preferences.findOne({user: user})
    if (!preferences) return res.status(404).json({error: 'preferences not found'});
    res.json(preferences)
})

/* CREATE user preferences. */
router.post('/', async function(req, res, next) {
    console.log(req.session.sess_id)

    if(typeof req.session.sess_id === 'undefined')
      return res.status(403).json({error: "user not logged in"})

    var user = await User.findOne({_id: req.session.sess_id})
    if (!user) return res.status(404).json({error: 'user not found'})
    var preferences = await Preferences.findOne({user: user})
    if (preferences) {
      preferences = await Preferences.update({user: user}, {$set: req.body})
      return res.json({message: 'Preferences successfully updated!'});
    }
    else {
      preferences = new Preferences(req.body);
      console.log(preferences);
      preferences.user = user
      await preferences.save()
    }
    res.json({message: "Preferences successfully added!"})
})

/* Update user preferences. */
router.put('/', async function(req, res, next) {
    if(typeof req.session.sess_id === 'undefined')
      return res.status(403).json({error: "user not logged in"})

    var user = await User.findOne({_id: req.session.sess_id})
    if (!user) return res.status(404).json({error: 'user not found'})
    var preferences = await Preferences.findOne({user: user})
    if (!preferences) return res.status(404).json({error: 'preferences not found'})
    preferences = await Preferences.update({user: user}, {$set: req.body})
    res.json({message: 'Preferences successfully updated!'});
});

/* Delete user preferences. */
router.delete('/', async function(req, res, next) {
    if(typeof req.session.sess_id === 'undefined')
      return res.status(403).json({error: "user not logged in"})

    var user = await User.findOne({_id: req.session.sess_id})
    if (!user) return res.status(404).json({error: 'user not found'})
    var preferences = await Preferences.remove({user: user})
    res.status(204).end()
});

module.exports = router;
