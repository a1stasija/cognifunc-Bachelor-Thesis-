import * as express from 'express';
import FlankerData from '../models/flanker'

export class FlankerController {
    submit = (req: express.Request, res: express.Response) => {
        const { sessionId, iteration, isCorrect, isCongruent, events } = req.body;

        if (!sessionId || !events) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        FlankerData.create({ sessionId, iteration, isCorrect, isCongruent, events })
            .then(() => {
                res.status(200).json({ message: 'OK' });
            })
            .catch((err) => {
                console.error('[TestController] Greška prilikom upisa:', err);
                res.status(500).json({ error: 'Database write failed' });
            });

    }
}