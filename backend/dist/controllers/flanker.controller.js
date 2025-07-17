"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlankerController = void 0;
const flanker_1 = __importDefault(require("../models/flanker"));
class FlankerController {
    constructor() {
        this.submit = (req, res) => {
            const { sessionId, iteration, isCorrect, reactionTime, events } = req.body;
            if (!sessionId || !iteration || !isCorrect || !reactionTime || !events) {
                res.status(400).json({ error: 'Missing required fields' });
            }
            flanker_1.default.create({ sessionId, iteration, isCorrect, reactionTime, events })
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
exports.FlankerController = FlankerController;
