import express from 'express';
import { FlankerController } from '../controllers/flanker.controller';

const readingRouter = express.Router();

readingRouter.route('/sendData').post(
    (req, res) => new FlankerController().submit(req,res)
)

export default readingRouter;