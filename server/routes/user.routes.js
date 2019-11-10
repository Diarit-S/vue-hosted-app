const router = require('express').Router(); 
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const isLoggedIn = require('../middleware/isLoggedIn');
 

// router.get('/current', isLoggedIn, (req, res) => {
//   res.end();
// })

router.post('/', async (req, res, next) => {
  const body = req.body;
  try {
    if (!body.username || !body.username.length === 0) {
      res.status(400).json(['username missing']);
    }
    await new User({
      email: body.email,
      username: body.username,
      password: bcrypt.hashSync(body.password, 10)                  
    }).save();
    res.json('ok');
  } catch (error) {
    next(error);
  }
});

module.exports = router;