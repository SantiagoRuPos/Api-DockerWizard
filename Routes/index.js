const express = require('express');
const router = express.Router();
//Rutas DockerWizard
const authController = require('../Controllers/authController');
const ProjectController = require('../Controllers/ProjectController');
const AutomatizacionDocker = require ('../Controllers/AutomatizacionDockers')
const ReportsController = require ('../Controllers/ReportsController');

//Rutas Cygnus
const Cygnus = require('../Controllers/CygnusController');
router.post('/login',authController.login);

//API USUARIO
router.post('/register-user',authController.RegisterUser);
router.post('/ListarUsuario',authController.ListUser);
router.get('/ListUsers',authController.ListUsers);
router.post('/UpdateStatusUser',authController.UpdateStatusUser);
router.post('/resetPassword',authController.UpdatePasswordByUsuer);
router.post('/userinfo',authController.getUserInfo);

//API REPORTS
router.post('/searchReports',ReportsController.search );
router.post('/NewReport',ReportsController.NewReport);
router.post('/ReportSolved',ReportsController.ReportSolved)
router.get('/ReportSechar',ReportsController.ReportSechar)
router.post('/ReportUpdate',ReportsController.ReportUpdate)

//API PROYECTOS
router.post('/NewProject',ProjectController.NewProject);
router.post('/ListProject',ProjectController.ListProject);
router.get('/ListProjects',ProjectController.ListAllProjects);
router.post('/UpdateProject',ProjectController.UpdateProjects);

//API Cygnus
router.post('/NewUserCygnus',Cygnus.crearUsuario);
router.get('/ListUserCygnus',Cygnus.ListUserCygnus);
router.get('/ProcessCygnus',Cygnus.ProcessCygnus);
router.get('/MonitorUserCygnus',Cygnus.MonitorUserCygnus);
router.post('/ResetPasswordCygnus',Cygnus.ResetPasswordCygnus);
router.post('/PermisosCygnus',Cygnus.PermisosCygnus);
router.post('/QuitarPermiso',Cygnus.QuitarPermiso);

//API AUTOMATIZACION DOCKERS
router.get('/StateContainers',AutomatizacionDocker.StateContainers);
router.get('/BackUp',AutomatizacionDocker.BackUp);
router.get('/DockerUp' ,AutomatizacionDocker.DockerUp);
router.post('/DockerLogs', AutomatizacionDocker.DockerLogs);
router.get('/MonitoringImages', AutomatizacionDocker.MonitoringImages);
router.post('/NewRuta',AutomatizacionDocker.NewRuta);
router.post('/NewDockerWeb',AutomatizacionDocker.NewDockerWeb);
router.post('/DockerBd', AutomatizacionDocker.DockerBd);
router.post('/DockerWebBd', AutomatizacionDocker.DockerWebBd);
router.post('/UpdateContenedores', AutomatizacionDocker.InstalacionesDocker);
router.post('/DockerRestart',AutomatizacionDocker.DockerRestar);
router.get('/resetRutas',AutomatizacionDocker.CargarRutas);


module.exports = router;
