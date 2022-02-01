const Player = require('../models/player');
const bcrypt = require('bcrypt');

exports.playersController = {
    getPlayers(req, res) {
        Player.find({}, { '__v': 0 })
            .then(docs => { res.json(docs) })
            .catch(err => res.status(400).send({"error":`Error getting Data from DB: ${err}`}));
    },

    getPlayer(req, res) {
        Player.find({ id: req.params.id }, { '__v': 0 })
            .then(data => { 
                if(!data.length) return res.status(404).json({"message": "Player does not exist"});
                else { res.status(200).json(data); } })
            .catch(err => res.status(400).send({"error":`Error getting Data from DB: ${err}`}));
    },
    
    addPlayer(req, res) {
        let playerData;
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            playerData = {
                "name": req.body.name,
                "username": req.body.username,
                "email": req.body.email,
                "password": hash,
            }
        
            const newPlayer = new Player(playerData);
            const result = newPlayer.save(); 
            if(result) {
                res.json({"message":"Player added successfully"});
            } else {
                res.status(404).json({"error":"Error registering new player"});
            }
        });
    },

    approvePlayer(req, res) {
        Player.find({ username: req.body.username })
            .then(result => { bcrypt.compare(req.body.password, docs[0]['password'], (err, result) => {
                if(result) {
                    res.json({"message": "Player logged in successfully"})
                }
                else { res.json({"message": "Player info doesn't match" }) }
                });  
            })
            .catch(err => {res.status(400).json({"error":`Error getting data from DB: ${err}`})
        }); 
    },

    updatePlayer(req, res) {
        Player.updateOne({id: req.params.id}, req.body)
           .then(data => {
                   if (!data.modifiedCount) return res.status(404).json({"message":"Nothing to update!"});
                       res.json({"message":"Player Updated"}); })
            .catch(err => res.status(400).send({"error":`Error getting Data from DB: ${err}`}));
   },

   deletePlayer(req, res) {
        Player.deleteOne({id: req.params.id})
            .then(data => {
                if(!data.deletedCount) return res.status(404).send({"message":"Player to be deleted not found"});
                res.json({"message":"Player has been deleted successfully"});
            })
            .catch(err => res.status(400).send({"error":`Error deleting player from DB: ${err}`}));
   }
}

