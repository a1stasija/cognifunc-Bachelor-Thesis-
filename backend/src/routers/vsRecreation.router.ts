import express from 'express';
import { RecreateVSController } from '../controllers/recreateVS.controller';
const vsRecreationRouter = express.Router();

vsRecreationRouter.route('/sendData').post(
    (req, res) => new RecreateVSController().submit(req,res)
)
vsRecreationRouter.post('/getData', (req, res) => {
  new RecreateVSController().getData(req, res);
});
export default vsRecreationRouter;