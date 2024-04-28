
const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const ProjectModel = require('../Controllers/ProjectController');

router.post('/login',authController.login);
router.post('/reset',authController.UpdatePasswordByUsuer);
//API USUARIO
router.post('/register-user',authController.RegisterUser);
router.post('/ListarUsuario',authController.ListUser);
router.get('/ListUsers',authController.ListUsers);
router.post('/UpdateStatusUser',authController.UpdateStatusUser);

//API PROYECTOS
router.post('/NewProject',ProjectModel.NewProject);
router.post('/BuscarProyecto',ProjectModel.GetProjectByname);



module.exports = router;
