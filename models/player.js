const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const playerSchema = new Schema(
  {
    id: { type: Number, default: 0, unique: true },
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
      required: true,
      autoIndex: true,
    },
    password: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    pointsEarned: { type: Number, default: 0 },
    gamesWins: { type: Number, default: 0 },
    gamesLosses: { type: Number, default: 0 },
  },
  { collections: 'players' }
);

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

playerSchema
  .pre('save', function (next) {
    Player.find()
      .sort({ id: -1 })
      .then((data) => {
        this.id = data[0].id + 1;
        next();
      });
  })
  .pre('save', async function (next) {
    this.password = await getHashedPassword(this.password);
    next();
  });

autoIndex: true;
const Player = model('Player', playerSchema);
module.exports = {Player,getHashedPassword};
