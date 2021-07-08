const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordIsCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordIsCorrect)) {
    return res.status(401).json({
      error: 'wrong username or password',
    });
  }

  const userForToken = {
    username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).send({ token, username });
});

module.exports = loginRouter;
