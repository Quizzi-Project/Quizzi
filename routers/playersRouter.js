const { Router } = require('express');
const { playersController } = require('../controllers/playersController');

const playersRouter = new Router();

playersRouter.get('/', playersController.getPlayers); 
playersRouter.get('/:id', playersController.getPlayer); 
playersRouter.post('/', playersController.addPlayer); 
playersRouter.put('/:id', playersController.updatePlayer); 
playersRouter.delete('/:id', playersController.deletePlayer); 


module.exports = { playersRouter };