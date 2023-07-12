const express = require('express');
const emailController = require('./../controllers/emailController')


const router = express.Router();

router.use(emailController.checkEmail);

router.route('/send-mail').post(emailController.postEmail);
router.route('/send-mail/:type').post(emailController.checkType, emailController.postEmail);

module.exports = router; 1