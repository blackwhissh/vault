var express = require('express');
var router = express.Router();

const accountService = require("../services/accountService")
const ApiSecurity = require('../middleware/apiSecurity');

router.post('/add', accountService.addAccount);
router.get('/getAll', accountService.getAllByUser);
router.get('/:id', accountService.getOneByUser);
router.delete('/:id', accountService.deleteById);
router.put('/:id', accountService.updateById);


module.exports = router;