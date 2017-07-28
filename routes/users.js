import express from 'express'
import User from '../models/user'
const router = express.Router(User) //require('node-async-router')();

/* GET users listing. */
router.get('/', async function(req, res, next) {
    var users = await User.find();
    if(!users) return res.status(404).json({error: 'users not found'});
    res.json(users);
});

/* GET single User. */
router.get('/:user_id', async function(req, res) {
    var user = await User.findOne({user_id: req.params.user_id});
    if(!user) return res.status(404).json({error: 'user not found'});
    res.json(user);
});

/* CREATE User. */
router.post('/', async function(req, res) {
  var user = new User(req.body);
  console.log(user);
  var user = await user.save();

  if(user) res.json({message: "User successfully added!",user_id:user.user_id});
});

/* Delete User. */
router.delete('/:user_id', async function(req, res) {
   var user = await User.remove({ user_id: req.params.user_id });
   res.status(204).end();
});

module.exports = router;
