"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadingController = void 0;
const reading_1 = __importDefault(require("../models/reading"));
class ReadingController {
    constructor() {
        this.submit = (req, res) => {
            const { sessionId, testName, events } = req.body;
            if (!sessionId || !testName || !events) {
                res.status(400).json({ error: 'Missing required fields' });
            }
            if (testName == 'consent' || testName == 'flankerInstructions' || testName == 'visualSearchInstructions') {
                reading_1.default.create({ sessionId, testName, events })
                    .then(() => {
                    res.status(200).json({ message: 'OK' });
                })
                    .catch((err) => {
                    console.error('[TestController] Greška prilikom upisa:', err);
                    res.status(500).json({ error: 'Database write failed' });
                });
            }
            else if (testName == 'flanker') {
            }
            else if (testName == 'visual') {
            }
            else {
                res.status(400).json({ error: 'Unknown test type' });
            }
        };
    }
}
exports.ReadingController = ReadingController;
