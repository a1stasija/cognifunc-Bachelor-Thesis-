import express, { Router } from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import readingRouter from './routers/reading.router';
import flankerRouter from './routers/flanker.router';
import visualSearchRouter from './routers/visualSearch.router';
import vsRecreationRouter from './routers/vsRecreation.router';
import fRecreationRouter from './routers/fRecreation.router';

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));

mongoose.connect("mongodb://127.0.0.1:27017/diplomski")

mongoose.connection.once('open', () => {
    console.log("db connection ok")
})
const router = Router()

router.use('/reading', readingRouter)
router.use('/flanker', flankerRouter)
router.use('/visualSearch', visualSearchRouter)
router.use('/recreateVS', vsRecreationRouter)
app.use('/recreateFlanker', fRecreationRouter); 
app.use('/', router)


app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));