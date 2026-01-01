import * as express from 'express';
import VisualSearchData from '../models/visualSearch'

export class VisualSearchController {
    submit = (req: express.Request, res: express.Response) => {
        const { sessionId, iteration, isCorrect, isControl, events } = req.body;

        if (!sessionId || !events) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        VisualSearchData.create({ sessionId, iteration, isCorrect, isControl, events })
            .then(() => {
                res.status(200).json({ message: 'OK' });
            })
            .catch((err) => {
                console.error('[TestController] Greška prilikom upisa:', err);
                res.status(500).json({ error: 'Database write failed' });
            });

    }
}