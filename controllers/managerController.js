const { Manager, getHashedPassword } = require('../models/manager');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

exports.managerController = {
  getManagers(req, res) {
    Manager.find({}, { __v: 0 })
      .limit(10)
      .then((data) => {
        res.json(data);
      })
      .catch((err) =>
        res.status(400).send({ error: `Error getting Data from DB: ${err}` })
      );
  },

  getManager(req, res) {
    Manager.find({ id: req.params.id }, { __v: 0 })
      .then((data) => {
        if (!data.length)
          return res.status(404).json({ message: 'Manager does not exist' });
        else {
          res.status(200).json(data);
        }
      })
      .catch((err) =>
        res.status(400).send({ error: `Error getting Data from DB: ${err}` })
      );
  },

  addManager(req, res) {
    const { email } = req.body;
    Manager.findOne({ email })
      .then((data) => {
        if (data)
          return res.status(400).json({ message: 'User already exists.' });
        else {
          const newManager = new Manager(req.body);
          newManager
            .save()
            .then((result) => {
              res.json({ status: 'ok' });
            })
            .catch((err) => {
              res.status(400).json(err.message);
            });
        }
      })
      .catch((err) => {
        res
          .status(400)
          .send({ error: `Bad Request - cannot insert data to DB: ${err}` });
      });
  },

  async updateManager(req, res) {
    const reqBody = { ...req.body };
    if (reqBody.password) {
      reqBody.password = await getHashedPassword(reqBody.password);
    } else {
      delete reqBody['password'];
    }
    Manager.updateOne({ id: req.params.id }, reqBody)
      .then((data) => {
        if (!data.modifiedCount)
          return res.status(404).json({ message: 'Nothing to update!' });
        res.json({ message: 'Manager Updated' });
      })
      .catch((err) =>
        res.status(400).send({ error: `Error getting Data from DB: ${err}` })
      );
  },

  deleteManager(req, res) {
    Manager.deleteOne({ id: req.params.id })
      .then((data) => {
        if (!data.deletedCount)
          return res
            .status(404)
            .send({ message: 'Manager to be deleted not found' });
        res.json({ message: 'Manager has been deleted successfully' });
      })
      .catch((err) =>
        res.status(400).send({ error: `Error deleting manager from DB: ${err}` })
      );
  },

  login(req, res) {
    const { email, password } = req.body;

    Manager.find({ email }).then((data) => {
      if (data.length === 0) {
        return res.status(401).json({ message: 'Auth failed' });
      }
      const [manager] = data;
      bcrypt.compare(password, manager.password, (error, result) => {
        if (error) {
          return res.status(401).json({ message: 'Auth failed' });
        }

        if (result) {
          const token = jwt.sign({ _id: data[0]._id }, process.env.JWT_KEY, {
            expiresIn: '10H',
          });
          logger.log('info', `Successfully login to account: ${email}`);
          return res.status(200).json({
            id: data[0].id,
            token,
          });
        }
        res.status(401).json({ message: 'Auth failed' });
        logger.log('info', `Error login to account: ${email}`);
      });
    });
  },
};
