import express from 'express';
import {IndexController,WordController, AuthController} from '../controllers/index.js'; // Adjust the path as necessary

const router = express.Router();
const indexController = new IndexController();
const wordController = new WordController();
const authController = new AuthController(); // Assuming you have an AuthController for authentication

function setRoutes(app) {
    router.get('/', indexController.getIndex.bind(indexController));
    router.get('/search/:word', wordController.getMeaning.bind(wordController)); 
    router.post('/auth/signin', authController.login.bind(authController));
    router.post('/auth/signup', authController.register.bind(authController));
    router.post('/auth/refresh-token', authController.silentSignIn.bind(authController)); 
    router.post('/auth/logout', authController.logout.bind(authController)); 
    app.use('/', router);
}
export default setRoutes;