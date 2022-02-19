const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const managerSchema = new Schema(
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
  },
  { collections: 'managers' }
);

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

managerSchema
  .pre('save', function (next) {
    Manager.find()
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
const Manager = model('Manager', managerSchema);
module.exports = {Manager,getHashedPassword};
