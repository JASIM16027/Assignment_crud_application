const express = require('express');
const router = express.Router();
const apiRoutes = require('../controller/public.controller');
router.get('/', (req, res) => {
  res.status(200).json('Hello');
});

router.post('/signUp', apiRoutes.signUp);
router.post('/signIn', apiRoutes.signIn);
module.exports = router;
