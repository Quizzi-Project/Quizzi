const { Router } = require('express');
const { managerController } = require('../controllers/managerController');
const checkAuth = require('../middlewares/checkAuth');

const managerRouter = new Router();

managerRouter.get('/', managerController.getManagers);
managerRouter.get('/:id', checkAuth, managerController.getManager);
managerRouter.post('/', managerController.addManager);
// managerRouter.post('/', managerController.addPlayer);
managerRouter.put('/:id', managerController.updateManager);
managerRouter.delete('/:id', checkAuth, managerController.deleteManager);
// managerRouter.delete('/:id', checkAuth, managerController.deletePlayer);
managerRouter.post('/login', managerController.login);

module.exports = { managerController };