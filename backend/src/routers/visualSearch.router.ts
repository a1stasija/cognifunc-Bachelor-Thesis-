import express from 'express';
import { VisualSearchController } from '../controllers/visualSearch.controller';

const readingRouter = express.Router();

readingRouter.route('/sendData').post(
    (req, res) => new VisualSearchController().submit(req,res)
)

export default readingRouter;