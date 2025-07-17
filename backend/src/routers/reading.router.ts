import express from 'express';
import { ReadingController } from '../controllers/reading.controller';

const readingRouter = express.Router();

readingRouter.route('/sendData').post(
    (req, res) => new ReadingController().submit(req,res)
)

export default readingRouter;