import express from 'express';
import { RecreateFlankerController } from '../controllers/recreateF.controller';


const fRecreationRouter = express.Router();

fRecreationRouter.post('/sendData', (req, res) => {
  new RecreateFlankerController().submit(req, res);
});

fRecreationRouter.post('/getData', (req, res) => {
  new RecreateFlankerController().get(req, res);
});

export default fRecreationRouter;
