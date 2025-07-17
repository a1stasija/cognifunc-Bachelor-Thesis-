import * as express from 'express';
import VisualSearchData from '../models/visualSearch'

export class VisualSearchController {
    submit = (req: express.Request, res: express.Response) => {
        const { sessionId, iteration, isCorrect, isControl, reactionTime, events } = req.body;

        if (!sessionId || !iteration || !reactionTime || !events) {
            res.status(400).json({ error: 'Missing required fields' });
        }

        VisualSearchData.create({ sessionId, iteration, isCorrect, isControl, reactionTime, events })
            .then(() => {
                res.status(200).json({ message: 'OK' });
            })
            .catch((err) => {
                console.error('[TestController] Greška prilikom upisa:', err);
                res.status(500).json({ error: 'Database write failed' });
            });

    }
}