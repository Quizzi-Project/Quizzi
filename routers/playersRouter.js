const { Router } = require('express');
const { playerController } = require('../controllers/playerController');

const playersRouter = new Router();

playersRouter.get('/', playerController.getPlayers); 
playersRouter.get('/:id', playerController.getPlayer); 
playersRouter.post('/', playerController.addPlayer); 
playersRouter.put('/:id', playerController.updatePlayer); 
playersRouter.delete('/:id', playerController.deletePlayer); 


module.exports = { playersRouter };