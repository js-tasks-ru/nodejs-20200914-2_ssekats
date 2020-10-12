const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
    {usernameField: 'email', session: false},
    async function(email, password, done) {
      const oUser = await User.findOne({email: email});
      if (!oUser) {
        done(null, false, 'Нет такого пользователя');
      }
      if (!await oUser.checkPassword(password)) {
        done(null, false, 'Неверный пароль');
      }
      done(null, oUser);
    },
);
