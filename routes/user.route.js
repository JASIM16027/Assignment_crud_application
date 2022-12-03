const express = require('express');
const router = express.Router();
const apiRoutes = require('../controller/user.controller');

router.get('', apiRoutes.getAllUser);
router.get('/:id', apiRoutes.getOneUser);
router.put('/:id', apiRoutes.updateOneUser);
router.delete('/:id', apiRoutes.deleteOneUser);
module.exports = router;
