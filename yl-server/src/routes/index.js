import express from 'express';
import {IndexController,WordController, AuthController} from '../controllers/index.js'; // Adjust the path as necessary

const router = express.Router();
const indexController = new IndexController();
const wordController = new WordController();
const authController = new AuthController(); // Assuming you have an AuthController for authentication

function setRoutes(app) {
    router.get('/', indexController.getIndex.bind(indexController));
    router.get('/word/:word', wordController.getMeaning.bind(wordController)); 
    router.post('/auth/login', authController.login.bind(authController));
    router.post('/auth/register', authController.register.bind(authController));
    app.use('/', router);
}
export default setRoutes;