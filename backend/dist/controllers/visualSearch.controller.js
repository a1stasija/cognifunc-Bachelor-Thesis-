"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisualSearchController = void 0;
const visualSearch_1 = __importDefault(require("../models/visualSearch"));
class VisualSearchController {
    constructor() {
        this.submit = (req, res) => {
            const { sessionId, iteration, isCorrect, isControl, reactionTime, events } = req.body;
            if (!sessionId || !iteration || !reactionTime || !events) {
                res.status(400).json({ error: 'Missing required fields' });
            }
            visualSearch_1.default.create({ sessionId, iteration, isCorrect, isControl, reactionTime, events })
                .then(() => {
                res.status(200).json({ message: 'OK' });
            })
                .catch((err) => {
                console.error('[TestController] Greška prilikom upisa:', err);
                res.status(500).json({ error: 'Database write failed' });
            });
        };
    }
}
exports.VisualSearchController = VisualSearchController;
