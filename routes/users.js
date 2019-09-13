var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.controller');
var authMiddleware = require('../middleware/auth');
/* GET users listing. */
router.post('/signup', userController.register);
router.post('/signin', userController.login);
router.post('/add-service', authMiddleware.auth, userController.addService);
router.get('/get-service', authMiddleware.auth, userController.getService);
router.post('/create-service-request', authMiddleware.auth, userController.createServiceRequest);
router.put('/change-status', authMiddleware.auth, userController.changeStatus);
router.post('/add-comment', authMiddleware.auth, userController.addComment);
router.get('/get-comment', authMiddleware.auth, userController.getComment);
router.get('/get-service-request', authMiddleware.auth, userController.getServiceRequest);
router.delete('/logout', userController.logout)
module.exports = router;
