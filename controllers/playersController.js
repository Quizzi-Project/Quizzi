const Player = require('../models/player');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.playersController = {
    getPlayers(req, res) {
        Player.find({}, { '__v': 0 })
            .then(docs => { res.json(docs) })
            .catch(err => res.status(400).send({ "error": `Error getting Data from DB: ${err}` }));
    },

    getPlayer(req, res) {
        Player.find({ id: req.params.id }, { '__v': 0 })
            .then(data => {
                if (!data.length) return res.status(404).json({ "message": "Player does not exist" });
                else { res.status(200).json(data); }
            })
            .catch(err => res.status(400).send({ "error": `Error getting Data from DB: ${err}` }));
    },

    addPlayer(req, res) {
        const newPlayer = new Player(req.body);
        newPlayer.save()
            .then(result => { res.json({ "message": "Player added successfully" }); })
            .catch(err => { res.status(400).json(err.message); })
    },


    updatePlayer(req, res) {
        Player.updateOne({ id: req.params.id }, req.body)
            .then(data => {
                if (!data.modifiedCount) return res.status(404).json({ "message": "Nothing to update!" });
                res.json({ "message": "Player Updated" });
            })
            .catch(err => res.status(400).send({ "error": `Error getting Data from DB: ${err}` }));
    },

    deletePlayer(req, res) {
        Player.deleteOne({ id: req.params.id })
            .then(data => {
                if (!data.deletedCount) return res.status(404).send({ "message": "Player to be deleted not found" });
                res.json({ "message": "Player has been deleted successfully" });
            })
            .catch(err => res.status(400).send({ "error": `Error deleting player from DB: ${err}` }));
    },
    login(req, res) {
        const { email, password } = req.body;

        Player.find({ email })
            .then((data) => {
                if (data.length === 0) {
                    return res.status(401).json({ message: "Auth failed" });
                }
                const [player] = data;
                bcrypt.compare(password, player.password, (error, result) => {
                    if (error) {
                        return res.status(401).json({ message: "Auth failed" });
                    }

                    if (result) {
                        const token = jwt.sign({ _id: data[0]._id }, process.env.JWT_KEY, { expiresIn: "10M" });
                        return res.status(200).json({
                            message: 'Auth successful',
                            token
                        })
                    }
                    res.status(401).json({ message: "Auth failed" });
                });
            });
    }
}

