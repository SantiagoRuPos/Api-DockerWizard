
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const ProjectController = require('../Controllers/ProjectController');

router.post('/login',authController.login);
//API USUARIO
router.post('/register-user',authController.RegisterUser);
router.post('/ListarUsuario',authController.ListUser);
router.get('/ListUsers',authController.ListUsers);
router.post('/UpdateStatusUser',authController.UpdateStatusUser);
router.post('/resetPassword',authController.UpdatePasswordByUsuer);
router.post('/userinfo',authController.getUserInfo);

//API PROYECTOS
router.post('/NewProject',ProjectController.NewProject);
router.post('/ListProject',ProjectController.ListProject);
router.get('/ListProjects',ProjectController.ListAllProjects);
router.post('/UpdateProject',ProjectController.UpdateProjects);

module.exports = router;
