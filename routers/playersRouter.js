const { Router } = require('express');
const { playersController } = require('../controllers/playersController');
const checkAuth = require('../middlewares/checkAuth');

const playersRouter = new Router();

playersRouter.get('/', playersController.getPlayers);
playersRouter.get('/:id', checkAuth, playersController.getPlayer);
playersRouter.post('/', playersController.addPlayer);
playersRouter.put('/:id', playersController.updatePlayer);
playersRouter.delete('/:id', checkAuth, playersController.deletePlayer);
playersRouter.post('/login', playersController.login);

module.exports = { playersRouter };