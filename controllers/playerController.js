const Player = require('../models/player');
const bcrypt = require('bcrypt');


exports.playerController = {
    getPlayers(req, res) {
        Player.find({}, { '__v': 0 })
            .then(docs => { res.json(docs) })
            .catch(err => res.status(400).send(`Error getting Data from DB: ${err}`));
    },

    getPlayer(req, res) {
        Player.find({ id: req.params.id }, { '__v': 0 })
            .then(data => { 
                if(!data.length) return res.status(404).json('Player does not exist');
                else { res.status(200).json(data); } })
            .catch(err => res.status(400).send(`Error getting Data from DB: ${err}`));
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
                res.json('Player added successfully');
            } else {
                res.status(404).send("Error registering new player");
            }
        });
    },

    updatePlayer(req, res) {
        Player.updateOne({id: req.params.id}, req.body)
           .then(data => { 
                   if (!data.modifiedCount) return res.status(404).json('Nothing to update!')
                       res.json('Player Updated'); })
           .catch(err => { res.status(400).json(err); });
   },

   deletePlayer(req, res) {
        Player.deleteOne({id: req.params.id})
            .then(res => { res.json('Player Deleted') })
            .catch(err => res.status(404).send(`Error deleting player from DB: ${err} - Player not found`));
   }
}