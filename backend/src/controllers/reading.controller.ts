import * as express from 'express';
import ReadingData from '../models/reading'

export class ReadingController {
    submit = (req: express.Request, res: express.Response) => {
        const { sessionId, testName, events } = req.body;

        if (!sessionId || !testName || !events) {
            res.status(400).json({ error: 'Missing required fields' });
        }

        if(testName == 'consent' || testName == 'flankerInstructions' || testName == 'visualSearchInstructions'){
            ReadingData.create({ sessionId, testName, events })
            .then(() => {
                res.status(200).json({ message: 'OK' });
            })
            .catch((err) => {
                console.error('[TestController] Greška prilikom upisa:', err);
                res.status(500).json({ error: 'Database write failed' });
            });
        }else if( testName == 'flanker'){

        }else if(testName == 'visual'){

        }else{
            res.status(400).json({ error: 'Unknown test type' });
        }

    }
}