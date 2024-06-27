var express = require('express');
var router = express.Router();

const accountService = require("../services/accountService")
const ApiSecurity = require('../middleware/apiSecurity');

router.post('/add', ApiSecurity.requirePermits("manage_accounts"),accountService.addAccount);
router.get('/getAll', ApiSecurity.requireLogin, accountService.getAllByUser);
router.get('/:id', ApiSecurity.requireLogin, accountService.getOneByUser);
router.delete('/:id', ApiSecurity.requirePermits("manage_accounts"), accountService.deleteById);
router.put('/:id', ApiSecurity.requirePermits("manage_accounts"), accountService.updateById);


module.exports = router;