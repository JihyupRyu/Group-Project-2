const express = require('express');
const administrationHandler = require('../handlers/administration/administrationHandler.js');
const administrationRouter = express.Router();



administrationRouter.get('/', administrationHandler.getCommunityFunc);
administrationRouter.post('/', administrationHandler.createCommunityFunc);
administrationRouter.put('/:id', administrationHandler.editNameOfCommunityFunc);
administrationRouter.delete('/:id', administrationHandler.deleteCommunityFunc);




module.exports = administrationRouter;
