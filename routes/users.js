var express = require('express');
var router = express.Router();

const userService = require("../services/userService");
const ApiSecurity = require("../middleware/apiSecurity");

router.post('/register', userService.register);
router.post('/login', userService.login);
router.delete('/delete/:username', ApiSecurity.requirePermits("manage_users"), userService.deleteByUsername);

module.exports = router;