const { Schema, model } = require('mongoose'),

  playerSchema = new Schema({
    id: { type: Number, default: 0, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'], unique: true },
    password: { type: String },
    registeredAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    pointsEarned: { type: Number, default: 0 },
    gamesWins: { type: Number, default: 0 },
    gamesLosses: { type: Number, default: 0 }
  }, { collections: 'players' });


playerSchema.
  pre("save", function (next) {
    Player.find().sort({ "id": -1 })
      .then((data) => {
        this.id = data[0].id + 1;
        next();
      });
  })

const Player = model('Player', playerSchema);
module.exports = Player;