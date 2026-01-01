import * as express from 'express';
import RecreationFData from '../models/flankerConstellation';

export class RecreateFlankerController {
  submit = (req: express.Request, res: express.Response) => {
    const { sessionId, iteration, stimulus } = req.body;

    if (!sessionId || iteration === undefined || !stimulus) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    RecreationFData.create({ sessionId, iteration, stimulus })
      .then(() => {
        res.status(200).json({ message: 'Data saved successfully' });
      })
      .catch((err: any) => {
        console.error('[RecreateFlankerController] Error saving data:', err);
        res.status(500).json({ error: 'Database write failed' });
      });
  };

  get = (req: express.Request, res: express.Response) => {
    const { sessionId, iteration } = req.body;

    if (!sessionId || iteration === undefined) {
      return res.status(400).json({ error: 'Missing sessionId or iteration' });
    }

    RecreationFData.findOne({ sessionId, iteration })
      .then((doc: any) => {
        if (!doc) {
          return res.status(404).json({ error: 'No data found for this sessionId and iteration' });
        }

        res.status(200).json(doc);
      })
      .catch((err: any) => {
        console.error('[RecreateFlankerController] Error fetching data:', err);
        res.status(500).json({ error: 'Database read failed' });
      });
  };
}
