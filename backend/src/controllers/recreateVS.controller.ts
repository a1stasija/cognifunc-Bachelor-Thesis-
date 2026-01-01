import * as express from 'express';
import RecreationVSData from '../models/visualSearchConstellation'

export class RecreateVSController {
    submit = (req: express.Request, res: express.Response) => {
        const { sessionId, iteration, items } = req.body;

        if (!sessionId || !items) {
            return res.status(400).json({ error: 'Missing required fields' });
        }


        RecreationVSData.create({ sessionId, iteration, items })
            .then(() => {
                res.status(200).json({ message: 'OK' });
            })
            .catch((err: any) => {
                console.error('[TestController] Greška prilikom upisa:', err);
                res.status(500).json({ error: 'Database write failed' });
            });

    }

     getData = (req: express.Request, res: express.Response) => {
        const { sessionId, iteration } = req.body;

        if (!sessionId || iteration === undefined) {
            return res.status(400).json({ error: 'Missing sessionId or iteration' });
        }

        RecreationVSData.findOne({ sessionId, iteration })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ error: 'Data not found' });
                }
                res.status(200).json(data);
            })
            .catch((err: any) => {
                console.error('[RecreateVSController] Error fetching data:', err);
                res.status(500).json({ error: 'Database read failed' });
            });
    };
}