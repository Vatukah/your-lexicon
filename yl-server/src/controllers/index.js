import WordController from "./wordController.js";


class IndexController {
    getIndex(req, res) {
        res.send('Welcome to the YL Server!');
    }
}

export { IndexController, WordController };