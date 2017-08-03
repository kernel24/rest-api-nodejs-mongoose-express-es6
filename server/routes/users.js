import express from 'express'
import User from '../models/user'
const router = express.Router(User)

/* GET users listing. */
router.get('/', async (req, res) => {
    const users = await User.find()
    if(!users) return res.status(404).json({error: 'users not found'})
    res.json(users)
})

/* GET single User like login. call this function for session */
router.get('/:user_id', async (req, res) => {
    console.log(req.session.sess_id)
    const user = await User.findOne({user_id: req.params.user_id})
    if(!user) return res.status(404).json({error: 'user not found'})

    const sess = req.session
    sess.sess_id = user._id

    res.json(user)
})

/* CREATE User. */
router.post('/', async (req, res) => {
  const user = new User(req.body)
  const savedUser = await user.save()

  if(user) res.json({message: "User successfully added!", user_id:user.user_id})
})

/* Delete User. */
router.delete('/', async (req, res) => {
  if(typeof req.session.sess_id === 'undefined')
    return res.status(403).json({error: "not logged in"})
   var user = await User.remove({ _id: req.session.sess_id })
   res.status(204).end()
})

export default router
